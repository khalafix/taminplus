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
            title: intl.formatMessage({ id: "productName" }),
            dataIndex: "productName",
            key: "productName",
            ...getColumnSearchProps('productName')
        },
        {
            title: intl.formatMessage({ id: "brand" }),
            dataIndex: "brandName",
            key: "brandName",
            ...getColumnSearchProps('brandName')
        },
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
            title: intl.formatMessage({ id: "itemCount" }),
            dataIndex: "itemCount",
            key: "itemCount",
            //...getColumnSearchProps('itemCount')
        },
        {
            title: intl.formatMessage({ id: "totalAmount" }),
            dataIndex: "totalAmount",
            key: "totalAmount",
            render(value, record) {
                return {
          
                  children: <div>{(record.price*record.itemCount)?.toLocaleString()}</div>
                };
              }
        },


    ];
    return columns;
};
export default TableInit;
