import { CommentType } from "@/types/comment"
import PostCommentForm from "../PostCommentForm"
import PostComment from "../PostComment"

type PostCommentsProps = {
    postId: string,
    comments: CommentType[]
}

export default function PostComments({ postId, comments }: PostCommentsProps) {
    return (
        <>
            <PostCommentForm
                postId={postId}
            />
            {
                comments.map((comment: CommentType) => {
                    return <PostComment
                        key={comment?.id}
                        comment={comment} />
                })
            }
        </>
    )
}