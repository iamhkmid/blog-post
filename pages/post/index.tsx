import { useQueries, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getComments, getPost, getUser } from "../../src/utils/services";
import * as Separator from "@radix-ui/react-separator";
import PostDetailLoading from "../../src/components/Loading/PostDetailLoading";
import PostUserLoading from "../../src/components/Loading/PostUserLoading";
import PostCommetsLoading from "../../src/components/Loading/PostCommetsLoading";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Post: NextPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const page = router.query.page as string;

  const post = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost({ variables: { postId: Number(postId) } }),
  });

  const [user, comments] = useQueries({
    queries: [
      {
        queryKey: ["user", postId],
        queryFn: () =>
          getUser({ variables: { userId: Number(post.data?.user_id) } }),
        enabled: !!post.data?.id,
      },
      {
        queryKey: ["comments", postId],
        queryFn: () =>
          getComments({ variables: { postId: Number(post.data?.id) } }),
        enabled: !!post.data?.id,
      },
    ],
  });

  const userName = user.data?.name ?? "Anonymous";

  const onClickBack = () =>
    router.push({
      pathname: "/",
      query: { page: page ? page : 1 },
    });

  return (
    <main className="mb-[100px] mt-[100px] flex flex-col items-center px-2 md:px-4">
      <div className="flex w-full justify-start md:w-[700px]">
        <button className="btn-primary icon-left mb-5" onClick={onClickBack}>
          <div className="flex items-center gap-1">
            <ChevronLeftIcon className="h-[16px] md:h-[18px]" /> Back
          </div>
        </button>
      </div>
      {post.isLoading && <PostDetailLoading />}
      {!post.isLoading && (
        <div className="flex w-full flex-col rounded-md bg-white px-5 py-8 md:w-[700px] md:px-10">
          <h2 className="text-xl font-bold md:text-3xl">{post?.data?.title}</h2>
          {user.isLoading && <PostUserLoading />}
          {!user.isLoading && (
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-blue-300 md:h-[28px] md:w-[28px]">
                <p className="text-[12px] font-bold text-white md:text-[14px]">
                  {userName.charAt(0)?.toUpperCase()}
                </p>
              </div>
              <h3 className="text-[12px] font-semibold text-slate-500 md:text-sm">
                {userName}
              </h3>
            </div>
          )}
          <Separator.Root className="mt-8 h-[1px] w-full bg-slate-300" />
          <p className="mt-8 text-xs font-normal text-slate-700 md:text-base">
            {post?.data?.body}
          </p>
          <Separator.Root className="mt-8 h-[1px] w-full bg-slate-300" />
          {comments.isLoading && <PostCommetsLoading />}
          {!comments.isLoading && (
            <div className="mt-8 flex flex-col">
              <h2 className="text-base font-semibold text-slate-700 md:text-xl">
                {`Comments ${
                  !!comments?.data?.length ? `(${comments?.data?.length})` : ""
                }`}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {!comments.data?.length && (
                  <div className="flex h-[100px] w-full flex-col items-center justify-center">
                    <h1 className="text-xs font-semibold text-slate-600 md:text-base">
                      No comment..
                    </h1>
                  </div>
                )}
                {comments?.data?.map((comment) => (
                  <div key={comment.id} className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue-300">
                        <p className="text-[11px] font-bold text-white">
                          {comment.name.charAt(0)?.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex flex-col items-start md:flex-row md:items-center md:gap-2">
                        <h3 className="text-xs font-semibold text-slate-500 md:text-sm">
                          {comment.name}
                        </h3>
                        <p className="text-[10px] font-normal text-slate-500 md:text-xs">
                          {comment.email}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-700 md:text-sm">
                      {comment.body}
                    </p>
                    <Separator.Root className="mt-5 h-[1px] w-full bg-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Post;
