import User from "../models/user.js"
import { Video } from "../models/video.js";
import { theError } from "../middleware/error.js";

////////////////////// get a video ///////////////////////////////
const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};


////////////////////// Get trend videos  ///////////////////////////////
const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};


////////////////////// Get random  videos ///////////////////////////////
const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

////////////////////// get By Id  ///////////////////////////////
const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

////////////////////// search a video ///////////////////////////////
const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            $or: [{
                title: { $regex: query, $options: "i" },
            }, {
                desc: { $regex: query, $options: "i" },
            }, {
                videoUrl: { $regex: query, $options: "i" },
            }
            ]
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

//////////////////////  add a view ///////////////////////////////
const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};


////////////////////// add a video ///////////////////////////////
const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};


////////////////////// update a video ///////////////////////////////
const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(theError(404, "Video not found!"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            return next(theError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
};


////////////////////// delete a video ///////////////////////////////
const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(theError(404, "Video not found!"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted.");
        } else {
            return next(theError(403, "You can delete only your video!"));
        }
    } catch (err) {
        next(err);
    }
};



////////////////////// sub ///////////////////////////////
const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};


export { getVideo, trend, random, getByTag, search, addVideo, addView, updateVideo, deleteVideo, sub }


