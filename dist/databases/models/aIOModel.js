import mongoose, { Schema } from "mongoose";
export var aioSchema = new Schema({
    shareId: {
        type: Number,
        required: true,
        unique: true,
    },
    messageIds: {
        type: Number,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
}, { timestamps: true });
var DramaModel = mongoose.model("aio", aioSchema);
export default DramaModel;
