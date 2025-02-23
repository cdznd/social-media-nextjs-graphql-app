import { FeedTypeProps } from "@/types/feed"
import { PostType } from "@/types/post"
import PostCard from "@/components/PostCard"

export default function GridFeed({ posts }: FeedTypeProps) {
    const renderPosts = posts.map((post: PostType) => {
        return (
            <PostCard
                key={post.id}
                postData={post} />
        )
    })
    return <>{renderPosts}</>
}