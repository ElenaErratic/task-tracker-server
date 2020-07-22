// Copyright (c) 2020 Anastasiia Birillo

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsDescriptionSchema = new Schema({
    surveyPane: {
        age: {type: String},
        gender: {type: String},
        experience: {type: String},
        country: {type: String},
        years: {type: String},
        months: {type: String},
        startSession: {type: String}
    },
    taskChoosingPane: {
        chooseTask: {type: String},
        finishSession: {type: String},
        startSolving: {type: String}
    },
    taskSolvingPane: {
        inputData: {type: String},
        outputData: {type: String},
        submit: {type: String},
        // Todo: delete it
        backToTasks: {type: String}
    },
    finalPane: {
        praise: {type: String},
        backToSurvey: {type: String},
        finalMessage: {type: String},
        // Todo: delete it
        backToTasks: {type: String}
    },
    commonText: {
        backToTasks: {type: String}
    }
});

SettingsDescriptionSchema.methods.getPublicData = function () {
    let data = {
        surveyPane: this.surveyPane,
        taskChoosingPane: this.taskChoosingPane,
        taskSolvingPane: this.taskSolvingPane,
        finalPane: this.finalPane,
    };
    ['taskSolvingPane', 'finalPane'].map(key => data[key]['backToTasks'] = this.commonText.backToTasks);
    return data;
};

module.exports = mongoose.model('SettingsDescription', SettingsDescriptionSchema);
