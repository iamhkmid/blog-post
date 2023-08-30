import React from "react";
import { GetPost } from "../../utils/services/services.type";
import styles from "./Post.module.css";
import { useRouter } from "next/router";
import { getComments, getUser } from "../../utils/services";
import { useQueries } from "@tanstack/react-query";
import Shimmer from "../Loading/Shimmer";
import { PostCommentLoading, PostUserLoading } from "../Loading/PostLoading";

type PostCardProps = {
  post: GetPost;
  page: number;
};
const PostCard: React.FC<PostCardProps> = ({ post, page }) => {
  const router = useRouter();

  const [user, comments] = useQueries({
    queries: [
      {
        queryKey: ["user", post.id],
        queryFn: () =>
          getUser({ variables: { userId: Number(post?.user_id) } }),
        enabled: !!post?.id,
      },
      {
        queryKey: ["comments", post.id],
        queryFn: () => getComments({ variables: { postId: Number(post?.id) } }),
        enabled: !!post?.id,
      },
    ],
  });

  const commentsLabel = (count: number) => {
    switch (count) {
      case 0:
        return "No comment";
      case 1:
        return `${count} comment`;
      default:
        return `${count} comments`;
    }
  };

  const gotoDetail = (postId: number) => {
    router.push({
      pathname: "/post",
      query: { postId, page },
    });
  };

  return (
    <div className={styles.post} onClick={() => gotoDetail(post.id)}>
      {user.isLoading && <PostUserLoading />}
      {!user.isLoading && (
        <div className="flex items-center gap-3">
          <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue-300 md:h-[24px] md:w-[24px]">
            <p className="text-[10px] font-bold text-white md:text-xs">
              {(user?.data?.name.charAt(0) || "#")?.toUpperCase()}
            </p>
          </div>
          <h3 className="text-[10px] font-semibold text-slate-500 md:text-xs">
            {user?.data?.name || "Anonymous"}
          </h3>
        </div>
      )}
      <h2 className="mt-2 cursor-pointer text-lg font-bold text-slate-800 md:text-2xl">
        {post.title}
      </h2>
      <p className="mt-1 line-clamp-3 text-xs text-slate-700 md:text-sm">
        {post.body}
      </p>
      {comments.isLoading && <PostCommentLoading />}
      {!comments.isLoading && (
        <div className="mt-3 w-fit rounded-[20px] bg-blue-100 px-[9px] py-[4px]">
          <p className="text-[9px] font-semibold text-slate-600 md:text-[10px]">
            {commentsLabel(comments.data?.length || 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
