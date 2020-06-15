const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseSequence = require('mongoose-sequence')(mongoose);

const AtiSchema = new Schema({
    codePath: {type: String}
});

AtiSchema.plugin(mongooseSequence, {inc_field: 'externalAtiId'});

AtiSchema.methods.getPublicData = function () {
    return {
        codePath: this.codePath,
        id: this.externalAtiId
    };
};

module.exports = mongoose.model('ActivityTrackerItem', AtiSchema);
