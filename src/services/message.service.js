import { logger } from "../index";

const sendSuccess = function sendSuccess(level, message, data) {
  logger.log(level, message);

  return {
    success: true,
    message: message,
    data: data,
  };
};
const sendFailure = function sendFailure(level, message, error) {
  logger.log(level, message);

  return {
    success: false,
    message: message,
    error: error,
  };
};

export default {
  sendSuccess: sendSuccess,
  sendFailure: sendFailure,
};
