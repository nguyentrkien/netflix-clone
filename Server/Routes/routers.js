const {LikeController,GetLikedController, RemoveLikedController} = require('../Controllers/LikeController')
const express = require('express');
const router = express.Router();

router.post('/likedMovies',LikeController)
router.get('/getLikedMovies/:email',GetLikedController)
router.put('/unlikedMovies',RemoveLikedController)

module.exports = router