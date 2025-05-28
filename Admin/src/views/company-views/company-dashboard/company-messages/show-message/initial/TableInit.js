import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Space } from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";
import { ShowMessage } from "../../ShowMessage";

const TableInit = ({ handelModal, loading }) => {
    const intl = useIntl();
    return [
        {
            title: <FormattedMessage id="subject" />,
            dataIndex: "subject",
            key: "subject",
            ellipsis: {
                showTitle: true,
            },
            align: "center",
        },
        {
            title: <FormattedMessage id="sendDate" />,
            dataIndex: "sendDateString",

            ellipsis: {
                showTitle: true,
            },
            key: "sendDateString",
            align: "center",
        },
        {
            title: <FormattedMessage id="show" />,
            key: "body",
            align: "center",

            render: (row) => (
                <Space>
                    <CPTooltip title={<FormattedMessage id="show" />} key="1">
                        <span>
                            <CPButton
                                shape="circle"
                                disabled={loading}
                                icon={<span className="icon-box">{iconMap["AiOutlineMail"]}</span>}
                                onClick={() => handelModal( row)}
                            />
                        </span>
                    </CPTooltip>
                </Space>
            ),
        },
    ];

};
export default TableInit;
