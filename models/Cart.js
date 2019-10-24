import mongoose, {Schema} from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const CartSchema = new Schema ({
  user: {
    type: ObjectId,
    ref: "User"
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: ObjectId,
        ref: "Product"
      }
    }
  ]
});


export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);