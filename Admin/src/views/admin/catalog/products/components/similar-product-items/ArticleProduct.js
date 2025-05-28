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
import { articleServices } from "services/blog/articleServices";
import { productServices } from "services/catalog/productServices";

const { useForm } = Form;

const ArticleProduct = ({ onCloseModal,
    parentLoading,
    onSubmit,
    currentData }) => {
    const intl = useIntl();
    const [form] = useForm();
    const [articles, setArticles] = useState([]);
    const [articlesData, setArticlesData] = useState({});
    // const [data, setData] = useState([]);
    const [defalutArticleOption, setDefalutArticleOption] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [articleCategory, setArticleCategory] = useState("");

    const [loading, setLoading] = useState(false);

    const GetData = async () => {
        setLoading(true);
        const result = await productServices.getArticleProductById(currentData.id);
        if (result.isSuccess) {

            let articlesTemp = [];

            for (let y = 0; y < result.data?.articles.length; y++) {
                const el = result.data.articles[y];
                articlesTemp = [...articlesTemp, { articleId: el.articleId, articleTitle: el.articleTitle, selected: true, }];
            }

            setSelectedItems([...articlesTemp]);
            setDefalutArticleOption([...articlesTemp]);
            setLoading(false);

        }
        else {
            message.error(result.message);
            setLoading(false);

        }

    };

    const GetCategoryData = async () => {
        const result = await comboServices.getArticleCategory();
        setCategory(result);

    };

    const GetArticles = async (id) => {
        setArticles([]);
        if(id){
            const result = await comboServices.getArticles(id);
            setArticles(result);
        }
       
    };
    const ChangeArticleCategory = async (el) => {

       await GetArticles(el);
        // setLoading(true)
        // if (el.length > 0) {
        //     const result = await articleServices.getById(el[el.length - 1]);
        //     if (result.isSuccess) {
        //         form.setFieldsValue({
        //             ...result.data,
        //         });
        //         setArticlesData(result.data);
        //         setTimeout(() => {
        //             setLoading(false)
        //         }, 1000);
        //     }
        //     else {
        //         message.error(result.message);
        //         setArticlesData({});
        //         setTimeout(() => {
        //             setLoading(false)
        //         }, 1000);
        //     }
        // }
        // else {
        //     setArticlesData({});
        //     form.resetFields();
        //     setTimeout(() => {
        //         setLoading(false)
        //     }, 1000);
        // }

    };
    useEffect(() => {
        GetCategoryData();
        GetData();

    }, []);

    const onFinish = (data) => {
        let tempArticle = [];
        let finalyArticle = [];
        
        let selectedArticle = selectedItems.filter(f => f.selected == true);
        for (let y = 0; y < selectedArticle?.length; y++) {
            const element = selectedArticle[y];
            tempArticle.push(element.articleId)
        }
        if (data.articles?.length > 0 && tempArticle.length > 0) {
            finalyArticle = data.articles.concat(tempArticle);
        }
        else if (data?.articles?.length > 0 && tempArticle?.length == 0) {
            finalyArticle = data?.articles;
        }
        else {
            finalyArticle = tempArticle;
        }

        let model={};
        model.articleSelected = finalyArticle;
      
        model.productId = currentData.id;
        onSubmit(model)
    }


    const changeItems = (checked, articleId) => {

        if (checked) {
            setSelectedItems([...selectedItems.filter(f => f.articleId != articleId), { articleId: articleId, selected: true }]);

        } else {
            setSelectedItems([...selectedItems.filter(f => f.articleId != articleId), { articleId: articleId, selected: false }]);
        }
    }
    return (
        <div>
            <Form form={form} name="ArticleProduct" onFinish={onFinish} layout="vertical">
                <Row style={{ marginBottom: "2%" }}>

                    <Col xs={24} sm={24} md={24}>
                        <CPSelect
                            label={`${intl.formatMessage({ id: "articleCategory" })}:`}
                            hasValidation
                            name={"articleCategoryId"}
                            showSearch={true}
                            placeholder={intl.formatMessage({
                                id: "articleCategory",
                            })}
                            dataSource={category}

                            onChange={(el) => ChangeArticleCategory(el)}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <CPSelect
                            hasValidation
                            name={"articles"}
                            label={`${intl.formatMessage({ id: "articles" })}:`}
                            placeholder={intl.formatMessage({ id: "articles" })}
                            dataSource={
                                articles
                            }
                            mode="multiple"
                        // onChange={(el) => ChangeArticles(el)}
                        // rules={[
                        //     {
                        //         required: false,
                        //         message: <FormattedMessage id="requiredMessage" />,
                        //     },
                        // ]}
                        />
                    </Col>

                </Row>
                {/* {loading ? (
                    <Spin className="spin-custom" />
                ) : (
                    <>
                        <Row gutter={[8, 8]} style={{ marginTop: "2%" }}>

                            <Col xs={8} sm={8} md={8}>
                                <CPInput
                                    hasValidation
                                    name={"title"}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "title" })}:`}
                                    placeholder={intl.formatMessage({ id: "title" })}
                                    disabled={true}

                                />
                            </Col>

                            <Col xs={8} sm={8} md={8}>
                                <CPInput
                                    hasValidation
                                    name={"articleCategoryTitle"}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "articleCategory" })}:`}
                                    placeholder={intl.formatMessage({ id: "articleCategory" })}
                                    disabled={true}

                                />
                            </Col>


                            <Col xs={8} sm={8} md={8}>
                                <CPInput
                                    hasValidation
                                    name={"isActiveTitle"}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "status" })}`}
                                    placeholder={intl.formatMessage({ id: "status" })}
                                    disabled={true}
                                />

                            </Col>



                            <Col xs={12} sm={12} md={12}>
                                <CPTextArea
                                    rows={5}
                                    hasValidation
                                    name={"shortDescription"}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "shortDescription" })}:`}
                                    placeholder={intl.formatMessage({ id: "shortDescription" })}
                                    disabled={true}
                                />

                            </Col>
                            {
                                articlesData?.articleAttachments && articlesData?.articleAttachments?.length > 0 ?
                                    <Col xs={12} sm={12} md={12}>
                                        <GenrateLinkUploader items={articlesData?.articleAttachments} label={intl.formatMessage({ id: "uploadedFiles" })}
                                        />

                                    </Col>
                                    : null
                            }


                        </Row>
                    </>
                )} */}
                {
                    defalutArticleOption?.length > 0 ?
                        <Row style={{ marginTop: "1%" }}>
                            <Col xs={24} sm={24} md={24}>
                                <CPCard headStyle={{ backgroundColor: Color.gray }} bordered title={intl.formatMessage({ id: "articleSelected" })}>
                                    <Row style={{ marginTop: "1%" }}>

                                        {
                                            defalutArticleOption && defalutArticleOption?.map((item) =>
                                                <>

                                                    <Col xs={6} sm={6} md={6} >
                                                        <label>

                                                            <Checkbox checked={selectedItems?.find(i => i.articleId == item.articleId && i.selected == true)} onChange={(e) => changeItems(e.target.checked, item.articleId)} />

                                                            &nbsp;&nbsp;<span >{item.articleTitle}</span>
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
                                <CPButton onClick={onCloseModal} disabled={parentLoading}>
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


export default ArticleProduct
