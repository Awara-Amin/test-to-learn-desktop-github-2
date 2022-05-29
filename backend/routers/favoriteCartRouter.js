import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Favcard from "../models/favoriteCartModel.js";
import Product from '../models/productModel.js';


const favoriteCartRouter = express.Router();

// CREATE
favoriteCartRouter.post(
    '/:id', 
         expressAsyncHandler (async (req, res) =>{
        const userId = req.params.id;
        const { productId} = req.body.id;

        try {
            // let favorite = await Favcard.findOne({userId});
            let favoriteProduct = await Product.findOne({_id: productId});
            if(!favoriteProduct){
                res.status(404).send('Item not found!')
            }
            // const price = item.price;
            console.log(favoriteProduct)
            console.log("favoriteys kaka")
            const name = favoriteProduct.name;
            const image = favoriteProduct.image;

            const newFavoriteCart = new Favcard({
                userId,
                favoriteProduct: [{ productId, name, image }],
            });

            const favoriteCart = await newFavoriteCart.save();
            res.send({favoriteCart});
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    
})
);

// GET USER CART
favoriteCartRouter.get(
    '/find/:userId', 
    expressAsyncHandler(async (req, res) => {
    const favoriteCart = await Favcard.findOne({userId: req.params.userId});
    if(favoriteCart ) {
        // console.log("i reaxhed to here")
        res.send(favoriteCart);
    } else {
        res.status(404).send({message: 'favoriteCart Not Found'});
    }
})
);


// DELETE
favoriteCartRouter.delete(
    '/:id', 
    expressAsyncHandler(async(req, res) => {
        const favoriteCart = await Favcard.findByIdAndDelete(req.params.id);
        if (favoriteCart) {
                res.send({message: "favoriteCart has been deleted", favoriteCart: favoriteCart})  
            
        } else {
            res.status(404).send({message: 'favoriteCart Not Found'})
        }

    })
);

// to get a favoriteCart by id
favoriteCartRouter.get(
    '/:id', 
    expressAsyncHandler(async (req, res) => {
  const favoriteCart = await Favcard.findById(req.params.id)
  if (favoriteCart) {
      res.send(favoriteCart);
  } else {
      res.status(404).send({message: 'favoriteCart Not Found'});
  }
})
);



// UPDATE
favoriteCartRouter.put(
           '/:id', 
           expressAsyncHandler(async (req, res) =>{
    const favoriteCart = await Favcard.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },
       {new: true}
    );
    if(favoriteCart){
        const updatedFavoriteUser = await favoriteCart .save();
        res.send({message: 'favoriteCart Updated', favoriteCart: updatedFavoriteUser})
    } else{
        res.status(404).message({message: 'FavoriteCart not found bra'});

    }
})
);


export default favoriteCartRouter;