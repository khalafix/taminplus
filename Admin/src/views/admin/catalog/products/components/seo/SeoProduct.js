import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Checkbox, Card } from "antd";
import {
    CPButton,
    CPInput,
    CPDivider,
    CPTreeSelect,
    CPTextArea, CPUpload, CPSelect, CPEditor, CPCard, CPDatePicker, CPSwitch
} from "components/CP";
import { FormattedMessage, useIntl } from "react-intl";

const SeoProduct = ({ }) => {
    const intl = useIntl();

    return (
        <div>
            <Card bordered>
                <Row gutter={[8, 8]}>

                    <Col xs={24} sm={12} md={8}>
                        <CPInput
                            hasValidation
                            name={"seoTitle"}
                            type={"text"}
                            label={`${intl.formatMessage({ id: "seoTitle" })}:`}
                            placeholder={intl.formatMessage({ id: "seoTitle" })}
                            rules={[
                                {
                                    required: false,
                                    message: <FormattedMessage id="requiredMessage" />,
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={24}>
                        <CPTextArea
                            hasValidation
                            name={"seoDescription"}
                            rows={3}
                            label={`${intl.formatMessage({ id: "seoDescription" })}:`}
                            placeholder={intl.formatMessage({ id: "seoDescription" })}
                            rules={[
                                {
                                    required: false,
                                    message: <FormattedMessage id="requiredMessage" />,
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}



export default SeoProduct
