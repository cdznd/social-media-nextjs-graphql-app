import { Typography } from "@mui/material"

type PostPageParams = Promise<{
    postId: string
}>

export default async function PostPage(
    props: { params: PostPageParams }
) {
    const { postId } = await props.params
    return (
        <Typography>postId: {postId}</Typography>
    )

}