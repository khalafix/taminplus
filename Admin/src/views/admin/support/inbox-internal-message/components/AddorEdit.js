import React, { useState, useEffect } from "react";
import { Form, Spin , message} from "antd";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
// import { currencyService } from "services/base-Info/currencyService";
import { userMessageService } from "services/userMessage/userMessageService";

const { useForm } = Form;

const Add = ({
  onSubmit,
  currentData,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);


  const onFinish = (data) => {
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };

  const GetData = async () => {
    setLoading(true);
    const result = await userMessageService.getList();
    if (result.isSuccess) {

      result.data.status = result.data.isActive;
      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeAction === "edit") {
      GetData();
    }
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
    <p></p>
          </>
        )}
      </Form>
    </div>
  );
};

export default Add;
