import { message } from "antd";

export default (error) => {
  if (error?.response?.data) {
    try {
      switch (error?.response?.data?.code) {
        case 400:
          if (error?.response?.data?.msg) {
            message.error(error?.response?.data?.msg);
          } else {
            message.error(
              <>
                <span>{error?.response?.data?.msg}</span>
                <span>
                  {error?.response?.data?.violations?.map((item) => (
                    <>
                      <span>{item?.fieldName}</span>
                      <span>{item?.message}</span>
                    </>
                  ))}
                </span>
              </>
            );
          }

          break;
        case 401:
          try {
            handleOpenConfirmLogoutBox();
            // message.error('authentication failed')
            /*     message.error(error?.response?.data?.msg) */
          } catch (err) {
            // message.error('authentication failed')
            message.error(err);
          }
          break;
        case 406:
          message.error(error?.response?.data?.msg);
          break;
        case 503:
          message.error("Sorry! Server Error. Please try again.");
          // message.error(msg);

          break;
        case 500:
          message.error(
            error?.response?.data?.msg ||
              "Sorry! Server Error. Please try again."
          );
          // message.error(msg);

          break;
        case 409:
          // message.error("Duplicated Error");
          message.error(error?.response?.data?.msg);

          break;
        case 404:
          // message.error("Request failed , endpoint not found");
          message.error(
            error?.response?.data?.msg || "Request failed , endpoint not found"
          );

          break;
        case 403:
          handleOpenConfirmLogoutBox();
          message.error(error?.response?.data?.msg);

          break;
        default:
          message.error(error?.response?.data?.msg); //  ||'Request failed , endpoint not found'
          break;
      }
    } catch (error) {
      message.error(error);
    }
  } else {
    message.error("Request failed , endpoint not found");
  }
};

const handleOpenConfirmLogoutBox = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  //   window.location.href = '/login';
};
