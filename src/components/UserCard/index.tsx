import React from "react";
import { GetUser } from "../../utils/services/services.type";
import styles from "./UserCard.module.css";
import { useRouter } from "next/router";

type UserCardProps = {
  user: GetUser;
  page: number;
};
const UserCard: React.FC<UserCardProps> = ({ user, page }) => {
  const router = useRouter();

  const showDetail = (postId: number) => {
    router.push({
      pathname: "/post",
      query: { postId, page },
    });
  };

  return (
    <div className={styles.userCard} onClick={() => showDetail(user.id)}>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center">
          <div
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[50px] md:w-[50px] ${
              user.gender === "male" ? "bg-blue-300" : "bg-pink-300"
            }`}
          >
            <p className="text-sm font-bold text-white md:text-lg">
              {(user?.name.charAt(0) || "#")?.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="break-words text-xs font-bold text-slate-700 md:text-base">
            {user.name}
          </p>
          <p className="break-words text-[10px] font-normal text-slate-500 md:text-xs">
            {user.email}
          </p>
          <p
            className={`mt-1 text-[10px] font-bold capitalize text-slate-700 md:text-xs ${
              user.gender === "male" ? "text-blue-400" : "text-pink-400"
            }`}
          >
            {user.gender}
          </p>
        </div>
      </div>
      <div
        className={`w-fit rounded-[20px] px-[12px] py-[5px] ${
          user?.status === "active"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        <p className="text-[10px] font-bold capitalize md:text-xs">
          {user?.status}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
