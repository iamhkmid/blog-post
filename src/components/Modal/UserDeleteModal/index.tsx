import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../utils/services";
import { ToastContext, ToastContextProps } from "../../../utils/ToastProvider";
import CircleLoading from "../../Loading/CircleLoading";

type UserDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number | null;
};

const UserDeleteModal: React.FC<UserDeleteModalProps> = (props) => {
  if (!props.open) return null;
  return (
    <Dialog.Root open={props.open}>
      <Portal {...props} />
    </Dialog.Root>
  );
};

export default UserDeleteModal;

const Portal: React.FC<UserDeleteModalProps> = (props) => {
  const queryClient = useQueryClient();
  const { openToast } = React.useContext(ToastContext) as ToastContextProps;
  const user = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      openToast({
        title: "Success",
        description: "User deleted successfully",
        status: "success",
      });
      props.onClose();
    },
    onError: () => {
      openToast({
        title: "Failed",
        description: "Something went wrong",
        status: "failed",
      });
    },
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="animate-overlayShow fixed inset-0 z-50 bg-black/75" />
      <Dialog.Content className="animate-contentShow fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] px-2 md:w-[500px]">
        <div className="rounded-md bg-white px-7 py-9 shadow-xl md:px-10 md:py-10">
          <div className="absolute right-[20px] top-[20px]">
            <button
              type="button"
              className="rounded-md p-1 text-slate-700 hover:bg-rose-600/20 hover:text-rose-600"
              aria-label="Close"
              onClick={props.onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-600 md:text-xl">
              Delete Confirmation
            </h2>
            <p className="text-xs font-normal text-slate-600 md:text-sm">
              Are you sure you want to delete the data?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="btn-danger relative mt-7"
              disabled={user.isLoading}
              onClick={() =>
                user.mutate({ variables: { userId: props.userId! } })
              }
            >
              <div
                className={`${
                  !user.isLoading ? "opacity-0" : "opacity-100"
                } absolute left-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out`}
              >
                <CircleLoading />
              </div>
              <div
                className={`${
                  user.isLoading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-200 ease-in-out`}
              >
                Delete
              </div>
            </button>
            <button className="btn-secondary mt-7" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
