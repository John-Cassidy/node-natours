const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// eslint-disable-next-line import/no-useless-path-segments
const reviewRouter = require('../routes/reviewRoutes');

// ROUTER
const router = express.Router();

// NESTED ROUTES
// POST /tour/234/reviews
// GET /tour/234/reivews
// GET /tour 234/reviews/345

// SIMPLE NESTING ROUTES
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

// MOUNT NESTED ROUTER
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
