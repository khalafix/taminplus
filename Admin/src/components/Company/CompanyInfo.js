import { CPDescriptions, CPCard, CPButton, CPTooltip } from "components/CP";
import { CheckboxValueType } from 'antd/es/checkbox/Group';

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { Col, Checkbox, Row } from "antd";


const CompanyInfo = ({ info, handleChangeAction, hasView = false, index, showCard }) => {
  const intl = useIntl();
  
  const DescriptionsItems = [
    {
      value: info?.companyName || "---",
      label: <FormattedMessage id="companyName" />,
    },
    {
      value: info?.exName || "---",
      label: <FormattedMessage id="companyShortName" />,
    },
    {
      value: info?.registerBy || "---",
      label: <FormattedMessage id="registerBy" />,
    },
    {
      value: info?.companyNationalCode || "---",
      label: <FormattedMessage id="companyNationalCode" />,
    },

    {
      value: info?.companyRegisteredNumber || "---",
      label: <FormattedMessage id="companyRegisteredNumber" />,
    },

    {
      value: info?.companyRegistered || "---",
      label: <FormattedMessage id="companyRegisteredDate" />,
    },

    {
      value: info?.companyRegisteredPlace || "---",
      label: <FormattedMessage id="companyRegisteredPlace" />,
      span: 0,
    },

    {
      value: info?.phone || "---",
      label: <FormattedMessage id="phone" />,
    },
    {
      value: info?.fax || "---",
      label: <FormattedMessage id="fax" />,
    },
    {
      value: info?.email || "---",
      label: <FormattedMessage id="email" />,
    },
    {
      value: info?.website || "---",
      label: <FormattedMessage id="website" />,
    },

    {
      value: info?.companyDescription || "---",
      label: <FormattedMessage id="description" />,
      span: 0,
    },

    {
      value: info?.originTitle || "---",
      label: <FormattedMessage id="origin" />,
      span: 0,
    },

    {
      value: info?.establishYear || "---",
      label: <FormattedMessage id="establishYear" />,
      span: 0,
    },

    {
      value: info?.ceo || "---",
      label: <FormattedMessage id="ceo" />,
      span: 0,
    },

    {
      value: info?.companyAddress || "---",
      label: <FormattedMessage id="companyAddress" />,
      span: 3,
    },

    {

      value:

        <Row>

          <Checkbox checked={info?.hasVendor} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="manufacturer" /></span></Checkbox>


          <Checkbox checked={info?.hasSupplier} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="supplier" /></span></Checkbox>


          <Checkbox checked={info?.hasServiceProvider} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="serviceProvider" /></span></Checkbox>

        </Row>
      ,
      label: <FormattedMessage id="companyType" />,
      // label: <Checkbox.Group options={optionsWithDisabled} />,
      span: 3,
    },

    {
      value: <Row >

        <Checkbox checked={info?.evalutedIsVendor} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="manufacturer" /></span></Checkbox>


        <Checkbox checked={info?.evalutedIsSupplier} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="supplier" /></span></Checkbox>


        <Checkbox checked={info?.evalutedServiceProvider} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="serviceProvider" /></span></Checkbox>

      </Row> ,
      label: <FormattedMessage id="statusInitialEvaluted" />,
      span: 3,
    },

    {
      value:

        <Row>

          <Checkbox checked={info?.finalStatusIsVendor} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="manufacturer" /></span></Checkbox>


          <Checkbox checked={info?.finalStatusIsSupplier} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="supplier" /></span></Checkbox>


          <Checkbox checked={info?.finalStatusServiceProvider} disabled={true} style={{ color: "black" }}><span style={{ color: "black" }}><FormattedMessage id="serviceProvider" /></span></Checkbox>

        </Row>
      , label: <FormattedMessage id="isAvlCompany" />,
      span: 3,
    },




    // {
    //   value: info?.isAcceptedServiceProvider || info?.isAcceptedVendor || info?.isAcceptedSupplier  ,
    //   label: ,
    //   span: 0,
    // },

  ];

  const renderTitle = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="title">
          {info?.companyName}
        </span>
        {/* {hasView && (
          <span>
            <CPTooltip title={<FormattedMessage id="detailCompany" />} key="1">
                <CPButton
                  type="default"
                  onClick={() => handleChangeAction(info)}
                >
                  {iconMap["viewIcon"]}   <span className="show-btn"> <FormattedMessage id="show" /></span>
                </CPButton>
            </CPTooltip>
          </span>
        )} */}
      </div>
    );
  };





  return (

    showCard == true ?
      <CPCard
        bordered
        bodyStyle={{
          backgroundColor: "ivory",
        }}
        headStyle={ {backgroundColor: "rgba(247, 247, 110, 0.601) "}}
        styleClassName="custom-ant-collapse-header-yellow"
        stylePanel={true}
        defaultActiveKey={1}
        title={renderTitle()}
      >
        <CPDescriptions
          layout="horizontal"
          className="descriptions"
          size="small"
          DescriptionsItem={DescriptionsItems}
        />
      </CPCard>
      :

      <CPPanel
        stylePanel={true}
        // styleClassName={"custom-ant-collapse-header-green"}
        header={
          <>

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
            <Col sm={5} md={5}>

              {info?.companyName}

            </Col>
            <Col sm={17} md={17} xs={17}></Col>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

              <CPTooltip title={<FormattedMessage id="detailCompany" />} key="1">
               
                  <CPButton
                    type="default"
                    onClick={() => handleChangeAction(info)}
                  >
                    {iconMap["viewIcon"]}    <span className="show-btn"><FormattedMessage id="show" /></span> 
                  </CPButton>
                
              </CPTooltip>
            </div>

            {/* <div style={{ display: "flex" }}>
              <div>
                {info?.companyName}

              </div>
              <div>
                <CPTooltip title={<FormattedMessage id="detailCompany" />} key="1">
                  <span>
                    <CPButton
                      type="default"
                      onClick={() => handleChangeAction(info)}
                    >
                      {iconMap["viewIcon"]}    <FormattedMessage id="show" />
                    </CPButton>
                  </span>
                </CPTooltip>
              </div>

            </div> */}


          </>

        }
        bordered
      >
        <CPDescriptions
          layout="horizontal"
          className="descriptions"
          size="small"
          DescriptionsItem={DescriptionsItems}
        />
      </CPPanel>



  );
};

export default CompanyInfo;
