const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.upload = (req: Request, res: Response) => {
	const key = `${req.user.id}/${uuid()}.jpeg`;

	s3.getSignedUrl(
		'putObject',
		{
			Bucket: 'resu1',
			ContentType: 'jpeg',
			Key: key
		},
		(err, url) => res.send({ key, url })
	);
};
