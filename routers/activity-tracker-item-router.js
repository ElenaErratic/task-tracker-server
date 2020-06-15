const LOGGER_NAME = require('../consts/consts').LOGGER_NAME;
const BASE_URL = require('../consts/consts').BASE_URL;

const intelLogger = require('intel');
const logger = intelLogger.getLogger(LOGGER_NAME);

module.exports = (app, injector, upload) => {

    const atiController = injector.injectObject(injector.objectType.CONTROLLER,'ActivityTrackerItemController');
    const errors = injector.injectObject(injector.objectType.CONST_FILE,'Errors');

    app.route(`${BASE_URL.ATI}`).post(async (req, res, next) => {
        const response = await atiController.createAti();
        if (response.error) {
            res.status(response.error.code);
            res.json(response.error.content);
            res.end();
        } else {
            res.json(response.getPublicData().id)
        }
    });

    app.route(`${BASE_URL.ATI}/:id`).put(upload.single('code'), async (req, res, next) => {
        if (!req.file) {
            const error = errors['validation']['file']['notReceived'];
            logger.error(`${new Date()}: file was not received`, new Error('File was not received'));
            res.status(error.code);
            res.json(error.content);
            res.end();
        } else {
            const absolute_path = req.protocol + '://' + req.headers['host'] + '/' + req.file.path;
            const response = await atiController.replaceCodePath(absolute_path, req.params.id);
            if (response.error) {
                res.status(response.error.code);
                res.json(response.error.content);
                res.end();
            } else {
                res.json(response.getPublicData())
            }
        }
    });

    app.route(`${BASE_URL.ATI}/all`).get(async (req, res, next) => {
        const response = await atiController.getAllAti();
        if (response.error) {
            res.status(response.error.code);
            res.json(response.error.content);
            res.end();
        } else {
            res.json(response.map(x => x.getPublicData()))
        }
    });

    app.route(`${BASE_URL.ATI}/:id`).get(async (req, res, next) => {
        const response = await atiController.getAtiByExternalId(req.params.id);
        if (response.error) {
            res.status(response.error.code);
            res.json(response.error.content);
            res.end();
        } else {
            res.json(response.getPublicData())
        }
    });
};
