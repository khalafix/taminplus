import React from "react";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Users = React.lazy(() => import("../views/users"));
const Customers = React.lazy(() => import("../views/admin/customers"));
const organizationUnit = React.lazy(() => import("../views/organization-unit"));
const Roles = React.lazy(() => import("../views/roles"));
const appConfig = React.lazy(() => import("../views/app-config"));
// Base-Info
const Origin = React.lazy(() => import("../views/admin/base-info/origin"));
const Pages = React.lazy(() => import("../views/admin/base-info/pages"));
const SocialMedia = React.lazy(() => import("../views/admin/base-info/social-media"));
const City = React.lazy(() => import("../views/admin/base-info/city"));
const NewsLetter = React.lazy(() => import("../views/admin/base-info/news-letter"));
const JobOpportunity = React.lazy(() => import("../views/admin/base-info/job-opportunities"));
const UserSms = React.lazy(() => import("../views/admin/sms-panel"));

//support
const OutboxInternalMessage = React.lazy(() =>
  import("../views/admin/support/internal-message")
);
const UserLetMeKnow = React.lazy(() =>
  import("../views/admin/support/user-let-me-know")
);
const InboxInternalMessage = React.lazy(() =>
  import("../views/admin/support/inbox-internal-message")
);

const UserOpinions = React.lazy(() =>
  import("../views/admin/support/user-opinions")
);

const WorkWithUs = React.lazy(() =>
  import("../views/admin/support/work-with-us")
);
const UserNewsletter = React.lazy(() =>
  import("../views/admin/support/user-news-Letter")
);
const ContactUs = React.lazy(() =>
  import("../views/admin/support/contact-us")
);
//support

// catalog
const UserLogSearch = React.lazy(() => import("../views/admin/catalog/user-log-search"));

const Orders = React.lazy(() => import("../views/admin/catalog/orders"));
const OrderDetails = React.lazy(() =>
  import(
    "../views/admin/catalog/orders/components/OrderDetails"
  )
);
const Kopons = React.lazy(() => import("../views/admin/catalog/kopons"));
const Brands = React.lazy(() => import("../views/admin/catalog/brands"));
const Features = React.lazy(() => import("../views/admin/catalog/features"));
const FeatureCategory = React.lazy(() =>
  import("../views/admin/catalog/feature-category")
);
const Symbol = React.lazy(() => import("../views/admin/catalog/symbol"));
const Products = React.lazy(() => import("../views/admin/catalog/products"));
const ProductCategory = React.lazy(() =>
  import("../views/admin/catalog/product-category")
);
const DeliveryProduct = React.lazy(() =>
  import(
    "../views/admin/catalog/products/components/delivery-product/DeliveryProduct"
  )
);

//blog
const Articles = React.lazy(() => import("../views/admin/blog/articles"));
const ArticleCategory = React.lazy(() =>
  import("../views/admin/blog/article-category")
);

//media
const VideoCategory = React.lazy(() =>
  import("../views/admin/media/video-category")
);
const Videos = React.lazy(() => import("../views/admin/media/videos"));
const Slider = React.lazy(() => import("../views/admin/media/slider"));
const Banner = React.lazy(() => import("../views/admin/media/banner"));

//media



// Payment
const UserPayments = React.lazy(() => import("../views/admin/payment/user-payments"));

