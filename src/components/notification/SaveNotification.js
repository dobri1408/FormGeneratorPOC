import { notification } from "antd";
export const openErrorNotification = (errorMessage) => {
  notification["error"]({
    message: "Saving failed",
    description:
      "The saving stop due to errors from tables in current page" +
      errorMessage,
    duration: 0,
  });
};
export const openSuccessNotification = () => {
  notification["success"](  {
    message: "Saved",
    description: "The current tab was saved",
  });
};
