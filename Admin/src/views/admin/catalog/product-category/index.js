import React, { useState, useEffect } from "react";
// UI
import { Row, Col, Tree, Input, message, Spin, Form } from "antd";
import { CPCard, CPModal, CPInput, CPButton } from "components/CP";
import { flattenDeep } from "lodash";
// Components
import AddorEdit from "./components/AddorEdit";
import Popup from "./components/Popup";
import Delete from "./components/Delete";
import Toolbar from "components/Toolbar";
import { BsGear, BsSearch, BsBoxArrowInUp } from "react-icons/bs";

// Initial
import ToolbarInit from "./initial/ToolbarInit";
import { generateList, getParentKey, dataList } from "./initial/treeInit";

// Message
import { useIntl, FormattedMessage } from "react-intl";

// Api
import { productCategoryServices } from "services/catalog/productCategoryServices";
import PageContainer from "components/PageContainer/PageContainer";
import { formatMessage } from "@formatjs/intl";
const { useForm } = Form;

const Index = () => {
  const intl = useIntl();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productCategory, setProductCategory] = useState([]);
  const [finalProductCategory, setFinalProductCategory] = useState([]);
  const [tempProductCategory, setTempProductCategory] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["1"]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [typeAction, setTypeAction] = useState(""); // "add" | "edit" | "delete"
  const [currentData, setCurrentData] = useState({});
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 });
  const [againFetch, setAgainFetch] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [dataListTemp, setDataListTemp] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    if (againFetch) {
      getProductCategory();
    }
    setDataListTemp(dataList)
  }, [againFetch]);

  useEffect(() => {
    getProductCategory();
    setDataListTemp(dataList)

  }, []);


  const searchFun = async (data) => {
    let model = {}
    
    model.text = data.title ? data.title : "";
    model.code = data.code ? data.code : "";
    setLoading(true);
    let result = await productCategoryServices.search(model);

    if (result.data?.length > 0) {

      setLoading(false);


      setProductCategory(result.data);
      generateList(result.data);
      if(model.code || model.text){
        setExpandedKeys(getAllKeys(result.data));
      } else{
        setExpandedKeys([])
      }
    }
    else {
      setLoading(false);

      setProductCategory([]);
      generateList([]);
      getProductCategory();
      // setLoadingSpinner(false)
    }

  };


  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" }) + " " + intl.formatMessage({ id: "materialElement" });
      case "edit":
        return intl.formatMessage({ id: "edit" }) + " " + intl.formatMessage({ id: "materialElement" });
      default:
        return "";
    }
  };

  const CreateProductCategory = async (data) => {
    setLoading(true);

    data.sortOrder = data.sortOrder ? parseInt(data.sortOrder) : 0;
    let featuresList = [];
    for (let index = 0; index < data.features?.length; index++) {
      const element = data.features[index];
      featuresList = [...featuresList, { id: element, sortOrder: 1 }]
    }
    data.features = featuresList;
    const result = await productCategoryServices.add(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
      await getProductCategory();

    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const UpdateProductCategory = async (data) => {
    setLoading(true);
    data.sortOrder = data.sortOrder ? parseInt(data.sortOrder) : 0;
    let featuresList = [];
    for (let index = 0; index < data.features?.length; index++) {
      const element = data.features[index];
      featuresList = [...featuresList, { id: element, sortOrder: 1 }]
    }
    data.features = featuresList;
    const result = await productCategoryServices.update(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
      await getProductCategory();

    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const DeleteProductCategory = async (id) => {
    setLoading(true);
    const result = await productCategoryServices.delete(id);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
      await getProductCategory();
    } else {
      message.error(result.message);
      setLoading(false);
      setOpenModal(false);
    }
  };

  const getProductCategory = async () => {
    setLoading(true);
    const result = await productCategoryServices.getAll({});
    if (result.isSuccess) {
      setProductCategory(result.data);
      generateList(result.data);

      setTempProductCategory(result.data)
      setFinalProductCategory(result.data)
      // setExpandedKeys(getAllKeys(result.data));
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const getAllKeys = (data) => {
    // This function makes an array of keys, this is specific for this example, you would have to adopt for your case. If your list is dynamic, also make sure that you call this function everytime data changes.
    const nestedKeys = data.map((node) => {
      let childKeys = [];
      if (node.children) {
        childKeys = getAllKeys(node.children);
      }
      return [node.key];
    });
    return flattenDeep(nestedKeys);
  };

 
  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onRightClick = (e) => {
    setPopup({
      visible: true,
      x: e.event.pageX - 150,
      y: e.event.pageY - 230,
    });
  };

  const onSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0) {
      setCurrentData({
        key: selectedKeys[0],
        title: info.node.titleView,
        isActive: info.node.isActive,
        parentId: info.node.parentId,
      });
    } else {
      setCurrentData({});
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handelClosePopup = () => {
    setPopup({ visible: false, x: 0, y: 0 });
  };

  const handleOpenModal = (type, row) => {

    if (currentData?.key == undefined && (type == "edit" || type == "delete")) {

      message.error(intl.formatMessage({ id: "selectOneItem" }));
      setOpenModal(false);
      return;
    }
    switch (type) {
      case "add":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "edit":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "delete":
        setTypeAction(type);
        setOpenModal(true);
        break;
    }
  };

  const renderModalComponent = (type) => {

    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            currentData={currentData}
            onSubmit={CreateProductCategory}
            parentLoading={loading}
            typeAction={type}
          />
        );
      case "edit":
        return (
          <AddorEdit
            data={currentData}
            onCloseModal={onCloseModal}
            currentData={currentData}
            onSubmit={UpdateProductCategory}
            parentLoading={loading}
            typeAction={type}
          />
        );

      case "delete":
        return (
          <Delete
            currentData={currentData}
            onCloseModal={onCloseModal}
            onClickDelete={DeleteProductCategory}
            parentLoading={loading}
          />
        );

    }


  };

  const renderStatusGroups = (status) => {
    if (status === "ACTIVE") {
      return <span> </span>;
    } else if (status === "DEACTIVATED") {
      return (
        <span className="tree-deactivate">
          <FormattedMessage id="deactivate" />{" "}
        </span>
      );
    } else if (status === "DELETED") {
      return (
        <span className="tree-deleted">
          <FormattedMessage id="delete" />{" "}
        </span>
      );
    }
  };

  const loop = (data) =>
    data?.map((item) => {
      // const index = item.title?.indexOf(searchValue);
      // const beforeStr = item.title?.substr(0, index);
      // const afterStr = item.title?.substr(index + searchValue.length);

      // const title =
      //   index > -1 ? (
      //     <span>
      //       {beforeStr}
      //       <span className="tree-search-value">{searchValue}</span>
      //       {afterStr} {renderStatusGroups(item.isActive)}
      //     </span>
      //   ) : (
      //     <span>
      //       {item.title} {renderStatusGroups(item.isActive)}
      //     </span>
      //   );
      if (item.children) {
        return {
          title: item.title,
          titleView: item.title,
          code: item.code,
          key: item.key,
          isActive: item.isActive,
          parentId: item.parentId,
          children: loop(item.children),
        };
      }

      return {
        title: item.title,
        titleView: item.title,
        key: item.key,
        isActive: item.isActive,
        parentId: item.parentId,
        code: item.code,
      };
    });
  return (
    <PageContainer
      title={`${intl.formatMessage({ id: "listProductCategory" })}`}
    >
      <CPCard bodyStyle={{ padding: 10, minHeight: "600px" }}>
        <Row gutter={[8, 8]} onClick={handelClosePopup}>
          <Col xs={24}>
            <Toolbar
              items={ToolbarInit({
                onClick: handleOpenModal,
                onClickDownload: () => console.log("__"),
              })}
            />
          </Col>
          {/* <Row gutter={[8, 8]}>
            <Col xs={12}>
              <Input
                style={{ marginBottom: 8 }}
                placeholder={`${intl.formatMessage({ id: "searchTitle" })}`}
                onChange={onChangeTitle}
              />

            </Col>
            <Col xs={12}>
              <Input
                style={{ marginBottom: 8 }}
                placeholder={`${intl.formatMessage({ id: "searchCode" })}`}
                onChange={onChangeCode}
              />
            </Col>
          </Row> */}
          <Form form={form} name="addoredit" onFinish={searchFun} layout="vertical">

            <Row gutter={[8, 8]}>
              <Col xs={11} md={11}>

                <CPInput id={"titleValue"}
                  type={"text"}
                  hasValidation
                  placeholder={intl.formatMessage({ id: "title" })}
                  name={"title"}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]} />
              </Col>
              <Col xs={11} md={11}>

                <CPInput
                  hasValidation
                  id={"codeValue"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "code" })}
                  name={"code"}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]} />
              </Col>
              <Col xs={11} md={2}>
                <CPButton disabled={loading} type="primary" htmlType="submit"><BsSearch />  <FormattedMessage id="search" /></CPButton>
                {/* <Spin tip={intl.formatMessage({ id: "loadingData" })} spinning={loadingSpinner}/> */}
              </Col>
            </Row>
          </Form>
          <Col xs={24}>
            <>


              <Spin spinning={loading}>
                <div style={{ height: "600px", position: "relative", overflowY: "scroll" }}>
                  <Tree
                    size="small"
                    showLine
                    bordered
                    showIcon={true}
                    showLeafIcon
                    onSelect={onSelect}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    // treeData={loop(productCategory)?.filter(f => !searchValue || f?.titleView?.toLowerCase().includes(searchValue) || f?.code?.toString() == searchValue)}
                    treeData={loop(productCategory)}

                    // onRightClick={onRightClick}
                    /*  draggable
                onDragEnter={onDragEnter}
                onDrop={onDrop} */
                    defaultExpandAll={true}
                  />
                  <Popup {...popup} />
                </div>
              </Spin>
            </>
          </Col>
        </Row>
      </CPCard>
      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={typeAction === "delete" ? "30%" : "80%"}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </PageContainer>
  );
};

export default Index;
