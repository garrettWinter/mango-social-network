const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        email: {
            type: String, required: true, unique: true,
            validate: {
                validator: function(email) {
                    return /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/.test(email);
                },
                message: emailCheck => `${emailCheck.value} is not a valid email address!`
            }
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }], // Array of `_id` values referencing the `Thought` model
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Array of `_id` values referencing the `User` model (self-reference)
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;