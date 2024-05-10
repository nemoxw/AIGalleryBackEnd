import express from 'express';
import ImagesController from './images.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoritesController from './favorites.controller.js';
import UploadController from './upload.controller.js';
import multer from 'multer';

const router = express.Router(); // Get access to Express router

//Added the blow lines to handle form-data sent form the front end.
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
  });



router.route('/').get(ImagesController.apiGetImages);
router.route('/id/:id').get(ImagesController.apiGetImageById);
router.route('/ratings').get(ImagesController.apiGetRatings);

router.route('/review').post(ReviewsController.apiPostReview);
router.route('/review').put(ReviewsController.apiUpdateReview);
router.route('/review').delete(ReviewsController.apiDeleteReview);

router.route("/favorites").put(FavoritesController.apiUpdateFavorites);
router.route("/favorites/:userId").get(FavoritesController.apiGetFavorites);


router.route('/upload').post(Multer.single("imgfile"), UploadController.apiUploadImage);






export default router;