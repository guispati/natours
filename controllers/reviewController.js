const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    req.body.tour = !req.body.tour ? req.params.tourId : req.body.tour;
    req.body.user = !req.body.user ? req.user.id : req.body.user;
    next();
}

exports.getAllReviews = factory.getAll(Review);
exports.getReviewById = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);