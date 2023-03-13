const Thought = require ('../models/thoughts');

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
    .then((newThought) => res.json(newThought))
    .catch((err) => res.status(500).json(err));
    //(don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
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
            console.log(err);
            res.status(500).json(err);
        })
},

//Delete a thought
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.parms.thoughtId })
    .then ((thought) =>
        !thought
            ? res
                .status(404)
                .json ({ message: "No thought found with this id!"})
            : res.json ({message: "Thought has been successfully deleted!" })
        )
        .catch((err) => res.status(500).json(err));
},

/*
    
    
    **`/api/thoughts/:thoughtId/reactions`**
    
    * `POST` to create a reaction stored in a single thought's `reactions` array field
    newReaction
    * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    deleteReaction
*/

};