// Payment
const routes = [
  { path: "/", name: "داشبورد اصلی", component: Dashboard },
  { path: "/users", name: "کاربران", component: Users },
  {
    path: "/organization-unit",
    name: "مدیریت امور",
    component: organizationUnit,
  },
  {
    path: "/roles",
    name: "نقش ها",
    component: Roles,
  },
  {
    path: "/app-config",
    name: "تنظیمات سیستم",
    component: appConfig,
  },
  {
    path: "/admin/catalog/products",
    name: "محصولات",
    component: Products,
  },
  {
    path: "/admin/user-sms",
    name: " پنل پیامک های ارسالی  ",
    component: UserSms,
  },
  {
    path: "/admin/catalog/delivery-product",
    name: "   لیست ارسال محصول" ,
    component: DeliveryProduct,
  },
  {
    path: "/admin/catalog/features",
    name: "ویزگی ها",
    component: Features,
  },
  {
    path: "/admin/catalog/feature-category",
    name: "دسته بندی ویژگی ها ",
    component: FeatureCategory,
  },
  {
    path: "/admin/catalog/product-category",
    name: "دسته بندی محصولات",
    component: ProductCategory,
  },
  {
    path: "/admin/blog/articles",
    name: " مقالات",
    component: Articles,
  },
  {
    path: "/admin/blog/article-category",
    name: "دسته بندی مقالات  ",
    component: ArticleCategory,
  },
  {
    path: "/admin/media/video-category",
    name: "دسته بندی ویدیو ها  ",
    component: VideoCategory,
  },

  {
    path: "/admin/media/videos",
    name: "  ویدیو ها  ",
    component: Videos,
  },
  {
    path: "/admin/customers",
    name: "   مشتریان  ",
    component: Customers,
  },
  {
    path: "/admin/media/slider",
    name: " اسلایدر  ",
    component: Slider,
  },
  {
    path: "/admin/media/banners",
    name: " بنر ها  ",
    component: Banner,
  },
  {
    path: "/admin/catalog/brands",
    name: "     برند ها  ",
    component: Brands,
  },
  {
    path: "/admin/catalog/orders",
    name: "       سفارش خرید ",
    component: Orders,
  },
  {
    path: "/admin/catalog/order-details",
    name: "       جزئیات سفارش خرید  ",
    component: OrderDetails,
  },
  {
    path: "/admin/base-info/origin",
    name: "   لیست منطقه یا کشور  ",
    component: Origin,
  },
  {
    path: "/admin/catalog/symbol",
    name: "   واحد اندازه گیری  ",
    component: Symbol,
  },
  {
    path: "/admin/support/inbox-message",
    name: "پیام های دریافتی",
    component: InboxInternalMessage,
  },
  {
    path: "/admin/support/user-Opinions",
    name: "  دیدگاه کاربران",
    component: UserOpinions,
  },
  {
    path: "/admin/catalog/kopons",
    name: "   کوپن خرید محصول ",
    component: Kopons,
  },
  {
    path: "/admin/base/pages",
    name: "     صفحات ",
    component: Pages,
  },
  {
    path: "/admin/base/social-medias",
    name: " فضای مجازی ",
    component: SocialMedia,
  },
  {
    path: "/admin/base/city",
    name: "شهرها ",
    component: City,
  },
  {
    path: "/admin/base/news-letter",
    name: "         خبرنامه ",
    component: NewsLetter,
  }
  ,
  {
    path: "/admin/base/job-opportunities",
    name: " فرصت های شغلی ",
    component: JobOpportunity,
  }
  ,
  {
    path: "/admin/support/work-with-us",
    name: "   همکاری با ما ",
    component: WorkWithUs,
  }
  ,
  {
    path: "/admin/support/user-news-letter",
    name: "    اعضا ثبت نام شده در خبرنامه ",
    component: UserNewsletter,
  }
  ,
  {
    path: "/admin/support/contact-us",
    name: "   تماس با ما",
    component: ContactUs,
  }

  ,
  {
    path: "/user-log-search",
    name: "تاریخچه جستجو کاربران ",
    component: UserLogSearch,
  }

  ,
  {
    path: "/admin/support/user-let-me-know",
    name:" لیست کاربران ثبت شده به من خبر بده",
    component: UserLetMeKnow,
  },
  {
    path: "/admin/payment/user-payments",
    name: "پرداخت های آنلاین کاربر",
    component: UserPayments,
  },
];

export default routes;
