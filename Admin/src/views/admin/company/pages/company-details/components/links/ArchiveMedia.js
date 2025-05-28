import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Space, message, Spin, Image, Alert, Card, Input, Tree } from "antd";
import {
  CPButton,
  CPSelect,
  CPTooltip,
  CPInput,
  CPCard,
  CPUpload,
  CPTreeSelect,
  CPSwitch,
  CPDivider,
} from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { generateList, getParentKey, dataList } from "views/admin/mr/company-products-details/initial/treeInit";
import { flattenDeep } from "lodash";

// Api
import { fileServices } from "services/file/fileServices";


import iconMap from "utils/iconMap";
import { ServerFileIdentifier } from "constants/configs";
import { downloadWithLinkFile } from "utils/helpers";

const { useForm } = Form;
const handleDownloadFile = async (fileUrl) => {

  if (fileUrl) {

    const ad = ServerFileIdentifier();
    let path = `${ad}/${fileUrl}`;
    downloadWithLinkFile(
      path
    );
  }
};
const Popup = ({ record, visible, x, y, rowData }) =>
  visible && (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li onClick={() => handleDownloadFile(rowData.filePath)}>download</li>
      {/* <li>Like it</li>
    <li>Bookmark</li> */}
    </ul>
  );
const ArchiveMedia = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  companyId,
  companyType
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["1"]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [finalFiles, setFinalFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);
  const [dataListTemp, setDataListTemp] = useState([]);
  const [reRender, setReRender] = useState(false);

  const getData = async () => {
    setLoading(true)

    let result = await fileServices.getById(companyId, companyType);

    if (result.isSuccess == true) {
      setData(result.data);
      setLoading(false)
      generateList(result.data);

      setTempFiles(result.data)
      setFinalFiles(result.data)

    }
    else {
      setLoading(false)
    }
  }

  useEffect(() => {
    setDataListTemp(dataList)

    getData();
  }, []);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
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
  const onRightClick = (e) => {

    if (e.node.filePath) {
      let dataModel =
        ({
          key: e.node.key,
          title: e.node.titleView,
          isActive: e.node.isActive,
          parentId: e.node.parentId,
          filePath: e.node.filePath
        });
      setPopup({
        dataModel,
        visible: true,
        x: 550,
        y: 15,
        rowData: dataModel
      });
    }

  };
  const handelClosePopup = () => {
    setPopup({ visible: false, x: 0, y: 0 });
  };

  const onSelect = (selectedKeys, info) => {

    if (selectedKeys.length > 0) {
      setCurrentData({
        key: selectedKeys[0],
        title: info.node.titleView,
        isActive: info.node.isActive,
        parentId: info.node.parentId,
        filePath: info.node.filePath

      });
    } else {
      setCurrentData({});
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


  const onChangeTitle = (e) => {
    const { value } = e.target;
    let tempData = [...dataListTemp];
    // const expandedKeys = dataListTemp
    //   .map((item) => {

    //     if (item?.code == (value) ) {
    //       debugger
    //       return getParentKey(item.key, tempProductCategory);
    //     }
    //     else {
    //       return null;
    //     }
    //   })
    //   .filter((item, i, self) => item && self.indexOf(item) === i);

    const expandedKeys = dataListTemp.filter(f => f.title?.toLowerCase()?.includes(value?.toLowerCase()));

    if (value) {
      // tempData=dataListTemp?.filter(f => f.key == expandedKeys);
      setData(expandedKeys)
      setExpandedKeys(expandedKeys);
      setSearchValue(value);
      // setAutoExpandParent(true);
    }
    else {
      setData(finalFiles)
      setAutoExpandParent(false);
      setSearchValue(value);
      setTimeout(() => {
        setReRender(prev => !prev)
      }, 500);
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
          key: item.key,
          isActive: item.isActive,
          parentId: item.parentId,
          filePath: item.filePath,
          children: loop(item.children),
        };
      }


      return {
        title: item.title,
        titleView: item.title,
        key: item.key,
        isActive: item.isActive,
        parentId: item.parentId,
        filePath: item.filePath,

      };
    });

  const onDoubleClick = (checkedKeys, info) => {

    if (info.filePath) {
      let dataModel =
        ({
          key: info.key,
          title: info.titleView,
          isActive: info.isActive,
          parentId: info.parentId,
          filePath: info.filePath
        });
      // setPopup({
      //   dataModel,
      //   visible: true,
      //   x: 550,
      //   y: 15,
      //   rowData: dataModel
      // });
      handleDownloadFile(info.filePath)
    }
  }

  return (
    <div onClick={handelClosePopup} >
      <Form form={form} name="addoredit" layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Input.Group compact>

                  <Input

                    style={{
                      marginBottom: 8,
                      width: 'calc(100% - 200px)',
                    }}
                    placeholder={`${intl.formatMessage({ id: "searchTitle" })}`}
                    onChange={onChangeTitle}
                  />

                  <Button type="primary" onClick={() => getData()}>Reset Search</Button>
                </Input.Group>

              </Col>
            </Row>
            <Row style={{ overflowY: "scroll", height: "350px" }} >

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
                treeData={loop(data)}
                // onRightClick={onRightClick}
                onDoubleClick={onDoubleClick}
                /*  draggable
            onDragEnter={onDragEnter}
            onDrop={onDrop} */
                defaultExpandAll={false}

              />
              <Popup {...popup} />

            </Row>

            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>

                    <CPButton onClick={onCloseModal} disabled={parentLoading}>
                      <FormattedMessage id="close" />
                    </CPButton>
                  </Space>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default ArchiveMedia;
