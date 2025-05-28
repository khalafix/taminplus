import React from "react";
import { Menu, Dropdown } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  removeTag,
  removeOtherTag,
  removeAllTag,
} from "redux/reducers/tagView";
import { FormattedMessage } from "react-intl";

const TagsViewAction = () => {
  const { activeTagId } = useSelector((state) => state.tagsView);
  const dispatch = useDispatch();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => dispatch(removeTag(activeTagId))}>
            <FormattedMessage id="tagsView.operation.closeCurrent" />
          </Menu.Item>
          <Menu.Item key="1" onClick={() => dispatch(removeOtherTag())}>
            <FormattedMessage id="tagsView.operation.closeOther" />
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(removeAllTag())}>
            <FormattedMessage id="tagsView.operation.closeAll" />
          </Menu.Item>
          <Menu.Divider />
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
