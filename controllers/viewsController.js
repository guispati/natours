const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();

    res.status(200).render('overview', {
        title: 'All tours',
        tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user',
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }

    res.set(
        'Content-Security-Policy',
      	"default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    );
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour,
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account',
    });
}

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
}

exports.getMyTours = catchAsync(async (req, res, next) => {
	const bookings = await Booking.find({ user: req.user.id });

	const tourIds = bookings.map(el => el.tour);
	const tours = await Tour.find({
		_id: {
			$in: tourIds,
		},
	});

	res.status(200).render('overview', {
		title: 'My tours',
		tours
	});
});