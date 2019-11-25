const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_sequence = require("mongoose-sequence")(mongoose);

const DataItemSchema = new Schema({
    codePath: { type: String }
});

DataItemSchema.plugin(mongoose_sequence, { inc_field: "externalDataItemId" });

DataItemSchema.methods.getPublicData = function () {
    return {
        codePath: this.codePath,
        id: this.externalDataItemId
    };
};

module.exports = mongoose.model("DataItem", DataItemSchema);
