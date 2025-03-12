import { Avatar } from "@mui/material"
import Image from "next/image"
import { brand } from "../common/themePrimitives"

type UserAvatarProps = {
    userImage: string,
    size?: {
        height: number,
        width: number, 
    }
}

export default function UserAvatar(
    { userImage, size }: UserAvatarProps
) {
    const {
        height = 75,
        width = 75
    } = size || {}
    return (
        <Avatar
            sx={{
                height: height,
                width: width,
                border: '1px solid',
                borderColor: brand[400]
            }}
        >
            <Image
                src={userImage}
                alt='User Avatar'
                height={height}
                width={width}
                quality={80}
                priority={true}
                style={{ objectFit: 'cover' }}
            />
        </Avatar>
    )
}