import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { CPTag, CPDivider,CPModal} from "components/CP";
import { Form, Descriptions, Typography } from "antd";
import { userMessageService } from "services/userMessage/userMessageService";
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import TableInit from "./initial/TableInit";
import AdvanceTable from "components/AdvanceTable";
import { ShowMessage } from "../ShowMessage";

const { useForm } = Form;
const { Title } = Typography;

const UserMessage = ({ currentRow }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [data, setData] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  const [messageData , setMessageData]=useState("");

  const [openModal, setOpenModal] = useState(false);

    const handelModal = (row) => {
      
        setOpenModal(true)
        let body=row.body;
        setMessageData(body);

    }
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const renderModalComponent = () => {

        return (
            <ShowMessage messageData={messageData} />
        );
    };

    const renderTitleModal = () => {

        return intl.formatMessage({ id: "show" }) + ' ' + intl.formatMessage({ id: "UserMessage" });
    };

    const sizeModal = () => {
        return 1500;
    };

  const GetData = async () => {


    let result = await userMessageService.getList();
        form.setFieldsValue({
      ...result.data,

    });
    setData(result.data);
  };

  return (
    <>
      <AdvanceTable
        columnsTable={TableInit({ handelModal : handelModal
        })}
        apiBuilder={userMessageService.getList}
        againFetch={againFetch}
        setAgainFetch={setAgainFetch}
      />
      <CPModal
            title={renderTitleModal()}
            visible={openModal}
            closable
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={sizeModal()}
        >
            {renderModalComponent()}
        </CPModal>
    </>
  );
};
export default UserMessage;
