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
import { videoServices } from "services/media/videoServices";
import { productServices } from "services/catalog/productServices";

const { useForm } = Form;

const VideoProduct = ({ onCloseModal,
    parentLoading,
    onSubmit,
    currentData }) => {
    const intl = useIntl();
    const [form] = useForm();
    const [videos, setVideos] = useState([]);
    const [videosData, setVideosData] = useState({});
    // const [data, setData] = useState([]);
    const [defalutVideoOption, setDefalutVideoOption] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [videoCategory, setVideoCategory] = useState("");

    const [loading, setLoading] = useState(false);

    const GetData = async () => {
        setLoading(true);
        const result = await productServices.getVideoProductById(currentData.id);
        if (result.isSuccess) {

            let videosTemp = [];

            for (let y = 0; y < result.data?.videos.length; y++) {
                const el = result.data.videos[y];
                videosTemp = [...videosTemp, { videoId: el.videoId, videoTitle: el.videoTitle, selected: true, }];
            }

            setSelectedItems([...videosTemp]);
            setDefalutVideoOption([...videosTemp]);
            setLoading(false);

        }
        else {
            message.error(result.message);
            setLoading(false);

        }

    };

    const GetCategoryData = async () => {
        const result = await comboServices.getVideoCategory();
        setCategory(result);

    };

    const GetVideos = async (id) => {
        setVideos([]);
        if(id){
            const result = await comboServices.getVideos(id);
            setVideos(result);
        }
       
    };
    const ChangeVideoCategory = async (el) => {

       await GetVideos(el);
    };
    useEffect(() => {
        GetCategoryData();
        GetData();

    }, []);

    const onFinish = (data) => {
        let tempVideo = [];
        let finalyVideo = [];
        
        let selectedVideo = selectedItems.filter(f => f.selected == true);
        for (let y = 0; y < selectedVideo?.length; y++) {
            const element = selectedVideo[y];
            tempVideo.push(element.videoId)
        }
        if (data.videos?.length > 0 && tempVideo.length > 0) {
            finalyVideo = data.videos.concat(tempVideo);
        }
        else if (data?.videos?.length > 0 && tempVideo?.length == 0) {
            finalyVideo = data?.videos;
        }
        else {
            finalyVideo = tempVideo;
        }

        let model={};
        model.videoSelected = finalyVideo;
      
        model.productId = currentData.id;
        onSubmit(model)
    }


    const changeItems = (checked, videoId) => {

        if (checked) {
            setSelectedItems([...selectedItems.filter(f => f.videoId != videoId), { videoId: videoId, selected: true }]);

        } else {
            setSelectedItems([...selectedItems.filter(f => f.videoId != videoId), { videoId: videoId, selected: false }]);
        }
    }
    return (
        <div>
            <Form form={form} name="VideoProduct" onFinish={onFinish} layout="vertical">
                <Row style={{ marginBottom: "2%" }}>

                    <Col xs={24} sm={24} md={24}>
                        <CPSelect
                            label={`${intl.formatMessage({ id: "videoCategory" })}:`}
                            hasValidation
                            name={"videoCategoryId"}
                            showSearch={true}
                            placeholder={intl.formatMessage({
                                id: "videoCategory",
                            })}
                            dataSource={category}

                            onChange={(el) => ChangeVideoCategory(el)}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <CPSelect
                            hasValidation
                            name={"videos"}
                            label={`${intl.formatMessage({ id: "videos" })}:`}
                            placeholder={intl.formatMessage({ id: "videos" })}
                            dataSource={
                                videos
                            }
                            mode="multiple"
     
                        />
                    </Col>

                </Row>
       
                {
                    defalutVideoOption?.length > 0 ?
                        <Row style={{ marginTop: "1%" }}>
                            <Col xs={24} sm={24} md={24}>
                                <CPCard headStyle={{ backgroundColor: Color.gray }} bordered title={intl.formatMessage({ id: "videoSelected" })}>
                                    <Row style={{ marginTop: "1%" }}>

                                        {
                                            defalutVideoOption && defalutVideoOption?.map((item) =>
                                                <>

                                                    <Col xs={6} sm={6} md={6} >
                                                        <label>

                                                            <Checkbox checked={selectedItems?.find(i => i.videoId == item.videoId && i.selected == true)} onChange={(e) => changeItems(e.target.checked, item.videoId)} />

                                                            &nbsp;&nbsp;<span >{item.videoTitle}</span>
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


export default VideoProduct
