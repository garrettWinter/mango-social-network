const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        email: {
            type: String, required: true, unique: true,
            //This validator is a RegEx that checks to make sure the string matches the pattern of an email address.            
            validate: {
                validator: function(email) {
                    return /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/.test(email);
                },
                message: emailCheck => `${emailCheck.value} is not a valid email address!`
            }
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;