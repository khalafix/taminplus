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
      id: "products",
      name: "محصولات",
      path: "/admin/catalog/products",
    },
  

    {
      id: "features",
      name: "ویزگی ها",
      path: "/admin/catalog/features",
    },
    {
      id: "featureCategory",
      name: "دسته بندی ویژگی ها",
      path: "/admin/catalog/feature-category",
    }, {
      id: "deliveryProduct",
      name: "   لیست ارسال محصول" ,
      path: "/admin/catalog/delivery-product",
    },
    {
      id: "articles",
      name: " مقالات",
      path: "/admin/blog/articles",
    },
    {
      id: "articleCategory",
      name: "دسته بندی  مقالات",
      path: "/admin/blog/article-category",
    },
    {
      id: "videoCategory",
      name: "دسته بندی  ویدیو ها",
      path: "/admin/media/video-category",
    },
    {
      id: "videos",
      name: "  ویدیو ها",
      path: "/admin/media/videos",
    },
    {
      id: "banners",
      name: "   بنر ها",
      path: "/admin/media/banners",
    },
    {
      id: "slider",
      name: "    اسلایدر",
      path: "/admin/media/slider",
    },
    {
      id: "brands",
      name: " برند ",
      path: "/admin/catalog/brands",
    },
    {
      id: "listProductCategory",
      name: "دسته بندی محصولات",
      path: "/admin/catalog/product-category",
    },
    {
      id: "orderDetails",
      name: "  جزئیات سفارش خرید",
      path: "/admin/catalog/order-details",
    },
    {
      id: "listOrigin",
      path: "/admin/base-info/origin",
      name: "     لیست منطقه یا کشور  ",
    },
    {
      id: "internalMessage",
      path: "/admin/support/internal-message",
      name: "پیام ها",

    },
    {
      id: "inboxInternalMessage",
      path: "/admin/support/inbox-message",
      name: " لیست پیام های دریافتی",
    },
    {
      id: "userlogSearch",
      name: "تاریخچه جستجو کاربران ",
      path: "/user-log-search",
    },
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

      if (target[0]?.isSidebar) {
        history.replace({
          pathname: target[0].path,
          state: undefined
        })
      }
      else {
        history.push({
          pathname: target[0].path,
          state: target[0].state ?? location.state,
        });
      }
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
