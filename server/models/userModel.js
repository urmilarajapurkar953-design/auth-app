import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,

    },

    resetOtp: {
        type: String,
        default: '',
    },

    resetOtpExpiryAt: {
        type: Number,
        default: 0,
    },
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;