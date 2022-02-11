import { notification } from "antd";
export const openErrorNotification = () => {
  notification["error"]({
    message: "Saving failed",
    description: "The saving stop due to errors from tables in current page",
  });
};
export const openSuccessNotification = () => {
  notification["success"]({
    message: "Saved",
    description: "The current tab was saved",
  });
};
