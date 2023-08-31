import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../src/utils/services";
import Pagination from "../../src/components/Primitives/Pagination";
import React from "react";
import UserCard from "../../src/components/UserCard";
import UserCardLoading from "../../src/components/Loading/UserCardLoading";
import UserEditModal from "../../src/components/Modal/UserEditModal";
import { GetUser } from "../../src/utils/services/services.type";
import UserDeleteModal from "../../src/components/Modal/UserDeleteModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import * as Separator from "@radix-ui/react-separator";

type UpdateUser = {
  open: boolean;
  data: GetUser | null;
};

type DeleteUser = {
  open: boolean;
  userId: number | null;
};

const User: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [count, setCount] = React.useState(0);
  const [updateUser, setUpdateUser] = React.useState<UpdateUser>({
    open: false,
    data: null,
  });
  const [deleteUser, setDeleteUser] = React.useState<DeleteUser>({
    open: false,
    userId: null,
  });
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
        <div className="flex flex-col gap-4 rounded-md bg-white px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-2">
            <input
              className="w-full rounded-[20px] border-[1px] border-slate-300 px-3 py-2 text-sm font-normal text-slate-600 outline-none placeholder:text-xs placeholder:font-normal focus:border-blue-600 md:text-base md:placeholder:text-sm"
              placeholder="Search user.."
            />
            <button className="btn-primary icon-left">
              <PlusIcon className="mr-1 h-[16px] text-white md:h-[18px]" />
              Search
            </button>
          </div>
          <button className="btn-primary icon-left">
            <PlusIcon className="mr-1 h-[16px] text-white md:h-[18px]" />
            Add
          </button>
        </div>
        <Separator.Root className="mb-3 mt-5 h-[2px] w-full bg-slate-400" />
        <div className="mt-4 flex flex-col gap-4">
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
              <UserCard
                user={user}
                key={user.id}
                selected={selected}
                onChange={setSelected}
                onClickUpdate={() => setUpdateUser({ open: true, data: user })}
                onClickDelete={() =>
                  setDeleteUser({ open: true, userId: user.id })
                }
              />
            ))}
        </div>
        <UserEditModal
          defaultValues={updateUser.data}
          open={updateUser.open}
          onClose={() => setUpdateUser((prev) => ({ ...prev, open: false }))}
          page={page}
        />
        <UserDeleteModal
          open={deleteUser.open}
          onClose={() => setDeleteUser({ open: false, userId: null })}
          userId={deleteUser.userId}
        />
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
