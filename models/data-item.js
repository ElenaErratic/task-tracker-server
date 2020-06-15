const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseSequence = require('mongoose-sequence')(mongoose);

const DiSchema = new Schema({
    codePath: {type: String},
    activityTrackerKey: {type: String}
});

DiSchema.plugin(mongooseSequence, {inc_field: 'externalDiId'});

DiSchema.methods.getPublicData = function () {
    return {
        codePath: this.codePath,
        activityTrackerKey: this.activityTrackerKey,
        id: this.externalDiId
    };
};

module.exports = mongoose.model('DataItem', DiSchema);
