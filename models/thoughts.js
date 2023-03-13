const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    /*
            * `reactionId`
            * Use Mongoose's ObjectId data type
            * Default value is set to a new ObjectId
    */
    reactionBody: {type: String, required: true, min: 1, max: 280},
    username: {type: String, rquired: true}, // Reaction Creator
    createdAt: {type: Date, default: Date.now},
    
    });
    
    const thoughtSchema = new Schema({
        thoughtText: { type: String, required: true, min: 1, max: 280 },
        createAt: { type: Date, default: Date.now },
        username: { type: String, required: true }, //Thought creator
        reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        },
    id: true, // Need to confirm if this will be true. Perhaps for the virtual
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;