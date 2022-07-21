const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const s3 = new AWS.S3();

const filename = 'currency-rates.json';
const bucket = process.env.bucket;

const saveToS3 = (payload) => {
    return new Promise((resolve, reject) => {
        console.debug('Uploading to S3...');
        const s3params = {
            Body: JSON.stringify(payload),
            Bucket: bucket,
            Key: filename,
        };
        s3.putObject(s3params, (AWSError, payload) => {
            if (AWSError) {
                console.error(AWSError, AWSError.stack);
                reject(AWSError);
            } else {
                console.debug(`${filename} uploaded to AWS S3`);
                resolve(true);
            }
        });
    });
}

module.exports = { saveToS3 };