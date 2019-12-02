const fs = require('fs');
const archiver = require('archiver');
const APP_DIR = require("path").dirname(require.main.filename) + '/uploads/';
const ARCHIVE_NAME = 'data.zip';

const intelLogger = require('intel');
const logger = intelLogger.getLogger('logger');

// const checkExists = async (filePath) => {
//
//     filePath = filePath.replace(new RegExp('/(.*):(.*)/uploads/'), APP_DIR)
//     console.log(filePath);
// };

const createArchive = (dataItems) => {
    if (fs.existsSync(APP_DIR + ARCHIVE_NAME)){
        fs.unlinkSync(APP_DIR + ARCHIVE_NAME);
    }

    const output = APP_DIR + ARCHIVE_NAME;
    const destination = fs.createWriteStream(output);

    const archive = archiver('zip', {
        gzip: true,
        zlib: { level: 9 } // Sets the compression level.
    });

    archive.pipe(destination);

    let i = 0;
    for(const item of dataItems) {
        try {
            archive.append(item.codePath, { name: `data${i + 1}.csv` });
            i++;
            logger.info(`${new Date()}: ${item.codePath} was added to archive`);
          //  checkExists(item.codePath)
        } catch (e) {
            logger.error(`${new Date()}: ${item.codePath} was not added to archive`);
        }
    }

    archive.finalize();
    return `/uploads/${ARCHIVE_NAME}`;
};

module.exports = {
    createArchive
};
