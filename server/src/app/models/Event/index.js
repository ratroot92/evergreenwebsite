/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        eventName: { type: String, required: true, trim: true },
        eventPayload: { type: Object },
        eventMetaData: { type: Object },
        produce: {
            produceMetaData: { type: Object },
            producedBy: { type: String, required: true, trim: true },
            producedAt: { type: Date, default: new Date() },
        },
        consume: {
            consumeMetaData: { type: Object },
            consumedBy: { type: String, trim: true },
            consumedAt: { type: Date, default: null },
        },
        status: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);
// eventSchema.virtual('id').get(function () {
//     return this._id.toString();
// });

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
