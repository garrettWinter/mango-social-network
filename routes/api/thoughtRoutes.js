const router = require('express').Router();
const {
getThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,
newReaction,
deleteReaction,
} = require('../../controllers/thoughtController');

//Full route path is /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//Full route path is /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//Full route path is /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(newReaction);

//Full route path is /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;