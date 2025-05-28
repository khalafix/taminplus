import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Col, Popconfirm, Row, Space } from "antd";

// Icon
import { RiBikeFill, RiBook2Fill, RiDeleteBinLine, RiEditLine, RiFile2Fill, RiMoneyCnyBoxFill, RiMoneyCnyBoxLine, RiMoneyDollarCircleFill, RiMoneyPoundCircleLine, RiProductHuntLine, RiVideoAddFill } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteProduct, onChangeFile, onChangeArticleProduct,
  onChangeVideoProduct, onChangeSimilarProduct, onChangeFinancialProduct, onChangeDeliveryProduct,onChangeFinancialProductList, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="productName" />,
      dataIndex: "productName",

      ellipsis: {
        showTitle: true,
      },
      key: "productName",
      sorter: true,
    },

    {
      title: <FormattedMessage id="categoryName" />,
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: false,
      width: "15%"

    },

    {
      title: <FormattedMessage id="code" />,
      dataIndex: "code",
      key: "code",
      sorter: false,
      width: "10%"

    },
    {
      title: <FormattedMessage id="brand" />,
      dataIndex: "brandName",
      key: "brandName",
      sorter: false,
      width: "10%"
    },

    {
      title: <FormattedMessage id="saleStatus" />,
      dataIndex: "saleStatusTitle",
      key: "saleStatusTitle",
      sorter: false,
      width: "8%"
    },


    {
      title: <FormattedMessage id="status" />,
      dataIndex: "isActiveTitle",
      key: "isActiveTitle",
      sorter: false,
      width: "8%"
    },

    {
      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (
        <Row gutter={[8, 8]}>
          <Col xs={3} sm={3} md={3}>
            <CPTooltip title={<FormattedMessage id="edit" />} key="1">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiEditLine />
                    </span>
                  }
                  onClick={() => onChangeAction("edit", row)}
                />
              </span>
            </CPTooltip>
          </Col>
          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="files" />} key="2">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiFile2Fill />
                    </span>
                  }
                  onClick={() => onChangeFile("file", row)}
                />
              </span>
            </CPTooltip>
          </Col>
          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="articleProduct" />} key="3">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiBook2Fill />
                    </span>
                  }
                  onClick={() => onChangeArticleProduct("articleProduct", row)}
                />
              </span>
            </CPTooltip>
          </Col>
          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="videoProduct" />} key="4">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiVideoAddFill />
                    </span>
                  }
                  onClick={() => onChangeVideoProduct("videoProduct", row)}
                />
              </span>
            </CPTooltip>
          </Col>
          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="similarProducts" />} key="5">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiProductHuntLine />
                    </span>
                  }
                  onClick={() => onChangeSimilarProduct("similarProduct", row)}
                />
              </span>
            </CPTooltip>
          </Col>

          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="financial" />} key="5">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiMoneyPoundCircleLine />
                    </span>
                  }
                  onClick={() => onChangeFinancialProduct("financial", row)}
                />
              </span>
            </CPTooltip>
          </Col>

          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="financialList" />} key="5">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiMoneyCnyBoxFill />
                    </span>
                  }
                  onClick={() => onChangeFinancialProductList("financialList", row)}
                />
              </span>
            </CPTooltip>
          </Col>


          <Col xs={3} sm={3} md={3}>

            <CPTooltip title={<FormattedMessage id="deliveryProduct" />} key="5">
              <span>
                <CPButton
                  shape="circle"
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiBikeFill />
                    </span>
                  }
                  onClick={() => onChangeDeliveryProduct("delivery", row)}
                />
              </span>
            </CPTooltip>
          </Col>


          {/* 
          <CPTooltip title={<FormattedMessage id="delete" />} key="2">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => deleteProduct(row.id)}
              >
                <CPButton
                  shape="circle"
                  type="primary"
                  danger
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiDeleteBinLine />
                    </span>
                  }
                />
              </Popconfirm>
            </span>
          </CPTooltip> */}
        </Row>
      ),
    },
  ];
};
export default TableInit;
