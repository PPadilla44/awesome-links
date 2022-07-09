import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    process.env.APP_AWS_REGION,
    process.env.APP_AWS_ACCESS_KEY,
    process.env.APP_AWS_SECRET_KEY
  );

  try {
    const s3 = new aws.S3({
      region: process.env.APP_AWS_REGION,
      credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      },
    });

    aws.config.update({
      region: process.env.APP_AWS_REGION,
      signatureVersion: "v4",
      credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      },
    });

    const post = s3.createPresignedPost({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Fields: {
        key: req.query.file,
      },
      Expires: 60,
      Conditions: [["content-length-range", 0, 5048576]],
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
  }
}
