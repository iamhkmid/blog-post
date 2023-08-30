import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../src/utils/services";
import Pagination from "../src/components/Primitives/Pagination";
import React from "react";
import PostLoading from "../src/components/Loading/PostLoading";
import styles from "./pages.module.css";
import PostCard from "../src/components/PostCard";

const Home: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const queryPage = router.query.page as string;

  React.useEffect(() => {
    setPage(queryPage ? Number(queryPage) : 1);
  }, [queryPage]);

  const posts = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ variables: { page, take: 10 } }),
    onError: () => {},
  });

  React.useEffect(() => {
    if (posts.data) setCount(posts?.data?.[0].numberOfPages ?? 0);
  }, [posts.data]);

  const comments = (count: number) => {
    switch (count) {
      case 0:
        return "No comment";
      case 1:
        return `${count} comment`;
      default:
        return `${count} comments`;
    }
  };

  const onChangePage = (page: number) => {
    router.push({ query: { page } }, undefined, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return (
    <main className="mb-[100px] mt-[100px] flex flex-col items-center">
      <Head>
        <title>Posts List</title>
        <meta name="description" content="Post Today" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col px-2 md:w-[700px] md:px-4">
        <div className="mb-[30px] w-full">
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={posts.isLoading && !count}
          />
        </div>
        <div className="flex flex-col gap-6">
          {posts.isLoading && <PostLoading />}
          {!posts.isLoading && !!posts.error && (
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-md bg-white py-[40px]">
              <h1 className="text-sm font-bold text-slate-600 md:text-base">
                Something went wrong..
              </h1>
              <button onClick={() => posts.refetch()} className="btn-primary">
                Refetch
              </button>
            </div>
          )}
          {!posts.isLoading &&
            posts.data?.map((post) => (
              <PostCard data={post} key={post.id} page={page} />
            ))}
        </div>
        <div className="mt-[30px] w-full">
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={posts.isLoading && !count}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
