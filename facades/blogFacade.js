let LocationBlog = require("../models/LocationBlog.js")

getAll = async () => LocationBlog.find({}).exec()

getById = async (id) => LocationBlog.find({ _id: id }).exec()

addLocationBlog = async (info, pos, author) => {
    return await LocationBlog.insertMany({ info, pos, author })
}

likeLocationBlog = async (likedBy, _id) => {
    return LocationBlog.findOneAndUpdate(
		{ _id },
		{ $push: { likedBy } },
		{ new: true }
	).exec();
}

module.exports = {
    getAll,
    getById,
    addLocationBlog,
    likeLocationBlog,
}
