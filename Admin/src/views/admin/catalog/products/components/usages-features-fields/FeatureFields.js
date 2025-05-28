import React, { useState, useEffect } from "react";

import { Row, Col, Form } from "antd";
import { CPInput, CPCard, CPSelect, } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const FeatureFields = ({ featureValues, item, handleChange, readonly , data }) => {
  const intl = useIntl();
  const [defalutOption, setDefalutOption] = useState([]);
  const [option, setOption] = useState([]);



  useEffect(() => {

  }, [featureValues]);


  const getCombo = (data) => {
    let tempOption = [];
   if (data?.option !=null && data?.option !="" && data?.option ) {
    let option = data?.option?.length > 0 ? data?.option?.split(",") : [];
    for (let index = 0; index < option.length; index++) {
      const element = option[index];
      tempOption.push({ value: element, text: element });
    }
    return tempOption;
   }
   else{
    return tempOption;
   }

  }

  return (
    <CPCard bordered className="mt-10">

      <Form.List name="productFeatureValues">
        {(fields, { add, remove }) => {
          return (
            <Row gutter={[8, 8]} className="mb-10">
              {fields.map((field, index) => (
                <>

                  {

                    featureValues[field.key]?.controlType == 102 ?
                      <>

                        <Col xs={8} sm={8} md={8}>

                          <CPInput type={"number"} 
                          // min={featureValues[field.key].min} 
                          // max={featureValues[field.key].max}
                            disabled={readonly}
                            hasValidation
                            name={[index, "featureValueNumber"]}
                            label={`${data?.mainFeatureId== featureValues[field.key]?.featureId ? " ویژگی اصلی -  "  : ''} ${featureValues[field.key].title} - (${featureValues[field.key].symbolTitle}) :
         ( ${intl.formatMessage({ id: "max" })} : ${featureValues[field.key].max} ,
          ${intl.formatMessage({ id: "min" })} : ${featureValues[field.key].min}   )`
                            }
                            placeholder={intl.formatMessage({ id: "value" })}
                            /*   onChange={(e) => handleChange(e, index)} */
                            rules={[
                              {
                                pattern: /^(?:\d*)$/,
                                // required: readonly ? false : true,
                                // required: data?.mainFeatureId== featureValues[field.key]?.featureId ? true : false,
                                required:false,
                                message: <FormattedMessage id="requiredMessage" />,
                              },
                            ]}
                          />
                        </Col>

                      </> : null
                  }

                  {

                    featureValues[field.key]?.controlType == 104 ?
                      <>
                        <Col xs={8} sm={8} md={8}>
                          <CPSelect
                            disabled={readonly}
                            hasValidation
                            name={[index, "featureValue"]}
                            label={`${data?.mainFeatureId== featureValues[field.key]?.featureId ?  " ویژگی اصلی -  "  : ''} ${featureValues[field.key].title}(${featureValues[field.key].symbolTitle}):`}
                            placeholder={intl.formatMessage({ id: "value" })}
                            dataSource={getCombo(featureValues[field.key])}
                            rules={[
                              {
                                // required: readonly ? false : true,
                                // required: data?.mainFeatureId== featureValues[field.key]?.featureId ? true : false,
                                required:false,
                                message: <FormattedMessage id="requiredMessage" />,
                              },
                            ]}
                          />
                        </Col> </> : null
                  }

                  {
                    featureValues[field.key]?.controlType == 101 ?
                      <Col xs={8} sm={8} md={8}>

                        <CPInput
                          hasValidation
                          disabled={readonly}
                          name={[index, "featureValue"]}
                          type={"text"}
                          label={`${data?.mainFeatureId== featureValues[field.key]?.featureId ?   " ویژگی اصلی -  "   : ''} ${featureValues[field.key].title}(${featureValues[field.key].symbolTitle}):`}
                          placeholder={intl.formatMessage({ id: "value" })}
                          /*   onChange={(e) => handleChange(e, index)} */
                          rules={[
                            {
                              // required: readonly ? false : true,
                              // required: data?.mainFeatureId== featureValues[field.key]?.featureId ? true : false,
                              required:false,
                              message: <FormattedMessage id="requiredMessage" />,
                            },
                          ]} />
                      </Col> : null
                  }

                  {
                    featureValues[field.key]?.controlType == 103 ?
                      <Col xs={8} sm={8} md={8}>
                        <CPSelect
                          hasValidation
                          disabled={readonly}
                          name={[index, "featureValue"]}
                          label={`${data?.mainFeatureId== featureValues[field.key]?.featureId ?  " ویژگی اصلی -  "  : ''} ${featureValues[field.key].title}  `}
                          placeholder={intl.formatMessage({ id: "value" })}
                          dataSource={[
                            { value: "true", text: intl.formatMessage({ id: "hasValue" }) },
                            { value: "false", text: intl.formatMessage({ id: "hasnotValue" }) },
                          ]} rules={[
                            {
                              // required: readonly ? false : true,
                              // required: data?.mainFeatureId== featureValues[field.key]?.featureId ? true : false,
                              required:false,
                              message: <FormattedMessage id="requiredMessage" />,
                            },
                          ]}
                        />
                      </Col> : null
                  }

                </>
              ))}


            </Row>
          );
        }}
      </Form.List>
    </CPCard >
  );
};

export default FeatureFields;
