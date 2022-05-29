import mongoose from 'mongoose';

const favoriteCartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        
        favorateProducts:[
            {
                productId:{ 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name:{ type: String},
                image: { type: String, required: true },
            },
        ], 
    },{ 
         timestamps: true,
      }
        
);

const Favcard = mongoose.model('Favcard', favoriteCartSchema);

export default Favcard;








// const favoriteCartSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String,
//             required: true
//         },
//         favorateProducts:[
//             {
//                 productId:{ type: String},
//                 quantity:{ type: Number},
//             },
//         ], 
//     },{ 
//          timestamps: true,
//       }
        
// );

// const Favcard = mongoose.model('Favcard', favoriteCartSchema);

// export default Favcard;