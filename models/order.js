import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    checkoutData: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;