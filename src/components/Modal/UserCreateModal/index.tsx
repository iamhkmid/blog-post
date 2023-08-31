import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./validationSchema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styles from "./UserCreateModal.module.css";
import { GetUser, GetUsers } from "../../../utils/services/services.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../../../utils/services";
import { ToastContext, ToastContextProps } from "../../../utils/ToastProvider";
import CircleLoading from "../../Loading/CircleLoading";
import { useRouter } from "next/router";

type Schema = z.infer<typeof validationSchema>;

type UserCreateModalProps = {
  open: boolean;
  onClose: () => void;
  page: number;
};

const status = ["active", "inactive"];
const gender = ["male", "female"];

const UserCreateModal: React.FC<UserCreateModalProps> = (props) => {
  if (!props.open) return null;
  return (
    <Dialog.Root open={props.open}>
      <Portal {...props} />
    </Dialog.Root>
  );
};

export default UserCreateModal;

const Portal: React.FC<UserCreateModalProps> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openToast } = React.useContext(ToastContext) as ToastContextProps;
  const user = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      openToast({
        title: "Success",
        description: "User updated successfully",
        status: "success",
      });
      router.push({
        pathname: "/user",
        query: {
          page: 1,
        },
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
  const form = useForm<Schema>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      gender: "",
      name: "",
      status: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    user.mutate({
      variables: {
        email: values.email,
        name: values.name,
        status: values.status,
        gender: values.gender,
      },
    });
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="animate-overlayShow fixed inset-0 z-50 bg-black/75" />
      <Dialog.Content className="animate-contentShow fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] px-2 md:w-[500px]">
        <form
          className="rounded-md bg-white px-7 py-9 shadow-xl md:px-10 md:py-10"
          onSubmit={onSubmit}
        >
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
          <Dialog.Title className="text-xl font-bold text-blue-600 md:text-2xl">
            Create User
          </Dialog.Title>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <fieldset className="mt-8 flex flex-col gap-1">
                <label className="text-xs text-slate-600 md:text-sm">
                  Name
                </label>
                <input
                  className="w-full rounded-md border-[1px] border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none placeholder:text-xs placeholder:font-normal focus:border-blue-600 md:text-base md:placeholder:text-sm"
                  placeholder="Type name here"
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.error && (
                  <p className="text-[9px] font-normal text-red-500 md:text-[10px]">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <fieldset className="mt-5 flex flex-col gap-1">
                <label className="text-xs text-slate-600 md:text-sm">
                  Email
                </label>
                <input
                  className="w-full rounded-md border-[1px] border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none placeholder:text-xs placeholder:font-normal focus:border-blue-600 md:text-base md:placeholder:text-sm"
                  placeholder="Type email here"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <p className="text-[9px] font-normal text-red-500 md:text-[10px]">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />
          <fieldset className="mt-5 flex flex-col gap-[10px]">
            <label className="text-xs text-slate-600 md:text-sm">Gender</label>
            <Controller
              control={form.control}
              name="gender"
              render={({ field }) => (
                <RadioGroup.Root
                  className="flex gap-[20px]"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {gender.map((item, idx) => (
                    <div key={item} className="flex items-center gap-[10px]">
                      <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value={item}
                        id={`{r-gender-${idx + 1}}`}
                      >
                        <RadioGroup.Indicator
                          className={styles.RadioGroupIndicator}
                        />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-semibold capitalize text-slate-600 md:text-sm"
                        htmlFor={`{r-gender-${idx + 1}}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </RadioGroup.Root>
              )}
            />
          </fieldset>
          <fieldset className="mt-5 flex flex-col gap-[10px]">
            <label className="text-xs text-slate-600 md:text-sm">Status</label>
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <RadioGroup.Root
                  className="flex gap-[20px]"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {status.map((item, idx) => (
                    <div key={item} className="flex items-center gap-[10px]">
                      <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value={item}
                        id={`{r-status-${idx + 1}}`}
                      >
                        <RadioGroup.Indicator
                          className={styles.RadioGroupIndicator}
                        />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-semibold capitalize text-slate-600 md:text-sm"
                        htmlFor={`{r-status-${idx + 1}}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </RadioGroup.Root>
              )}
            />
          </fieldset>
          <div className="mt-3 flex gap-3">
            <button
              className="btn-primary relative mt-7"
              disabled={user.isLoading || !form.formState.isValid}
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
                Create
              </div>
            </button>
            <button className="btn-secondary mt-7" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
