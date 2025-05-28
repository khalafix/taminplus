import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space, Checkbox } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";
import { InfoCircleOutlined } from '@ant-design/icons';
import { AiOutlineMail } from "react-icons/ai";

const TableInit = ({ getColumnSearchProps }) => {
    const intl = useIntl();
    const columns = [
        {
            title: intl.formatMessage({ id: "price" }),
            dataIndex: "price",
            key: "price",
            ...getColumnSearchProps('price'),
            render: (row) => (
                <span>{row.toLocaleString()}</span>
            )
        },
        {
            title: intl.formatMessage({ id: "discountedPrice" }),
            dataIndex: "discountedPrice",
            key: "discountedPrice",
            ...getColumnSearchProps('discountedPrice'),
            render: (row) => (
                <span>{row.toLocaleString()}</span>
            )
        },
        {
            title: intl.formatMessage({ id: "fromDate" }),
            dataIndex: "fromDate",
            key: "fromDate",
            ...getColumnSearchProps('fromDate')
        },
        {
            title: intl.formatMessage({ id: "toDate" }),
            dataIndex: "toDate",
            key: "toDate",
            ...getColumnSearchProps('toDate')
        }
    ];
    return columns;
};
export default TableInit;
