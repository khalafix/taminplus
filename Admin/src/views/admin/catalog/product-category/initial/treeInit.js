// Message
import { FormattedMessage } from "react-intl";

export const dataList = [];

export const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title, groupStatus , code } = node;
    dataList.push({ key, title, groupStatus, titleView: title , code});
    if (node.children) {
      generateList(node.children);
    }
  }
};
export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export const statusRole = [
  { value: true, text: <FormattedMessage id="active" /> },
  { value: false, text: <FormattedMessage id="deactivate" /> },
];
