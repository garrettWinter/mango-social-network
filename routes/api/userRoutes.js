const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

//Full route path is /api/users/
router.route('/').get(getUsers).post(createUser);

//Full route path is /api/users//:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//Full route path is /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;