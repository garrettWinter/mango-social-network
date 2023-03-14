const { Schema, model, Types } = require('mongoose');

const dayjs = require('dayjs');

function formatDate() {
    return dayjs().format('MM/DD/YYYY h:mm A')
  }

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {type: String, required: true, maxlength: 280},
    username: {type: String, rquired: true},
    createAt: { type: Date, default: Date.now },
    },
    { _id: false});
    
    const thoughtSchema = new Schema({
        thoughtText: { type: String, required: true, maxlength: 280 },
        createAt: { type: Date, default: Date.now },
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

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;