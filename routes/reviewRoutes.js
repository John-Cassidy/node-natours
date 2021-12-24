const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// ROUTER
const router = express.Router({ mergeParams: true }); // mergeParams will merge parent router params into this router params

// NESTED ROUTES
// POST /tour/234/reviews
// GET /tour/234/reivews
// GET /tour 234/reviews/345

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(authController.restrictTo('user'), reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    reviewController.deleteReview
  );

module.exports = router;
