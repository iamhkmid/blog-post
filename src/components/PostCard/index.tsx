import React from "react";
import { GetPost } from "../../utils/services/services.type";
import styles from "./Post.module.css";
import { useRouter } from "next/router";

type PostCardProps = {
  post: GetPost;
  page: number;
};
const PostCard: React.FC<PostCardProps> = ({ post, page }) => {
  const router = useRouter();

  const gotoDetail = (postId: number) => {
    router.push({
      pathname: "/post",
      query: { postId, page },
    });
  };

  return (
    <div className={styles.post} onClick={() => gotoDetail(post.id)}>
      <div className="flex items-center gap-3">
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue-300 md:h-[24px] md:w-[24px]">
          <p className="text-[10px] font-bold text-white md:text-xs">
            {post.user?.name.charAt(0)?.toUpperCase()}
          </p>
        </div>
        <h3 className="text-[10px] font-semibold text-slate-500 md:text-xs">
          {post.user?.name}
        </h3>
      </div>
      <h2 className="mt-2 cursor-pointer text-lg font-bold text-slate-800 md:text-2xl">
        {post.title}
      </h2>
      <p className="mt-1 line-clamp-3 text-xs text-slate-700 md:text-sm">
        {post.body}
      </p>
      <div className="mt-3 w-fit rounded-[20px] bg-blue-100 px-[9px] py-[4px]">
        <p className="text-[9px] font-semibold text-slate-600 md:text-[10px]">
          {comments(post.numberOfComments)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
