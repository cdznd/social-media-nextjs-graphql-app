import { NextRequest, NextResponse } from "next/server";
import uploadImageFileToS3 from "@/utils/upload";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("imageFile") as File;
        if (!file) {
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 })
        }
        // Upload file to S3
        const fileUrl = await uploadImageFileToS3(file);
        return NextResponse.json({ success: true, fileUrl });
    } catch (error) {
        return NextResponse.json({ error: `Error while uploading image to S3, ${error}` })
    }
}