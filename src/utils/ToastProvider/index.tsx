import React from "react";
import * as Toast from "@radix-ui/react-toast";
import ToastMessage from "../../components/ToastMessage";
import styles from "./ToasterProvider.module.css";

export type ToastContextProps = {
  openToast: (value: Toast) => void;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

type Toast = {
  title: string;
  description: string;
  status: "success" | "failed";
};

export const ToastContext = React.createContext<ToastContextProps | null>(null);

const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<Toast>({
    title: "",
    description: "",
    status: "success",
  });

  const onChangeToast = (value: Toast) => {
    setOpen(true);
    setToast(value);
  };

  const value: ToastContextProps = {
    openToast: onChangeToast,
  };
  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="left">
        {props.children}
        <ToastMessage
          open={open}
          setOpen={setOpen}
          title={toast.title}
          description={toast.description}
          status={toast.status}
        />
        <Toast.Viewport className={styles.ToastViewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
