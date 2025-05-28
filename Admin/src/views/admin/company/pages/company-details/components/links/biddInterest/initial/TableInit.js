import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space , Checkbox } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";
import { InfoCircleOutlined } from '@ant-design/icons';
import { AiOutlineMail } from "react-icons/ai";

const TableInit = ({ getColumnSearchProps }) => {
    const intl = useIntl();
    return [
        
        {
            title: <FormattedMessage id="project" />,
            dataIndex: "project",
            key: "project",
            sorter: false,
            ...getColumnSearchProps('project'),
        },

        {
            title: <FormattedMessage id="discipline" />,
            dataIndex: "discipline",
            key: "discipline",
            sorter: false,
            ...getColumnSearchProps('discipline'),
        },

        {
            title: <FormattedMessage id="inquiryMRs" />,
            dataIndex: "inquiryMRCode",
            key: "inquiryMRCode",
            sorter: false,
            ...getColumnSearchProps('inquiryMRCode'),
            width: '15%',

            render: (item) => (
                <CPTooltip  title={<span >{` ${item}`}</span>} placement={"topRight"}>
                      <br /> <span>{` ${item}`}</span>
                </CPTooltip>
            ),
        },

        {
            title: <FormattedMessage id="mrCode" />,
            dataIndex: "mrCodes",
            key: "mrCodes",
            sorter: false,
            width: '45%',

            render: (item) => (
                <CPTooltip title={<span >{` ${item}`}</span>} placement={"topRight"}>
                    <br />   <span>   {` ${item}`}</span>
                </CPTooltip>
            ),
        },
        {
            title: <FormattedMessage id="interestConfirm" />,
            dataIndex: "interestConfirmTitle",
            key: "interestConfirmTitle",
            sorter: false,
            ...getColumnSearchProps('interestConfirmTitle'),

        },
        {
            title: <FormattedMessage id="interestConfirmDate" />,
            dataIndex: "interestConfirmDate",
            key: "interestConfirmDate",
            sorter: false,
            ...getColumnSearchProps('interestConfirmDate'),

        },
 

    ];
};
export default TableInit;
