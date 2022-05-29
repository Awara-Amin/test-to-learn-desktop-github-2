import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { isAuth, isSellerOrAdmin, isAdmin } from "../utils.js";
// import data from "../data.js";

const categoryRouter = express.Router();

// only get request, when we first time open the website at the homeScreen.js
categoryRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const category = await Category.find({});

    res.send(category);
  })
);

// this router is for the case when we click on edit (from the listCategore in the Admin side), the edit takes us to a URL which should has a product, so a product based on the id is there
categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: "category Not Found" });
    }
  })
);

// this goes into the database based on our categoryModel when we create a category from the Admin part
// M.Fuad siad, it is also for the case when we prese on create categore in Admin side, it created a category in the database and brings it back to the frontend based on id
categoryRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: "category name" + Date.now(),
      image: "/images/p1.jpg",
      description: "sample description",
    });
    // now pass it to frontend
    const createdCategory = await category.save();
    res.send({ message: "New Category Created", category: createdCategory });
  })
);

categoryRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    console.log(req.body.name);
    console.log((category.image = req.body.image));

    if (category) {
      category.name = req.body.name;
      category.image = req.body.image;
      category.description = req.body.description;

      const updatedCategory = await category.save();
      res.send({ message: "Category Updated kaka", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      const deleteCategory = await category.remove();
      res.send({ message: "Category Deleted", category: deleteCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);
export default categoryRouter;
