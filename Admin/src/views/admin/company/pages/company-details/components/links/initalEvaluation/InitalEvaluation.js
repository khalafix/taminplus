import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Row, Col, Popconfirm, Space, message, Form, Spin, Card, Alert } from "antd";
import dayjs from "dayjs";
import { CPButton, CPDivider, CPCard, CPModal, CPTextArea, CPTooltip } from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
import { companyRequestEvalutionServices } from "services/companyRequestEvalutionServices";
import EvalutionDetails from "./EvalutionDetails"
const InitalEvaluation = ({ parentLoading, companyType, companyId, requestId }) => {
    const [data, setData] = useState([]);
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentRow, setCurrentRow] = useState({});
    const [totalScoreUsers, setTotalScoreUsers] = useState(0);
    const [returnRemark, setReturnRemark] = useState("");

    const GetData = async () => {
        setLoading(true);

        let result = await companyRequestEvalutionServices.getListForEvalutionForCompany(companyId, companyType);
        if (result.isSuccess) {

            setData([...result.data]);
            setLoading(false);
            let totalScores = 0;
            for (let index = 0; index < result.data.length; index++) {
                const element = result.data[index];
                for (let y = 0; y < element?.userData.length; y++) {
                    const value = element.userData[y];
                    totalScores = totalScores + value.score;
                }
                setTotalScoreUsers(totalScores);
            }

        }
        else {
            message.error(result.message);
            setLoading(false);
        }

    }
    useEffect(() => {

        GetData();
    }, [requestId]);

    const GetDetails = (items) => {
        let model = {};
        let totalScore = 0;
        let createDate;
        let id;

        for (let y = 0; y < items?.length; y++) {

            const score = items[y].score;
            totalScore = totalScore + score;
            createDate = items[y].createDate;
        }
        model.totalScore = totalScore;
        model.createDate = createDate;
        return (model);
    }

    const onCloseModal = () => {
        setOpenModal(false);
    };


    const renderTitleModal = () => {

        return intl.formatMessage({ id: "requestDetails" });

    };


    const handleOpenModal = (item) => {
        item.id = item?.userData[0].id
        setCurrentRow(item)
        setOpenModal(true);
    };


    const renderModalComponent = () => {

        return (
            <EvalutionDetails onCloseModal={onCloseModal} currentData={currentRow} />
        );
    };

    const sizeModal = () => {
        return 1200;

    };
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
        fontSize: '15px',
    };

    const gridForTotalStyle = {
        width: '100%',
        textAlign: 'center',
        fontSize: '15px',
        backgroundColor: '#ddefff'
    };
    return (
        <>

            <Row gutter={[8, 8]}>



                {data && data?.map((item, index) =>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                    >


                        <Card.Grid hoverable={false} style={gridStyle} >
                            <Row>
                                <Col md={6} sm={6}>
                                    <span style={{ fontWeight: 'bold', }}>   {intl.formatMessage({ id: "fullName" })} : </span>  {item.fullName}

                                </Col>

                                <Col md={6} sm={6}>
                                    <span style={{ fontWeight: 'bold', }}>   {intl.formatMessage({ id: "disciplines" })} : </span>  {item.disciplineName}

                                </Col>
                                <Col md={3} sm={3}>
                                    <span style={{ fontWeight: 'bold', }}>  {intl.formatMessage({ id: "Score" })} : </span>  {GetDetails(item.userData).totalScore ? GetDetails(item.userData).totalScore : 0}

                                </Col>
                                <Col md={5} sm={5}>
                                    <span style={{ fontWeight: 'bold', }}>  {intl.formatMessage({ id: "Evalution Date" })}  : </span>  <span>  {GetDetails(item.userData).createDate ? GetDetails(item.userData).createDate : "-"} </span>

                                </Col>
                                {
                                    item.userData?.length > 0 ?
                                        <>
                                            <Space>

                                                <Col md={1} sm={1}>

                                                    <CPButton
                                                        onClick={() => handleOpenModal(item)}
                                                        type="primary">{intl.formatMessage({ id: "show" })}
                                                    </CPButton>


                                                </Col>

                                            </Space>
                                        </>
                                        : null
                                }
                            </Row>




                        </Card.Grid>


                    </Col>
                )
                }


                {loading ? (
                    <>
                        <Col sm={8} md={8} xs={8}></Col>
                        <Col sm={8} md={8} xs={8}>
                            <Spin className="spin-custom " />
                        </Col>
                        <Col sm={8} md={8} xs={8}></Col>
                    </>


                ) : (
                    <>
                        {
                            data?.length == 0 ? <Col xs={24} sm={24} md={24}>
                                <Alert showIcon message={`${intl.formatMessage({ id: "noData", })}`} type="error" />
                            </Col> : <Card.Grid hoverable={false} style={gridForTotalStyle} >
                                <Row>
                                    <Col md={12} sm={12}>
                                    </Col>
                                    <Col md={3} sm={3}>
                                        <span style={{ fontWeight: 'bold', }}>  {intl.formatMessage({ id: "Total Score" })} : </span>  {totalScoreUsers}

                                    </Col>
                                    <Col md={9} sm={9}>

                                    </Col>

                                </Row>

                            </Card.Grid>
                        }
                    </>
                )
                }

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
export default InitalEvaluation;
