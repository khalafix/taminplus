import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Checkbox, Button } from "antd";
import {
    CPButton,
    CPInput,
    CPDivider,
    CPTreeSelect,
    CPTextArea, CPUpload, CPSelect, CPEditor, CPCard, CPDatePicker, CPSwitch
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { comboServices } from "services/comboService";

import GenrateLinkUploader from "components/GenrateLinkUploader";
import { Color } from 'utils/color';
import { articleServices } from "services/blog/articleServices";
import { productServices } from "services/catalog/productServices";
import dayjs from "dayjs";

const { useForm } = Form;
dayjs.calendar("jalali");

const Financial = ({ onCloseModal,
    parentLoading,
    onSubmit,
    currentData }) => {
    const intl = useIntl();
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const convertToMoment = (date) => {
        return date !== "" ? dayjs(date, { jalali: true }) : "";
    }

    const GetData = async () => {
        setLoading(true);
        const result = await productServices.getFinancialProductById(currentData.id);
        if (result.isSuccess) {
            if (result.data) {

                result.data.fromDate = result?.data?.fromDate ? convertToMoment(result?.data?.fromDate) : null;
                result.data.toDate = result?.data?.toDate ? convertToMoment(result?.data?.toDate) : null;
            }


            form.setFieldsValue({
                ...result.data,
            });
            setLoading(false);

        }
        else {
            message.error(result.message);
            setLoading(false);

        }

    };



    useEffect(() => {
        GetData();

    }, []);

    const onFinish = (data) => {
        data.getInventoryFromApi=false;
        data.toDate = data?.toDate?.format("YYYY-MM-DD");
        data.fromDate = data?.fromDate?.format("YYYY-MM-DD");
        data.productId = currentData.id;
        onSubmit(data)
    }


    return (
        <div>
            <Form form={form} name="Financial" onFinish={onFinish} layout="vertical">
                <Row gutter={[8, 8]} style={{ marginBottom: "2%" }}>
                    <Col xs={24} sm={12} md={8}>
                        <CPInput
                            min={0}
                            hasValidation
                            name={"price"}
                            type={"number"}
                            label={`${intl.formatMessage({ id: "price" })}:`}
                            placeholder={intl.formatMessage({ id: "price" })}

                            rules={[
                                {
                                    pattern: /^(?:\d*)$/,
                                    required: true,
                                    message: <FormattedMessage id="requiredMessage" />,
                                },
                            ]}
                        />
                    </Col>


                    <Col xs={24} sm={12} md={8}>
                        <CPInput
                            min={0}
                            hasValidation
                            name={"discountedPrice"}
                            type={"number"}
                            label={`${intl.formatMessage({ id: "discountedPrice" })}:`}
                            placeholder={intl.formatMessage({ id: "discountedPrice" })}
                            rules={[
                                {
                                    pattern: /^(?:\d*)$/,
                                    required: false,
                                    message: <FormattedMessage id="requiredMessage" />,
                                },
                            ]}
                        />
                    </Col>

                    {/* <Col xs={24} sm={12} md={8}>
                        <CPSwitch
                            hasValidation
                            name={"getInventoryFromApi"}
                            label={`${intl.formatMessage({ id: "getPriceFromApi" })}`} >
                        </CPSwitch>
                    </Col> */}
                    <Col xs={24} sm={12} md={8}>
                        <CPDatePicker
                            placeholder={`${intl.formatMessage({ id: "fromDate" })}`}
                            hasValidation
                            showToday={false}
                            name={"fromDate"}
                            label={`${intl.formatMessage({ id: "fromDate" })}:`}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <CPDatePicker
                            placeholder={`${intl.formatMessage({ id: "toDate" })}`}
                            hasValidation
                            showToday={false}
                            name={"toDate"}
                            label={`${intl.formatMessage({ id: "toDate" })}:`}
                        />
                    </Col>


                </Row>
                <Col xs={24} sm={24} md={24}>
                    <CPTextArea
                        hasValidation
                        name={"remark"}
                        rows={3}
                        label={`${intl.formatMessage({ id: "remark" })}:`}
                        placeholder={intl.formatMessage({ id: "remark" })}
                        rules={[
                            {
                                required: false,
                                message: <FormattedMessage id="requiredMessage" />,
                            },
                        ]}
                    />
                </Col>
                <CPDivider />
                <div className="footer-modal">
                    <Row>
                        <Col span={12}>
                            <Space>
                                <Button type="primary" htmlType="submit" disabled={parentLoading} loading={parentLoading}>
                                    <span>
                                        <FormattedMessage id="addInformation" />
                                    </span>
                                </Button>
                                <CPButton onClick={onCloseModal} disabled={loading}>
                                    <FormattedMessage id="close" />
                                </CPButton>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}


export default Financial
