let SERVICE_URL;

switch (process.env.NODE_ENV) {
  case "development":
    SERVICE_URL = "http://localhost:3500";

  case "production":
    SERVICE_URL = "https://tutor-scheduler-service.herokuapp.com/";

  default:
    SERVICE_URL = "http://localhost:3500";
}

export default {
  SERVICE_URL: SERVICE_URL,
};
