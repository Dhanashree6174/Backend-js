import mongoose from " mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true,
        },
        title: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true,
        },
        duration: {
            type: Number, // not given by user --> we get it from cloudinary url (cloudinary sends description of video - url, its duration)
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
    timestamps: true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate) // add our own plugins

export const Video = mongoose.model("Video", videoSchema);