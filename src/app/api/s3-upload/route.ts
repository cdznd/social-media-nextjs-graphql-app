import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
    },
});

async function uploadFileToS3(fileBuffer: Buffer, filename: string) {
    const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
        Key: `uploads/${filename}`,
        Body: fileBuffer,
        ContentType: 'image/jpg',
    };
    const command = new PutObjectCommand(uploadParams)
    try {
        await s3Client.send(command);
        return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/uploads/${filename}`;
    } catch (error) {
        throw new Error(`S3 Upload Error: ${error}`);
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("imageFile") as File;
        if (!file) {
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 })
        }
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        // Upload file to S3
        const fileUrl = await uploadFileToS3(fileBuffer, file.name);
        return NextResponse.json({ success: true, fileUrl });
    } catch (error) {
        return NextResponse.json({ error: `Error while uploading image to S3, ${error}` })
    }
}