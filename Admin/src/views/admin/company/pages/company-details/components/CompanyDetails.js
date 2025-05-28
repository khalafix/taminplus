import React, { useState, useEffect } from "react";
//UI
import { Collapse, Row, Card, Col, Dropdown, Menu, Button, Space } from "antd";
import { CPCard, CPButton, CPModal } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";

import CompanyItem from "./CompanyItem";
import ArchiveMedia from "./links/ArchiveMedia";
import POMidTermEvaluation from "./links/POMidTermEvaluation";
import POFinalEvaluation from "./links/POFinalEvaluation";
import POWarrantyEvaluation from "./links/POWarrantyEvaluation";
import InitalEvaluation from "./links/initalEvaluation/InitalEvaluation";
import BiddInterestInvitation from "./links/biddInterestInvitation/BiddInterestInvitation";
import BiddInterest from "./links/biddInterest/BiddInterest";
import PurchaseOrder from "./links/purchaseOrder/PurchaseOrder";

import { Color } from "utils/color";
import CPPanel from "components/CP/CPPanel/CPPanel";

const { Item } = Menu;

const CompanyDetails = ({ info, companyId }) => {
  const intl = useIntl();
  const gridStyle = {
    width: "100%",
    fontSize: "13px",
  };
  

  const [typeAction, setTypeAction] = useState("add");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [companyType, setCompanyType] = useState("");

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onClickMenu = (e) => {
    switch (e.key) {
      case "History":
        break;

      default:
        break;
    }
  };
  const menuItems = () => {
    return (
      <Menu onClick={(e) => onClickMenu(e)}>
        {info?.companyInfo?.isVendor == true ? (
          <Item
            key="vendor"
            onClick={() => handleModal("initalEvaluation", "vendor")}
          >
            {" "}
            <FormattedMessage id="vendor" />
          </Item>
        ) : null}

        {info?.companyInfo?.isSupplier == true ? (
          <Item
            key="supplier"
            onClick={() => handleModal("initalEvaluation", "supplier")}
          >
            <FormattedMessage id="supplier" />
          </Item>
        ) : null}

        {info?.companyInfo?.isServiceProvider == true ? (
          <Item
            key="serviceProvider"
            onClick={() => handleModal("initalEvaluation", "serviceProvider")}
          >
            <FormattedMessage id="serviceProvider" />
          </Item>
        ) : null}
      </Menu>
    );
  };

  const sizeModal = (typeAction) => {
    switch (typeAction) {
      case "media":
        return 800;
      case "poMidTermEvaluation":
        return 1200;
      case "poFinalEvaluation":
        return 1200;
      case "poWarrantyEvaluation":
        return 1200;
      case "initalEvaluation":
        return 1200;
        case "biddInterestInvitation":
          return 1500;
          case "biddInterest":
            return 1500;
            case "purchaseOrder":
              return 1500;
    }
  };

  const renderModalComponent = (type) => {
    switch (type) {
      case "media":
        return (
          <ArchiveMedia
            onCloseModal={onCloseModal}
            parentLoading={loading}
            companyId={companyId}
          />
        );
      case "poMidTermEvaluation":
        return (
          <POMidTermEvaluation
            onCloseModal={onCloseModal}
            parentLoading={loading}
            companyId={companyId}
          />
        );
      case "poFinalEvaluation":
        return (
          <POFinalEvaluation
            onCloseModal={onCloseModal}
            parentLoading={loading}
            companyId={companyId}
          />
        );
      case "poWarrantyEvaluation":
        return (
          <POWarrantyEvaluation
            onCloseModal={onCloseModal}
            parentLoading={loading}
            companyId={companyId}
          />
        );
      case "initalEvaluation":
        return (
          <InitalEvaluation
            onCloseModal={onCloseModal}
            parentLoading={loading}
            companyId={companyId}
            companyType={companyType}
          />
        );
        case "biddInterestInvitation":
          return (
            <BiddInterestInvitation
              onCloseModal={onCloseModal}
              parentLoading={loading}
              companyId={companyId}
              companyType={companyType}
            />
          );
          case "biddInterest":
            return (
              <BiddInterest
                onCloseModal={onCloseModal}
                parentLoading={loading}
                companyId={companyId}
                companyType={companyType}
              />
            );
            case "purchaseOrder":
              return (
                <PurchaseOrder
                  onCloseModal={onCloseModal}
                  parentLoading={loading}
                  companyId={companyId}
                  companyType={companyType}
                />
              );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "media":
        return intl.formatMessage({ id: "archiveMedia" });
      case "poMidTermEvaluation":
        return intl.formatMessage({ id: "poMidTermEvaluation" });
      case "poWarrantyEvaluation":
        return intl.formatMessage({ id: "poWarrantyEvaluation" });
      case "poFinalEvaluation":
        return intl.formatMessage({ id: "poFinalEvaluation" });
      case "initalEvaluation":
        return intl.formatMessage({ id: "initalEvaluation" });
        case "biddInterestInvitation":
          return intl.formatMessage({ id: "biddInterestInvitation" });
          case "biddInterest":
            return intl.formatMessage({ id: "biddInterest" });
            case "purchaseOrder":
              return intl.formatMessage({ id: "purchaseOrderList" });
    }
  };

  const handleModal = (type, companyType) => {
    switch (type) {
      case "media":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "poMidTermEvaluation":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "poFinalEvaluation":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "poWarrantyEvaluation":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "initalEvaluation":
        setCompanyType(companyType);
        setTypeAction(type);
        setOpenModal(true);
        break;
        case "biddInterestInvitation":
          setCompanyType(companyType);
          setTypeAction(type);
          setOpenModal(true);
          break;
          case "biddInterest":
            setCompanyType(companyType);
            setTypeAction(type);
            setOpenModal(true);
            break;
            case "purchaseOrder":
              setCompanyType(companyType);
              setTypeAction(type);
              setOpenModal(true);
              break;
    }
  };

  return (
    <>
      <Row style={{ marginTop: "1%" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          <Row>
            <Col sm={24} md={24} className="company-action-button-container">
              <CPButton
                type="primary"
                onClick={() => handleModal("media", null)}
              >
                {intl.formatMessage({ id: "Media" })}
              </CPButton>

              {
                <Dropdown trigger={["click"]} overlay={menuItems()}>
                  <Button type="primary">
                    <Space>
                      {intl.formatMessage({ id: "initalEvaluation" })}
                    </Space>
                  </Button>
                </Dropdown>
              }
              <CPButton
                type="primary"
                onClick={() => handleModal("poMidTermEvaluation", null)}
              >
                {intl.formatMessage({ id: "poMidTermEvaluation" })}
              </CPButton>
              <CPButton
                type="primary"
                onClick={() => handleModal("poWarrantyEvaluation", null)}
              >
                {intl.formatMessage({ id: "poWarrantyEvaluation" })}
              </CPButton>
              <CPButton
                type="primary"
                onClick={() => handleModal("poFinalEvaluation", null)}
              >
                {intl.formatMessage({ id: "poFinalEvaluation" })}
              </CPButton>
              <CPButton
                type="primary"
                onClick={() => handleModal("purchaseOrder", null)}
              >
                {intl.formatMessage({ id: "purchaseOrderList" })}
              </CPButton>

              <CPButton
                type="primary"
                onClick={() => handleModal("biddInterest", null)}
              >
                {intl.formatMessage({ id: "biddInterest" })}
              </CPButton>
              <CPButton
                type="primary"
                onClick={() => handleModal("biddInterestInvitation", null)}
              >
                {intl.formatMessage({ id: "biddInterestInvitation" })}
              </CPButton>
      
            </Col>
          </Row>
        </Card.Grid>
      </Row>
      <Row style={{ marginTop: "1%" }}></Row>
      {info?.companyInfo?.isVendor == true ? (
         <CPPanel
         bordered
         stylePanel={true}
         styleClassName={
           info?.companyInfo?.isAcceptedVendor == true
             ? "custom-ant-collapse-header-green"
             : info?.companyInfo?.isAcceptedVendor == null
             ? "custom-ant-collapse-header-yellow"
             : "custom-ant-collapse-header-red"}
          header={`${intl.formatMessage({ id: "vendorInformation" })} -  ${
            info?.companyInfo?.isAcceptedVendor == true
              ? "Accepted"
              : info?.companyInfo?.isAcceptedVendor == null
              ? " Registered"
              : " Rejected"
          }`}
          // bodyStyle={{
          //   backgroundColor: "ivory",
          //   padding: 10,
          // }}
          // headStyle={{ backgroundColor: "beige" }}
          headStyle={
            info?.companyInfo?.isAcceptedVendor == null
              ? {
                  backgroundColor: "beige",
                }
              : info?.companyInfo?.isAcceptedVendor == true
              ? {
                  backgroundColor: Color.grass,
                }
              : {
                  backgroundColor: Color.whitered,
                }
          }
        >
          <CompanyItem companyType={"Manufacture"} companyId={companyId} />
        </CPPanel>
      ) : null}


<Row style={{ marginTop: "1.5%" }}></Row>

{info?.companyInfo?.isSupplier == true ? (
        <CPPanel
          bordered
          stylePanel={true}
          styleClassName={
            info?.companyInfo?.isAcceptedSupplier == true
              ? "custom-ant-collapse-header-green"
              : info?.companyInfo?.isAcceptedSupplier == null
              ? "custom-ant-collapse-header-yellow"
              : "custom-ant-collapse-header-red"}
          header={
            intl.formatMessage({ id: "supplierInformation" }) +
            " -" +
            (info?.companyInfo?.isAcceptedSupplier == true
              ? "Accepted"
              : info?.companyInfo?.isAcceptedSupplier == null
              ? " Registered"
              : " Rejected")
          }
          // bodyStyle={
          //   info?.companyInfo?.isAcceptedSupplier == null ?
          //     {
          //       backgroundColor: "ivory",
          //       padding: 10,
          //     } : info?.companyInfo?.isAcceptedSupplier == true ?
          //       {
          //         backgroundColor: Color.green,
          //         padding: 10,
          //       } :
          //       {
          //         backgroundColor: Color.red,
          //         padding: 10,
          //       }

          // }
          headStyle={
            info?.companyInfo?.isAcceptedSupplier == null
              ? {
                  backgroundColor: "beige",
                }
              : info?.companyInfo?.isAcceptedSupplier == true
              ? {
                  backgroundColor: Color.grass,
                }
              : {
                  backgroundColor: Color.whitered,
                }
          }
        >
          <CompanyItem companyType={"Supplier"} companyId={companyId} />
        </CPPanel>
      ) : null}

      <Row style={{ marginTop: "1.5%" }}></Row>

      {info?.companyInfo?.isServiceProvider == true ? (
         <CPPanel
         bordered
         stylePanel={true}
         styleClassName={
           info?.companyInfo?.isAcceptedServiceProvider == true
             ? "custom-ant-collapse-header-green"
             : info?.companyInfo?.isAcceptedServiceProvider == null
             ? "custom-ant-collapse-header-yellow"
             : "custom-ant-collapse-header-red"}
          header={
            intl.formatMessage({ id: "serviceProviderInformation" }) +
            " -" +
            (info?.companyInfo?.isAcceptedServiceProvider == true
              ? "Accepted"
              : info?.companyInfo?.isAcceptedServiceProvider == null
              ? " Registered"
              : " Rejected")
          }
          // bodyStyle={{
          //   backgroundColor: "ivory",
          //   padding: 10,
          // }}
          // headStyle={{ backgroundColor: "beige" }}

          headStyle={
            info?.companyInfo?.isAcceptedServiceProvider == null
              ? {
                  backgroundColor: "beige",
                }
              : info?.companyInfo?.isAcceptedServiceProvider == true
              ? {
                  backgroundColor: Color.grass,
                }
              : {
                  backgroundColor: Color.whitered,
                }
          }
        >
          <CompanyItem companyType={"ServiceProvider"} companyId={companyId} />
        </CPPanel>
      ) : null}

      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={sizeModal(typeAction)}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </>
  );
};

export default CompanyDetails;
