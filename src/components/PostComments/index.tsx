import { CommentType } from "@/types/comment"
import PostCommentForm from "../PostCommentForm"
import PostComment from "../PostComment"
import { auth } from "@/lib/next-auth/auth"

type PostCommentsProps = {
    postId: string,
    comments: CommentType[]
}

export default async function PostComments({ postId, comments }: PostCommentsProps) {
    const session = await auth()
    const loggedUserId = session?.user?.id ?? ''
    return (
        <>
            <PostCommentForm
                postId={postId}
                loggedUserId={loggedUserId}
            />
            {
                comments.map((comment: CommentType) => {
                    return <PostComment
                        key={comment?.id}
                        comment={comment}
                        loggedUserId={loggedUserId}
                        postId={postId} />
                })
            }
        </>
    )
}