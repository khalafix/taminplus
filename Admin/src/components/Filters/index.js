import React, { useState } from "react";
import { Row, Col, Collapse, Space, Form, message } from "antd";
import {
  CPButton,
  CPInput,
  CPDatePicker,
  CPTreeSelect,
  CPSelect,
  CPAutoComplete,
  CPTooltip,
} from "components/CP";
import { FormattedMessage, useIntl } from "react-intl";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { useLocale } from "components/IntelProvider/IntelProvider";
import { checkBetweenDates } from "utils/helpers";
import CheckPermissions from "utils/checkPermissions";
import { removeEmptyValueObject } from "utils/helpers";

const { useForm } = Form;
const { Panel } = Collapse;

const Index = ({
  hasValidationFiltersDates,
  filters,
  openAdvanceFilters,
  onChange,
}) => {
  const intl = useIntl();

  const [datePickersList, setDatePickersList] = useState([]);
  const { locale } = useLocale();
  const [form] = useForm();

  const onFinish = (data) => {
    let newData = removeEmptyValueObject(data);
    const filter = [];
    for (const key in newData) {
      if (Object.hasOwnProperty.call(newData, key)) {
        filter.push({ column: key, value: newData[key] });
      }
    }
    datePickersList.map((index) => {
      newData[index.filterName] = newData[index.filterName].format(
        index.formatStr
      );
    });

    /// <--Validation Filters Dates-->
    if (hasValidationFiltersDates) {
      if (
        checkBetweenDates(
          newData.shamsiDateFrom || newData.dateFrom,
          newData.shamsiDateTo || newData.dateTo,
          process.env.DURATION_FILTER_REPORTS
        )
      ) {
        onChange(filter);
      } else {
        message.error(
          `${intl.formatMessage({ id: "errorMessageBetweenDates1" })} ${
            process.env.DURATION_FILTER_REPORTS
          } ${intl.formatMessage({ id: "errorMessageBetweenDates2" })}`
        );
        return false;
      }
    } else {
      onChange(filter);
    }
  };

  const setDateValue = (formatStr, filterName, date) => {
    if (!hasObjectInArray(filterName, datePickersList)) {
      datePickersList.push({ formatStr: formatStr, filterName: filterName });
    }
  };

  function hasObjectInArray(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].filterName === nameKey) {
        return true;
      }
    }
    return false;
  }

  const onReset = () => {
    form.resetFields();
    setDatePickersList([]);
    onChange([]);
  };

  const renderInput = (filter) => {
    switch (filter.type) {
      case "text":
        return (
          <CPInput
            allowClear={true}
            label={filter?.label}
            hasValidation
            placeholder={filter?.placeholder}
            name={filter?.name}
            rules={filter?.rules}
          />
        );

      case "datePicker":
        return (
          <CPDatePicker
            hasValidation
            name={filter.name}
            placeholder={filter.placeholder}
            initialValue={filter?.initialValue}
            id={filter.id}
            onChange={(date) => setDateValue(filter.format, filter.name, date)}
            rules={filter?.rules}
            disabledDate={filter?.disabledDate}
          />
        );
      case "mobileNumber":
        return (
          <CPInput
            label={filter?.label}
            hasValidation
            placeholder={filter?.placeholder}
            initialValue={filter?.initialValue}
            name={filter?.name}
            rules={[
              {
                pattern: /^(98|0)?9[0|1|2|3|9](?:[0-9]){8}$/i,
                message: <FormattedMessage id="errorFormatPhoneNumber" />,
              },
            ]}
          />
        );
      case "treeSelect":
        return (
          <CPTreeSelect
            hasValidation
            name={filter.name}
            rules={filter?.rules}
            placeholder={filter.placeholder}
            allowClear
            showSearch
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            filterTreeNode
            treeData={filter.dataTreeSelect}
          />
        );

      case "select":
        return (
          <CPSelect
            hasValidation
            name={filter.name}
            rules={filter?.rules}
            initialValue={filter?.initialValue}
            placeholder={filter.placeholder}
            dataSource={filter.dataSelect}
          />
        );
      case "autoComplete":
        return (
          <CPAutoComplete
            hasValidation
            name={filter.name}
            rules={filter?.rules}
            placeholder={filter.placeholder}
            options={filter.dataAutoComplete}
          />
        );
    }
  };

  const render = (filters) => (
    <div className="FiltersWarped">
      <Form form={form} name="filters" onFinish={onFinish}>
        <Row>
          {hasAdvanceSearch ? (
            <Col span={24}>
              <Collapse expandIconPosition={"left"} defaultActiveKey={["1"]}>
                <Panel
                  header={<FormattedMessage id="advanceSearch" />}
                  key={openAdvanceFilters ? "1" : ""}
                >
                  {
                    <Row gutter={[8, 8]}>
                      {filters.map((filter, index) => {
                        if (filter.permissions) {
                          return (
                            <CheckPermissions permissions={filter.permissions}>
                              <Col
                                xs={24}
                                sm={12}
                                md={6}
                                key={index}
                                className={`display-${filter.visible}`}
                              >
                                {renderInput(filter)}
                              </Col>
                            </CheckPermissions>
                          );
                        } else {
                          return (
                            <Col
                              xs={24}
                              sm={12}
                              md={6}
                              key={index}
                              className={`display-${filter.visible}`}
                            >
                              {renderInput(filter)}
                            </Col>
                          );
                        }
                      })}
                      <Col
                        xs={24}
                        sm={12}
                        md={6}
                        style={
                          locale === "fa"
                            ? {
                                marginRight: "auto",
                                display: "flex",
                                flexDirection: "row-reverse",
                              }
                            : {
                                marginLeft: "auto",
                                display: "flex",
                                flexDirection: "row-reverse",
                              }
                        }
                      >
                        <Space size={2}>
                          <CPTooltip
                            title={<FormattedMessage id="search" />}
                            key="1"
                          >
                            <span>
                              <CPButton
                                shape="circle"
                                htmlType="submit"
                                type="primary"
                                icon={<FiSearch />}
                              />
                            </span>
                          </CPTooltip>{" "}
                          <CPTooltip
                            title={<FormattedMessage id="resetSearch" />}
                            key="2"
                          >
                            <span>
                              <CPButton
                                shape="circle"
                                type="button"
                                onClick={onReset}
                                icon={<AiOutlineClear />}
                              />
                            </span>
                          </CPTooltip>
                        </Space>
                      </Col>
                    </Row>
                  }
                </Panel>
              </Collapse>
            </Col>
          ) : (
            <Col xs={24} sm={12} md={8}>
              <Space>
                {renderInput(filters[0])}

                <CPButton htmlType="submit" type="primary">
                  <span className="btn-icon btn-icon-style">
                    <FiSearch />
                  </span>
                  <span className="btn-title">
                    {<FormattedMessage id="search" />}
                  </span>
                </CPButton>
              </Space>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );

  const hasAdvanceSearch = filters?.length > 1;
  const hasFilters = filters?.length > 0;

  if (hasFilters) {
    return render(filters);
  } else return null;
};

export default Index;
