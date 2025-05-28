import React ,{ useState } from 'react';
import { Row, Col, Card, Avatar, Button, Tooltip, message } from "antd";
import {EditOutlined } from '@ant-design/icons';
import { CPModal } from "components/CP";
import { useIntl, FormattedMessage } from "react-intl";
import CompanyInfo from 'views/pages/user-company/component/CompanyInfo';
import { userCompanyServices } from "services/userCompanyServices";
import { comboServices } from "services/comboService";
import dayjs from "dayjs";
import SelectService from 'views/pages/user-company/component/SelectService';

const CompanyInfoNew = ({info}) => {
    const [openModal, setOpenModal] = useState(false);
    const [typeAction, setTypeAction] = useState("add"); //  < "add") | "edit" | ("delete" >
    const [currentRow, setCurrentRow] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(info);
    const [comboDataSet, setComboDataSet] = useState({});

    const intl = useIntl();
    dayjs.calendar("");

    const handleOpenModal = (type, row) => {
        switch (type) {
          case "add":
            setTypeAction(type);
            setOpenModal(true);
            break;
          case "edit":
            setTypeAction(type);
            setCurrentRow(row);
            setOpenModal(true);
            break;
        }
      };

      const renderTitleModal = (type) => {
        switch (type) {
          case "add":
            return intl.formatMessage({ id: "selectServiceCompany" });
          case "edit":
            return intl.formatMessage({ id: "edit" });
          default:
            return "";
        }
      };

      const onCloseModal = () => {
        setOpenModal(false);
      };

      const CreateCompany = async (data) => {
        setLoading(true);
    
        const result = await userCompanyServices.add(data);
    
        if (result.isSuccess) {
          message.success(result.message);
          await getCompanyData();
          setOpenModal(false);
    
        } else {
          message.error(result.message);
          setLoading(false);
          setOpenModal(false);
    
        }
      };

      const getComboDataSet = async () => {
        const result = await comboServices.getIndexTemplateCombo();
        setComboDataSet(result);
      };

      const getCompanyData = async () => {
        setLoading(true);
    
        let result = await userCompanyServices.get();
        if (result.isSuccess) {
          let { data } = result;
    
          //#region Conver Date Persian To Miladi
          if (data?.shamsiCompanyRegisteredDate) {
            data.shamsiCompanyRegisteredDate =
              data?.shamsiCompanyRegisteredDate !== ""
                ? dayjs(data?.shamsiCompanyRegisteredDate, { jalali: false })
                : "";
          }
          //#endregion Conver Date Persian To Miladi
    
          setData(data);
          setLoading(false);
        }
        else {
          message.error(result.message);
          setLoading(false);
        }
      };

      const renderModalComponent = (type) => {
        switch (type) {
          case "edit":
            return (
              <CompanyInfo
                onCloseModal={onCloseModal}
                onSubmit={CreateCompany}
                loading={loading}
                currentData={data}
                typeAction={typeAction}
              />
            );
          case "add":
            return <SelectService onCloseModal={onCloseModal} currentData={data} />;
        }
      };

    return (
        <>
            <Card
                className="card-profile-head mb-24"
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" src={`data:images/png;base64,${data?.companyLogoBase64}`} />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">{data?.companyName}</h4>
                                    <p>{data?.email} / {data?.phone} / {data?.website} </p>
                                </div>
                            </Avatar.Group>
                        </Col>
                        <Col
                            span={24}
                            md={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >

                            <>
                                <Tooltip title="Edit Company Info">
                                    <Button shape="round" type="primary" icon={<EditOutlined />} onClick={() => handleOpenModal("edit", data)}/>
                                </Tooltip>
                            </>

                        </Col>
                    </Row>
                }
            ></Card>
               <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={"70%"}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
        </>
    )
}

export default CompanyInfoNew