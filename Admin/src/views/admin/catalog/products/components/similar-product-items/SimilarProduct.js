import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Checkbox, Button } from "antd";
import {
    CPButton,
    CPInput,
    CPDivider,
    CPTreeSelect,
    CPTextArea, CPUpload, CPSelect, CPEditor, CPCard
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { comboServices } from "services/comboService";

import GenrateLinkUploader from "components/GenrateLinkUploader";
import { Color } from 'utils/color';
import { productServices } from "services/catalog/productServices";
import { productCategoryServices } from "services/catalog/productCategoryServices";

const { useForm } = Form;

const SimilarProduct = ({ onCloseModal,
    parentLoading,
    onSubmit,
    currentData }) => {
    const intl = useIntl();
    const [form] = useForm();
    const [products, setProducts] = useState([]);
    // const [data, setData] = useState([]);
    const [defalutProductOption, setDefalutProductOption] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState(false);

    const GetData = async () => {
        setLoading(true);
        const result = await productServices.getSimilarProductById(currentData.id);
        if (result.isSuccess) {

            let productsTemp = [];

            for (let y = 0; y < result.data?.similarProducts.length; y++) {
                const el = result.data.similarProducts[y];
                productsTemp = [...productsTemp, { productId: el.productId, productTitle: el.productTitle, selected: true, }];
            }
            form.setFieldsValue({
                ...result.data,
            });
            setSelectedItems([...productsTemp]);
            setDefalutProductOption([...productsTemp]);
            setLoading(false);

        }
        else {
            message.error(result.message);
            setLoading(false);

        }

    };


    const GetCategoryData = async () => {
        setLoading(true);
        const result = await productCategoryServices.getTree();
        if (result.isSuccess) {
            setCategory(result.data);
        }
        else {
            message.error(result.message);
            setLoading(false);
        }
    };

    const GetProducts = async (id) => {
        setProducts([]);

        if (id) {
            const result = await comboServices.getProducts(id);
            setProducts(result);
        }

    };
    const handleChangeCategory = async (el) => {

        await GetProducts(el);
    };
    useEffect(() => {
        GetCategoryData();
        GetData();

    }, []);

    const onFinish = (data) => {
        let tempProduct = [];
        let finalyProduct = [];

        let selectedProduct = selectedItems.filter(f => f.selected == true);
        for (let y = 0; y < selectedProduct?.length; y++) {
            const element = selectedProduct[y];
            tempProduct.push(element.productId)
        }
        if (data.products?.length > 0 && tempProduct.length > 0) {
            finalyProduct = data.products.concat(tempProduct);
        }
        else if (data?.products?.length > 0 && tempProduct?.length == 0) {
            finalyProduct = data?.products;
        }
        else {
            finalyProduct = tempProduct;
        }

        let model = {};
        model.productSelected = finalyProduct;
        model.remark = data.remark;
        model.productId = currentData.id;
        onSubmit(model)
    }


    const changeItems = (checked, productId) => {

        if (checked) {
            setSelectedItems([...selectedItems.filter(f => f.productId != productId), { productId: productId, selected: true }]);

        } else {
            setSelectedItems([...selectedItems.filter(f => f.productId != productId), { productId: productId, selected: false }]);
        }
    }
    return (
        <div>
            <Form form={form} name="similarProduct" onFinish={onFinish} layout="vertical">
                <Row style={{ marginBottom: "2%" }}>

                    <Col xs={24} sm={24} md={24}>
                        <CPTreeSelect
                            label={`${intl.formatMessage({ id: "categoryType" })}:`}
                            hasValidation
                            name={"categoryId"}
                            allowClear={true}
                            multiple={false}
                            showSearch={true}
                            placeholder={intl.formatMessage({
                                id: "categoryType",
                            })}
                            onChange={handleChangeCategory}
                            treeDefaultExpandAll={false} dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            treeData={category}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: <FormattedMessage id="requiredMessage" />,
                            //     },
                            // ]}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <CPSelect
                            hasValidation
                            name={"products"}
                            label={`${intl.formatMessage({ id: "products" })}:`}
                            placeholder={intl.formatMessage({ id: "products" })}
                            dataSource={
                                products
                            }
                            mode="multiple"

                        />
                    </Col>

                    <Col xs={24} sm={24} md={24}>
                        <CPTextArea
                            label={`${intl.formatMessage({ id: "remark" })}:`}
                            hasValidation
                            name={"remark"}
                            placeholder={intl.formatMessage({
                                id: "remark",
                            })}

                        />
                    </Col>

                </Row>

                {
                    defalutProductOption?.length > 0 ?
                        <Row style={{ marginTop: "1%" }}>
                            <Col xs={24} sm={24} md={24}>
                                <CPCard headStyle={{ backgroundColor: Color.gray }} bordered title={intl.formatMessage({ id: "similarProductSelected" })}>
                                    <Row style={{ marginTop: "1%" }}>

                                        {
                                            defalutProductOption && defalutProductOption?.map((item) =>
                                                <>

                                                    <Col xs={6} sm={6} md={6} >
                                                        <label>

                                                            <Checkbox checked={selectedItems?.find(i => i.productId == item.productId && i.selected == true)} onChange={(e) => changeItems(e.target.checked, item.productId)} />

                                                            &nbsp;&nbsp;<span >{item.productTitle}</span>
                                                        </label>
                                                    </Col>

                                                </>
                                            )}
                                    </Row>
                                </CPCard>
                            </Col>

                        </Row> : null
                }



                <CPDivider />
                <div className="footer-modal">
                    <Row>
                        <Col span={12}>
                            <Space>
                                <Button type="primary" htmlType="submit" disabled={parentLoading} loading={parentLoading}>
                                    <span>
                                        <FormattedMessage id="addInformation" />
                                    </span>
                                </Button>
                                <CPButton onClick={onCloseModal} disabled={loading}>
                                    <FormattedMessage id="close" />
                                </CPButton>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}


export default SimilarProduct
