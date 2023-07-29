import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const bucket = 'robbie-next-ecommerce';
export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get('files') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 400 });
  }

  // Read the file contents and convert to ArrayBuffer
  const fileContent = await file.arrayBuffer();

  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(fileContent);

  const contentType = mime.lookup(file.name) || 'application/octet-stream';
  const links = [];
  const part = file.name.split('.').pop();
  const newFilename = Date.now() + '.' + part;
  const client = new S3Client({
    region: 'us-west-2',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
  });
  client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: newFilename,
      Body: buffer, // Pass the Buffer as the Body
      ContentType: contentType,
      ACL: 'public-read',
    })
  );
  const link = `https://${bucket}.s3.amazonaws.com/${newFilename}`;
  links.push(link);
  return NextResponse.json({ links }, { status: 200 });
};
