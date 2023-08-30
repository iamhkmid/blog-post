import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getUsers } from "../../src/utils/services";
import Pagination from "../../src/components/Primitives/Pagination";
import React from "react";
import PostLoading from "../../src/components/Loading/PostLoading";
import PostCard from "../../src/components/PostCard";
import UserCard from "../../src/components/UserCard";
import UserCardLoading from "../../src/components/Loading/UserCardLoading";

const User: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const queryPage = router.query.page as string;

  React.useEffect(() => {
    setPage(queryPage ? Number(queryPage) : 1);
  }, [queryPage]);

  const users = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ variables: { page, take: 10 } }),
    onError: () => {},
  });

  React.useEffect(() => {
    if (users.data) setCount(users?.data?.numberOfPages ?? 0);
  }, [users.data]);

  const onChangePage = (page: number) => {
    router.push({ query: { page } }, undefined, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return (
    <main className="mb-[100px] mt-[100px] flex flex-col items-center">
      <Head>
        <title>User List</title>
        <meta name="description" content="User List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col px-2 md:w-[700px] md:px-4">
        <div className="mb-[30px] w-full">
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={users.isLoading && !count}
          />
        </div>
        <div className="flex flex-col gap-4">
          {users.isLoading && <UserCardLoading />}
          {!users.isLoading && !!users.error && (
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-md bg-white py-[40px]">
              <h1 className="text-sm font-bold text-slate-600 md:text-base">
                Something went wrong..
              </h1>
              <button onClick={() => users.refetch()} className="btn-primary">
                Refetch
              </button>
            </div>
          )}
          {!users.isLoading &&
            users.data?.result?.map((user) => (
              <UserCard user={user} key={user.id} page={page} />
            ))}
        </div>
        <div className="mt-[30px] w-full">
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={users.isLoading && !count}
          />
        </div>
      </div>
    </main>
  );
};

export default User;
