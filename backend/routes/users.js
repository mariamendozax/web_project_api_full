const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateId,
  validateAvatar,
  validateUpdateUser,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateId, getUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);
module.exports = router;
