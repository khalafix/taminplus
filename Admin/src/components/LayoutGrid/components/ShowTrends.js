import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//UI
import RenderLayoutItem from "components/LayoutGrid/RenderLayoutItem";
import { CPButton, CPDivider, CPSelect } from "components/CP";
import { Spin, Row, Col } from "antd";

//API
import { dashboardTemplateServices } from "services/dashboardTemplate";
import { comboServices } from "services/comboService";

// Message
import { useIntl, FormattedMessage } from "react-intl";

const Index = ({ currentData, onCloseModal }) => {
  const intl = useIntl();
  const [comboDataSet, setComboDataSet] = useState({});
  const [month, setMonth] = useState();
  const [year, setYear] = useState(1400);
  const [data, setData] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const result = await dashboardTemplateServices.getShowTrend({
      dashboardTemplateItemId: currentData.dashboardTemplateItemId,
      year,
      month,
    });
    if (result.isSuccess) {
      setData(result.data);
      setLoading(false);
    }
  };

  const getComboDataSet = async () => {
    const result = await comboServices.getIndexTemplateCombo();
    setComboDataSet(result);
  };

  const handleChangeMonth = (value) => {
    setMonth(value);
  };
  const handleChangeYears = (value) => {
    setYear(value);
  };

  const handleSearch = () => {
    getData();
  };

  useEffect(() => {
    getComboDataSet();
    getData();
  }, []);

  return (
    <>
      <Row gutter={[8, 8]} className="mb-20">
        <Col xs={24} sm={12} md={1}>{`${intl.formatMessage({
          id: "years",
        })}:`}</Col>

        <Col xs={24} sm={12} md={3}>
          <CPSelect
            name={"year"}
            dataSource={comboDataSet.years}
            value={year}
            onChange={handleChangeYears}
          />
        </Col>
        {currentData.showTrend === 101 && (
          <>
            <Col xs={24} sm={12} md={1}>{`${intl.formatMessage({
              id: "months",
            })}:`}</Col>
            <Col xs={24} sm={12} md={3}>
              <CPSelect
                name={"month"}
                dataSource={comboDataSet.months}
                onChange={handleChangeMonth}
                value={month}
              />
            </Col>
          </>
        )}
        <Col xs={24} sm={12} md={3}>
          <CPButton
            type="primary"
            onClick={handleSearch}
            disabled={loading}
            loading={loading}
          >
            <FormattedMessage id="view" />
          </CPButton>
        </Col>
      </Row>
      {loading ? (
        <Spin className="spin-custom" />
      ) : (
        <div key={data?.id} style={{ height: "600px" }}>
          <RenderLayoutItem
            type={data?.newShowType}
            option={data}
            isClickable={data?.isClickable}
            isHoverable={false}
          />
        </div>
      )}
    </>
  );
};

export default Index;
