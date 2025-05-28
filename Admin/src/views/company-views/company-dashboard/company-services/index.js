import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Button, Typography, Tooltip, message } from "antd";
import { useIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { EditOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';

import logoServiceProvider from "assets/images/serviceProvider.png";
import logoManufacture from "assets/images/manufacture.png";
import logoSupplier from "assets/images/supplier.png";
import chat from "assets/images/chat.png";
import { CPModal} from "components/CP";

import UserMessage from "../company-messages/show-message";


function CompanyServices({ data, bgColor }) {
    const { Title } = Typography;
    const intl = useIntl();
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);

    const goTo = (item) => {
        
        history.push({
            pathname: item.path,
            state: {
                isFilter: 1,
                companyRequestStatus: item.companyRequestStatus,
            },
        });
    }
    const handelModal =()=> {
        setOpenModal(true)

    }
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const renderModalComponent = () => {

        return (
           <UserMessage />
            
        );


    };

    const renderTitleModal = () => {

        return intl.formatMessage({ id: "show" }) + ' ' + intl.formatMessage({ id: "UserMessage" });
    };
    const sizeModal = () => {

        return 1500;

    };

    const handleSelectService = (type) => {
        if (data.id != 0) {
            switch (type) {
                case "manufacture":
                    history.push({
                        pathname: "/user-company/pages/manufacture",
                        state: {
                            companyId: data.id,
                        },
                    });
                    break;
                case "service-provider":
                    history.push({
                        pathname: "/user-company/pages/service-provider",
                        state: {
                            companyId: data.id,
                        },
                    });
                    break;
                case "supplier":
                    history.push({
                        pathname: "/user-company/pages/supplier",
                        state: {
                            companyId: data.id,
                        },
                    });
                    break;

                default:
                    break;
            }
        }
        else {
            message.error(intl.formatMessage({ id: "firstEntertheCompanyInformation" }))
        }
    }

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={12} xl={6} className="mb-24 company-dashboard-service-card">
                    {
                        !data.isVendor ?
                            <Card bordered={false} className="widget-2 h-full" style={{ backgroundColor: "#eee" }}>
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoManufacture} width="55" />
                                            </div>
                                            <Title level={5}>{intl.formatMessage({ id: "manufacture" })}</Title>
                                        </>
                                    }
                                    value={`Not Register Data`}
                                />
                                <div className="text-center">
                                    <Tooltip title="Add Service Provider Data">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("manufacture")}>
                                            <PlusOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Card>
                            :
                            <Card bordered={false} hoverable={true} className="widget-2 h-full" style={{ backgroundColor: "#eee" }} onClick={() => handleSelectService("manufacture")}>
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoManufacture} width="55" />
                                            </div>
                                            <Title level={5}>{intl.formatMessage({ id: "manufacture" })}</Title>
                                        </>
                                    }
                                    value={`Products Count : ${data.vendorTotalProducts ? (data.vendorTotalProducts) : 0}`}
                                />
                                <div className="text-center mb-24 company-info-actions">
                                    <Tooltip title="Edit">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("manufacture")}>
                                            <EditOutlined />
                                        </Button>
                                    </Tooltip>
                                    {/* <Tooltip title="Products">
                                        <Button type="primary" shape="circle">
                                            <ProfileOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Purchase Orders">
                                        <Button type="primary" shape="circle">
                                            <FileProtectOutlined />
                                        </Button>
                                    </Tooltip> */}

                                    {/* <button>Products</button>
                                    <button>Purchase Orders</button> */}
                                </div>
                            </Card>
                    }
                </Col>
                <Col xs={12} xl={6} className="mb-24 company-dashboard-service-card">
                    {
                        !data.isSupplier ?
                            <Card bordered={false} className="widget-2 h-full" style={{ backgroundColor: "#eee" }} >
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoSupplier} width="55" />
                                            </div>
                                            {/* <p>sss</p> */}
                                            <Title level={5}>{intl.formatMessage({ id: "supplier" })}</Title>
                                        </>
                                    }
                                    value={`Not Register Data`}
                                />
                                <div className="text-center">
                                    <Tooltip title="Add Service Provider Data">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("supplier")}>
                                            <PlusOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Card>
                            :
                            <Card bordered={false} hoverable={true} className="widget-2 h-full" style={{ backgroundColor: "#eee" }} onClick={() => handleSelectService("supplier")}>
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoSupplier} width="55" />
                                            </div>
                                            <Title level={5}>{intl.formatMessage({ id: "supplier" })}</Title>
                                        </>
                                    }
                                    value={`Products Count : ${data.supplierTotalProducts ? (data.supplierTotalProducts) : 0}`}
                                />
                                <div className="text-center mb-24 company-info-actions">
                                    <Tooltip title="Edit">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("supplier")}>
                                            <EditOutlined />
                                        </Button>
                                    </Tooltip>
                                    {/* <Tooltip title="Products">
                                        <Button type="primary" shape="circle">
                                            <ProfileOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Purchase Orders">
                                        <Button type="primary" shape="circle">
                                            <FileProtectOutlined />
                                        </Button>
                                    </Tooltip> */}
                                </div>
                            </Card>
                    }
                </Col>
                <Col xs={12} xl={6} className="mb-24 company-dashboard-service-card">
                    {
                        !data.isServiceProvider ?
                            <Card bordered={false} className="widget-2 h-full" style={{ backgroundColor: "#eee" }} >
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoServiceProvider} width="55" />
                                            </div>
                                            <Title level={5}>{intl.formatMessage({ id: "serviceProvider" })}</Title>
                                        </>
                                    }
                                    value={`Not Register Data`}
                                />
                                <div className="text-center">
                                    <Tooltip title="Add Service Provider Data">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("service-provider")}>
                                            <PlusOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Card>
                            :
                            <Card bordered={false} hoverable={true} className="widget-2 h-full" style={{ backgroundColor: "#eee" }} onClick={() => handleSelectService("service-provider")}>
                                <Statistic
                                    title={
                                        <>
                                            <div className="company-header icon-box">
                                                <img src={logoServiceProvider} width="55" />
                                            </div>
                                            <Title level={5}>{intl.formatMessage({ id: "serviceProvider" })}</Title>
                                        </>
                                    }
                                    value={`Activities Count : ${data.serviceProviderActivities ? (data.serviceProviderActivities) : 0}`}
                                />
                                <div className="text-center mb-24 company-info-actions">
                                    <Tooltip title="Edit">
                                        <Button type="primary" shape="circle" onClick={() => handleSelectService("service-provider")}>
                                            <EditOutlined />
                                        </Button>
                                    </Tooltip>
                                    {/* <Tooltip title="Activities">
                                        <Button type="primary" shape="circle">
                                            <ProfileOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Purchase Orders">
                                        <Button type="primary" shape="circle">
                                            <FileProtectOutlined />
                                        </Button>
                                    </Tooltip> */}
                                    {/* <button>Activities</button>
                                    <button>Purchase Orders</button> */}
                                </div>
                            </Card>
                    }
                </Col>
                <Col xs={12} xl={6} className="mb-24 company-dashboard-service-card">
                    <Card bordered={false} className="widget-2 h-full" style={{ backgroundColor: "#aae7ff8e" }}>
                        <Statistic
                            title={
                                <>
                                    <div className="company-header icon-box">
                                        <img src={chat} width="55" />
                                    </div>
                                    <Title level={5}>{intl.formatMessage({ id: "Messages" })}</Title>
                                </>
                            }
                            value={`Count : ${data.userMessageCount ? (data.userMessageCount) : 0}`}
                        />
                        <div className="text-center">
                            <Tooltip title="Show Messages">
                                <Button type="primary" shape="circle" onClick={()=>handelModal()} >
                                    <MessageOutlined />
                                </Button>
                            </Tooltip>
                        </div>
                    </Card>
                </Col>
            </Row>
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
    )
}

export default CompanyServices