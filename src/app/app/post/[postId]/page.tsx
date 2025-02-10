import { Container } from "@mui/material";

type PostPageProps = {
    params: {
        postId: string
    }
}

export default function PostPage({ params }: PostPageProps) {
    const { postId } = params
    return (
        <Container>
            <h1>{postId}</h1>
            <h1>Post Page</h1>
        </Container>
    )
}