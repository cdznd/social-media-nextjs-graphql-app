import { uploadFileToS3 } from "@/lib/aws/s3";

export default async function uploadImageFileToS3(imageFile: File) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    // Upload file to S3
    const fileUrl = await uploadFileToS3(fileBuffer, imageFile.name);
    return fileUrl;
}
