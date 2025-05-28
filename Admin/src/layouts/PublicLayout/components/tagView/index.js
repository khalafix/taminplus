import { useCallback, useEffect } from "react";
import { Tabs } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import TagsViewAction from "./tagViewAction";
import { addTag, removeTag, setActiveTag } from "redux/reducers/tagView";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
const { TabPane } = Tabs;

const TagsView = () => {
  const intl = useIntl();
  const { tags, activeTagId } = useSelector((state) => state.tagsView);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // onClick tag
  const onChange = (key) => {
    const tag = tags.find((tag) => tag.id === key);
    if (tag) {
      setCurrentTag(tag.id);
    }
  };

  // onRemove tag
  const onClose = (targetKey) => {
    dispatch(removeTag(targetKey));
  };

  const setCurrentTag = useCallback(
    (id) => {
      const tag = tags.find((item) => {
        if (id) {
          return item.id === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.id));
      }
    },
    [dispatch, location.pathname, tags]
  );

  const menuList = [
    {
      id: "dashboard",
      name: `${intl.formatMessage({ id: "dashboard" })}`,
      path: "/",
    },
    {
      id: "users",
      name: "کاربران",
      path: "/users",
    },
    {
      id: "companiesRequest",
      name: "درخواست شرکت ها",
      path: "/admin/companies-request",
    },
    {
      id: "organizationChart",
      name: "چارت سازمانی",
      path: "/organization-chart",
    },
    {
      id: "appConfig",
      name: "تنظیمات سیستم",
      path: "/app-config",
    },
    {
      id: "company",
      name: "ثبت شرکت",
      path: "/company",
    },
    {
      id: "managementCompanies",
      name: "لیست شرکت ها",
      state:0,
      path: "/admin/company",
    },
    {
      id: "products",
      name: "محصولات",
      path: "/admin/mr/products",
    },

    {
      id: "features",
      name: "ویزگی ها",
      path: "/admin/mr/feature",
    },
    {
      id: "listProductCategory",
      name: "دسته بندی محصولات",
      path: "/admin/mr/product-category",
    },
    {
      id: "listVendorCompanyType",
      path: "/admin/base-info/vendor-comapny-type",
      name: "  نوع فروشنده شرکت ها ",
    },
    {
      id: "listVendorAvlCategory",
      path: "/admin/base-info/vendor-avl-category",
      name: "  مشتریان عمده  ",
    },

    {
      id: "listSupplierRole",
      path: "/admin/base-info/supplier-role",
      name: "  نقش تامیین کنندگان  ",
    },

    {
      id: "listVendorDepartment",
      path: "/admin/base-info/vendor-department",
      name: "  بخش فروشنده  ",
    },
    {
      id: "listVendorEmployeePosition",
      path: "/admin/base-info/vendor-employee-position",
      name: "  موقعیت کارمند فروشنده  ",
    },
    {
      id: "listSupplierEmployeePosition",
      path: "/admin/base-info/supplier-employee-position",
      name: "  موقعیت کارمند تامین کننده  ",
    },
    {
      id: "listOrigin",
      path: "/admin/base-info/origin",
      name: "     لیست منطقه یا کشور  ",
    }
  ];

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find((m) => m.path === location.pathname);
      if (menu) {
        // Initializes dashboard page.
        const dashboard = menuList[0];

        dispatch(
          addTag({
            path: dashboard.path,
            label: dashboard.name,
            id: dashboard.id,
            closable: false,
          })
        );
        // Initializes the tag generated for the current page
        // Duplicate tag will be ignored in redux.
        let nameMenu = `${intl.formatMessage({ id: menu.id })}`;
        dispatch(
          addTag({
            path: menu.path,
            label: nameMenu,
            id: menu.id,
            closable: true,
            state: location.state,
          })
        );
      }
    }
  }, [dispatch, location.pathname]);

  //fix: remove tab route back auto
  useEffect(() => {
    if (tags && activeTagId) {
      const target = tags.filter((e) => e.id === activeTagId);
      history.push({
        pathname: target[0].path,
        state: target[0].state ?? location.state,
      });
    }
  }, [tags, activeTagId]);

  return (
    <div
      id="pageTabs"
      style={{ background: "#fff", padding: "6px 4px" }}
      className="tagView"
    >
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) =>
          action === "remove" && onClose(targetKey)
        }
        tabBarExtraContent={<TagsViewAction />}
      >
        {tags?.map((tag) => (
          <TabPane tab={tag.label} key={tag.id} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  );
};

export default TagsView;
