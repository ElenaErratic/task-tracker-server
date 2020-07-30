// Copyright (c) 2020 Anastasiia Birillo

const mongoose = require('mongoose');

const ATI = mongoose.model('ActivityTrackerItem');

const createAti = async () => {
    const ati = new ATI({});
    return await ati.save();
};

const getAtiByExternalId = async (externalId) => {
    return await ATI.findOne({
        externalAtiId: externalId
    })
};

const getAllAti = async () => {
    return await ATI.find();
};

module.exports = {
    createAti,
    getAtiByExternalId,
    getAllAti,
};
