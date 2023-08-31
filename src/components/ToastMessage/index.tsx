import * as Toast from "@radix-ui/react-toast";
import styles from "./ToastMessage.module.css";

type ToastMessageProps = {
  title: string;
  description: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  status: "success" | "failed";
};

const ToastMessage: React.FC<ToastMessageProps> = (props) => {
  const status = () => {
    switch (props.status) {
      case "success":
        return "text-blue-500";
      case "failed":
        return "text-red-500";
      default:
        return "";
    }
  };
  return (
    <Toast.Root
      className={styles.ToastRoot}
      open={props.open}
      onOpenChange={props.setOpen}
    >
      <Toast.Title className={`${styles.ToastTitle} ${status()}`}>
        {props.title}
      </Toast.Title>
      <Toast.Description className={styles.ToastDescription}>
        {props.description}
      </Toast.Description>
    </Toast.Root>
  );
};
export default ToastMessage;
