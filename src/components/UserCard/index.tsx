import React from "react";
import { GetUser } from "../../utils/services/services.type";
import styles from "./UserCard.module.css";
import * as Separator from "@radix-ui/react-separator";
import UserEditModal from "../Modal/UserEditModal";

type UserCardProps = {
  user: GetUser;
  selected: number | null;
  onChange: (value: number | null) => void;
  onClickUpdate: () => void;
  onClickDelete: () => void;
};
const UserCard: React.FC<UserCardProps> = ({
  user,
  selected,
  onChange,
  onClickUpdate,
  onClickDelete,
}) => {
  return (
    <div
      className={styles.userCard}
      onMouseEnter={() => onChange(user.id)}
      onMouseLeave={() => onChange(null)}
    >
      <div className="flex items-center justify-between">
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
          className={`h-fit w-fit rounded-[20px] px-[12px] py-[5px] ${
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
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          selected === user.id ? "max-h-[70px]" : "max-h-0"
        }`}
      >
        <Separator.Root className="mt-4 h-[1px] w-full bg-slate-300" />
        <div className="mt-3 flex gap-2">
          <button
            onClick={onClickUpdate}
            className="flex h-fit items-center rounded-[20px] bg-blue-500 px-[10px] py-[5px] text-xs font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 md:text-sm"
          >
            Edit
          </button>
          <button
            onClick={onClickDelete}
            className="flex h-fit items-center rounded-[20px] bg-red-500 px-[10px] py-[5px] text-xs font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-red-600 md:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
