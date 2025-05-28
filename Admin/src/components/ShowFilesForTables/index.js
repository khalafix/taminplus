import React, { useState, useEffect } from "react";
import { Row, Col, Space, message, Form, Spin, Image, Card, Avatar, Button, Alert } from "antd";
import { useIntl, FormattedMessage } from "react-intl";
import { CPButton, CPDivider, CPCard, CPModal, CPTooltip } from "components/CP";
import { downloadWithLinkFile } from "utils/helpers";
import { ServerFileIdentifier } from "constants/configs";
import GenrateLinkUploader from "../GenrateLinkUploader/index"

import iconMap from "utils/iconMap";
const ShowFilesForTables = ({ dataFile, title }) => {
    const intl = useIntl();
    return (
        <>
            <CPCard
                bordered
                title={intl.formatMessage({ id: `${title}` }) }
            >
                <Row>
                    {dataFile?.map((item, index) =>
                        <>
                            <Col sm={12} md={12}>
                                {
                                    item?.files?.length > 0 ? <GenrateLinkUploader items={item.files} title={item.title} />
                                        : <Alert showIcon message={intl.formatMessage({ id: `${item.title}` }) + " : " + intl.formatMessage({ id: "noFiles" })} type="error" />

                                }
                            </Col>
                        </>
                    )}
                </Row>
            </CPCard></>


    )
}
export default ShowFilesForTables;
