const Thought = require ('../models/thoughts');
const User = require ('../models/users');

module.exports = {

// Get all Thoughts
getThoughts(req,res) {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
},

// Get Thought by ID
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought found with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
// Create a thought
createThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Thought has been created')
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

//Update a thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thoughts with this id!'})
        : res.json(thought)
        )
        .catch((err) => {
            res.status(500).json(err);
        })
},

//Delete a thought
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then ((thought) =>
        !thought
            ? res
                .status(404)
                .json ({ message: "No thought found with this id!"})
            : res.json ({message: "Thought has been successfully deleted!" })
        )
        .catch((err) => res.status(500).json(err));
},


    
    
//Full route path is /api/thoughts/:thoughtId/reactions
newReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Thought found with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

//Full route path is /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


};