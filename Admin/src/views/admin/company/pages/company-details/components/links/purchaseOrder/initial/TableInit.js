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
            dataIndex: "projectName",
            key: "projectName",
            sorter: false,
            ...getColumnSearchProps('projectName'),
        },

        {
            title: <FormattedMessage id="discipline" />,
            dataIndex: "disciplineName",
            key: "disciplineName",
            sorter: false,
            ...getColumnSearchProps('disciplineName'),
        },

        {
            title: <FormattedMessage id="poNo" />,
            dataIndex: "poNo",
            key: "poNo",
            sorter: false,
            ...getColumnSearchProps('poNo'),
        },

        {
            title: <FormattedMessage id="poDate" />,
            dataIndex: "poDate",
            key: "poDate",
            sorter: false,


        },
        {
            title: <FormattedMessage id="poEffectiveDate" />,
            dataIndex: "poEffectiveDate",
            key: "poEffectiveDate",
            sorter: false,
            ...getColumnSearchProps('poEffectiveDate'),

        },
        {
            title: <FormattedMessage id="warrantyDate" />,
            dataIndex: "warrantyDate",
            key: "warrantyDate",
            sorter: false,
            ...getColumnSearchProps('warrantyDate'),

        },
 

    ];
};
export default TableInit;
