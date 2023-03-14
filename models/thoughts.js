const { Schema, model, Types } = require('mongoose');

const dayjs = require('dayjs');

function formatDate(createdAt) {
    return dayjs(createdAt).format('MM/DD/YYYY h:mm A')
}

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, rquired: true },
    createdAt: { type: Date, default: Date.now, get: formatDate },
},
    {
        _id: false,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    });

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, maxlength: 280 },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    username: { type: String, required: true },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;