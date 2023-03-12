const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        toughtText: String, //Needs to be required and limited between 1 and 280 chars
        createAt: Date, //Needs to be set by default to the current timestamp..... Need to use a getter to format the timestamp on query..... This isnt done here right, but in the controller?
        username: String, // Needs to be required and this is the user that created the through
        reactions: {
                /*
                NEEDS TO BE A SUBDOCUMENT

                **Reaction** (SCHEMA ONLY)

                * `reactionId`
                * Use Mongoose's ObjectId data type
                * Default value is set to a new ObjectId

                * `reactionBody`
                * String
                * Required
                * 280 character maximum

                * `username`
                * String
                * Required

                * `createdAt`
                * Date
                * Set default value to the current timestamp
                * Use a getter method to format the timestamp on query

                */
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true, // Need to confirm if this will be true. Perhaps for the virtual
    }
)

const Thought = model('thought', userSchema);

module.exports = Thought;