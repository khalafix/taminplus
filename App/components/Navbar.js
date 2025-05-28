import { deleteCoockie, getCookie } from "helpers/Helpers";
import Link from "next/link";
import { bannerServices } from "services/media/bannerServices";
import { PositionPlace } from "utils/positionPlace";
import { useEffect, useState } from "react";
import BannerAboveTheMenu from "./banner/BannerAboveTheMenu";
import { isMobileOnly, isMobile, isDesktop } from "react-device-detect";
import { Col, NavDropdown, Row } from "react-bootstrap";
import MenuProductCategories from "./MenuProductCategories";
import { productCategoryServices } from "services/catalog/productCategoryServices";
import MenuBrands from "./MenuBrands";
import { brandServices } from "services/catalog/brandServices";
import router from "next/router";
import ShoppingCard from "./ShoppingCart";
import { connect } from "react-redux";
import { removeItem, addItem, getAll } from "redux/actions/shoppingCardActions";
import { useForm } from "react-hook-form";

var _ = require("lodash");

const Navabr = (props) => {
  let [isDropDownOpen, setIsDropDownOpen] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [banner, setBanner] = useState({});
  let [isTools, setIsTools] = useState(false);
  let [isToolsHovered, setIsToolsHovered] = useState(false);
  let [active, setActive] = useState(false);
  let [activeBrand, setBrand] = useState(false);
  const [productCategoriesData, setProductCategoriesData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [showBag, setShowBag] = useState(false);
  const { register, handleSubmit, watch, errors, reset } = useForm();

  //let { data: items, error } = useGetMenus();
  // if (items) {
  //     items = _.orderBy(items, ["priority"])
  // }
  const getProductCategoriesData = async () => {
    const result = await productCategoryServices.getCategoriesForMegaMenu();
    setProductCategoriesData(result.data);
  };

  const getBanner = async () => {
    let bannerAboveTheMenu = await bannerServices.getAll(
      PositionPlace.AboveTheMenu
    );
    setBanner(bannerAboveTheMenu.data);
  };

  const getBrand = async () => {
    let result = await brandServices.getBrandMenu();
    setBrandData(result.data);
  };

  useEffect(() => {
    setIsAuthenticated(getCookie("token") != "");
    (async () => {
      await getBanner();
      await getProductCategoriesData();
      await getBrand();
    })();
    // if(props.items.length > 0){
    //     setShowBag(true);

    // }
  }, []);

  const showShoppingBag = () => {
    // setShowBag(!showBag);
    router.push("/checkout");
  };

  const clickCategory = () => {
    // setBrand(false);
    // setActive(!active)
    router.push("/product");
  };
  const onMouseOverAction = (type) => {
    switch (type) {
      case "Out":
        setBrand(false);
        setActive(false);
        break;
      case "Over":
        setBrand(false);
        setActive(true);
        break;
      case "OutBrand":
        setBrand(false);
        setActive(false);
        break;
      case "OverBrand":
        setBrand(true);
        setActive(false);
        break;
    }
  };
  const clickBrand = () => {
    router.push("/brand");
  };
  const hideMenuCategory = () => {
    // setActive(!active)
  };

  const hideMenuBrand = () => {
    // setBrand(!activeBrand)
  };

  const onSubmit = async (data) => {
    let model = {};
    model.Title = data.title;
    reset();
    router.push({
      pathname: "/product",
      query: { ...model },
    });
  };

  const clickHide = (elType) => {
    switch (elType) {
      case 1: //category
        setActive(false);
        break;
      case 2: //brand
        setBrand(false);
        break;
    }
  };
  return (
    <>
      {banner.model ? (
        <>
          {/* <div className="header-navigation-area two-layers-header header-middlee bt_stick bt_sticky fixed direction-r">
                            <BannerAboveTheMenu banner={banner.model} />
                        </div> */}

          <header className="d-none d-md-block header-style-two">
            <div
              className="header-wrapper"
              style={{ marginBottom: isMobile ? 0 : "1%" }}
            >
              <div
                className={`${
                  !isMobile
                    ? "header-navigation-area two-layers-header header-middlee bt_stick bt_sticky fixed direction-r"
                    : " header-navigation-area two-layers-header header-middlee bt_stick bt_sticky fixed direction-r"
                }`}
              >
                {!isMobile ? (
                  <BannerAboveTheMenu banner={banner.model} />
                ) : null}
                <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-md-3 text-left">
                      <Link href="/">
                        <a className="navbar-brand">
                          <img
                            id="logo-image"
                            className="img-center"
                            src="/images/tamin.png"
                            alt="تامین پلاس"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <form
                        className="mt-2 nav-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <input
                          style={{ width: "100%" }}
                          ref={register({
                            required: false,
                          })}
                          className="form-control main-filter-input "
                          name="title"
                          placeholder="جستجو ... "
                        />
                        <span
                          className=" button-Serch flaticon-search"
                          onClick={handleSubmit(onSubmit)}
                        ></span>
                      </form>
                    </div>
                    <div className="col-md-3 login-section">
                      {isAuthenticated && (
                        <div class="dropdown rtl">
                          <button
                            class=""
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="flaticon-user"></span>
                            &nbsp; حساب کاربری
                          </button>
                          <div
                            class={`dropdown-menu`}
                            aria-labelledby="dropdownMenuButton"
                          >
                            {!isAuthenticated ? (
                              <Link href="/auth">
                                <a class="dropdown-item" href="#">
                                  ورود / ثبت نام
                                </a>
                              </Link>
                            ) : (
                              <div className="rtl">
                                <Link href="">
                                  <a
                                    href="#"
                                    class="dropdown-item font-weight-bold text-danger "
                                    style={{ direction: "ltr" }}
                                  >
                                    {" "}
                                    {typeof window != "undefined" &&
                                      getCookie("lastLoginDate")}
                                  </a>
                                </Link>
                                <Link href="/profile/userInfo">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    پروفایل
                                  </a>
                                </Link>
                                <Link href="/checkout">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    سبد خرید شما
                                  </a>
                                </Link>
                                <Link href="/profile/favoriteProducts">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    لیست علاقه مندی ها
                                  </a>
                                </Link>
                                <Link href="/profile/orders">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    سفارش های من
                                  </a>
                                </Link>
                                <Link href="/profile/payments">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    پرداخت های من
                                  </a>
                                </Link>
                                <a
                                  onClick={() => {
                                    deleteCoockie("token");
                                    location.reload();
                                  }}
                                  class="dropdown-item"
                                  href="#"
                                >
                                  خروج
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {!isAuthenticated && (
                        <Link href="/auth">
                          <a href="#">
                            <>ورود / ثبت نام</>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mobile-menu-right"></div>
                      <div className="main-menu f-right">
                        <nav id="mobile-menu-right" className="d-block">
                          <ul>
                            <li>
                              <Link href="/">
                                <a>
                                  <span className="flaticon-home"></span>
                                  &nbsp; صفحه اصلی
                                </a>
                              </Link>
                            </li>

                            <li
                              style={{ padding: "15px"}}
                              onMouseLeave={() => onMouseOverAction("Out")}
                              onMouseOver={() => onMouseOverAction("Over")}
                              onClick={() => clickCategory()}
                            >
                              {/* <div class="dropdown"> */}
                              <button
                                onMouseLeave={() => onMouseOverAction("Out")}
                                onMouseOver={() => onMouseOverAction("Over")}
                                class=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span> محصولات</span> &nbsp;
                                <span
                                  onMouseLeave={() => onMouseOverAction("Out")}
                                  onMouseOver={() => onMouseOverAction("Over")}
                                  className={`flaticon-right-chevron-1 ${
                                    active ? "rotate-270" : "rotate-90"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </button>
                              {/* <div  class={`dropdown-menu`} aria-labelledby="dropdownMenuButton"> */}
                              {active == true ? (
                                <div>
                                  <MenuProductCategories
                                    clickHide={clickHide}
                                    hideMenu={hideMenuCategory}
                                    type={1}
                                    active={active}
                                    data={productCategoriesData}
                                  />
                                </div>
                              ) : null}
                            </li>

                            <li
                              style={{ padding: "15px" }}
                              onClick={() => clickBrand()}
                              onMouseLeave={() => onMouseOverAction("OutBrand")}
                              onMouseOver={() => onMouseOverAction("OverBrand")}
                            >
                              {/* <div class="dropdown"> */}
                              <button
                                onMouseOver={() =>
                                  onMouseOverAction("OverBrand")
                                }
                                onMouseLeave={() =>
                                  onMouseOverAction("OutBrand")
                                }
                                class=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span
                                  onMouseOver={() =>
                                    onMouseOverAction("OverBrand")
                                  }
                                  onMouseLeave={() =>
                                    onMouseOverAction("OutBrand")
                                  }
                                >
                                  {" "}
                                  برندها
                                </span>{" "}
                                &nbsp;
                                <span
                                  className={`flaticon-right-chevron-1 ${
                                    activeBrand ? "rotate-270" : "rotate-90"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </button>
                              {/* <div  class={`dropdown-menu`} aria-labelledby="dropdownMenuButton"> */}
                              {activeBrand == true ? (
                                <div>
                                  {/* <MenuBrands  active={activeBrand} data={brandData} /> */}
                                  <MenuProductCategories
                                    type={2}
                                    hideMenu={hideMenuBrand}
                                    clickHide={clickHide}
                                    active={activeBrand}
                                    data={brandData}
                                  />
                                </div>
                              ) : null}
                            </li>

                            <li>
                              <Link href="/video">
                                <a>ویدیوهای آموزشی</a>
                              </Link>
                            </li>

                            <li>
                              <Link href="/article">
                                <a>بلاگ</a>
                              </Link>
                            </li>

                            <li>
                              {/* <ShoppingCard /> */}
                              <button
                                style={{ border: "none" }}
                                onClick={() => showShoppingBag()}
                                className=" btn  btn-outline-secondary "
                              >
                                {props?.items.length > 0 ? (
                                  // <span className='badge badge-danger bag-icon'>{props?.getAll().payload.length}</span> : null}
                                  <span className="badge badge-danger bag-icon">
                                    {props?.items
                                      ?.map((q) => q.itemCount)
                                      ?.reduce((total, num) => total + num)}
                                  </span>
                                ) : null}
                                &nbsp; سبد خرید
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </>
      ) : (
        <>


          <header className="d-none d-md-block header-style-two ">
            <div
              className="header-wrapper"
              style={{ marginBottom: isMobile ? 0 : "1%" }}
            >
              <div
                className={`${
                  !isMobile
                    ? "header-navigation-area two-layers-header header-middlee bt_stick bt_sticky fixed direction-r"
                    : " header-navigation-area two-layers-header header-middlee bt_stick bt_sticky fixed direction-r"
                }`}
              >
                {!isMobile ? (
                  <div>
                    <img
                      src={`/images/header.jpg`}
                      style={{ width: "100%", height: "58px" }}
                    />
                  </div>
                ) : null}
         <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-md-3 text-left">
                      <Link href="/">
                        <a className="navbar-brand">
                          <img
                            id="logo-image"
                            className="img-center"
                            src="/images/tamin.png"
                            alt="تامین پلاس"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <form
                        className="mt-2 nav-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <input
                          style={{ width: "100%" }}
                          ref={register({
                            required: false,
                          })}
                          className="form-control main-filter-input "
                          name="title"
                          placeholder="جستجو ... "
                        />
                        <span
                          className=" button-Serch flaticon-search"
                          onClick={handleSubmit(onSubmit)}
                        ></span>
                      </form>
                    </div>
                    <div className="col-md-3 login-section">
                      {isAuthenticated && (
                        <div class="dropdown rtl">
                          <button
                            class=""
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="flaticon-user"></span>
                            &nbsp; حساب کاربری
                          </button>
                          <div
                            class={`dropdown-menu`}
                            aria-labelledby="dropdownMenuButton"
                          >
                            {!isAuthenticated ? (
                              <Link href="/auth">
                                <a class="dropdown-item" href="#">
                                  ورود / ثبت نام
                                </a>
                              </Link>
                            ) : (
                              <div className="rtl">
                                <Link href="">
                                  <a
                                    href="#"
                                    class="dropdown-item font-weight-bold text-danger "
                                    style={{ direction: "ltr" }}
                                  >
                                    {" "}
                                    {typeof window != "undefined" &&
                                      getCookie("lastLoginDate")}
                                  </a>
                                </Link>
                                <Link href="/profile">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    پروفایل
                                  </a>
                                </Link>
                                <Link href="/checkout">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    سبد خرید شما
                                  </a>
                                </Link>
                                <Link href="/profile">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    لیست علاقه مندی ها
                                  </a>
                                </Link>
                                <Link href="/profile">
                                  <a href="#" class="dropdown-item">
                                    {" "}
                                    سفارش های من
                                  </a>
                                </Link>

                                <a
                                  onClick={() => {
                                    deleteCoockie("token");
                                    location.reload();
                                  }}
                                  class="dropdown-item"
                                  href="#"
                                >
                                  خروج
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {!isAuthenticated && (
                        <Link href="/auth">
                          <a href="#">
                            <>ورود / ثبت نام</>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      {/* <Link href="/">
                        <a className="navbar-brand  f-left ">
                          <img
                            id="logo-image"
                            className="img-center"
                            src="/images/tamin.png"
                            alt="تامین پلاس"
                          />
                        </a>
                      </Link> */}
                      <div className="mobile-menu-right"></div>
                      <div className="main-menu f-right">
                        <nav id="mobile-menu-right" className="d-block">
                          <ul>
                         
                            <li>
                              <Link href="/">
                                <a>
                                  <span className="flaticon-home"></span>
                                  &nbsp; صفحه اصلی
                                </a>
                              </Link>
                            </li>

                            <li
                              style={{ paddingBottom: "12px" , paddingTop:"12px"}}
                              onMouseLeave={() => onMouseOverAction("Out")}
                              onMouseOver={() => onMouseOverAction("Over")}
                              onClick={() => clickCategory()}
                            >
                              {/* <div class="dropdown"> */}
                              <button
                                onMouseLeave={() => onMouseOverAction("Out")}
                                onMouseOver={() => onMouseOverAction("Over")}
                                class=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span> محصولات</span> &nbsp;
                                <span
                                  onMouseLeave={() => onMouseOverAction("Out")}
                                  onMouseOver={() => onMouseOverAction("Over")}
                                  className={`flaticon-right-chevron-1 ${
                                    active ? "rotate-270" : "rotate-90"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </button>
                              {/* <div  class={`dropdown-menu`} aria-labelledby="dropdownMenuButton"> */}
                              {active == true ? (
                                <div>
                                  <MenuProductCategories
                                    //  hideMenu={hideMenuCategory}
                                    type={1}
                                    active={active}
                                    data={productCategoriesData}
                                  />
                                </div>
                              ) : null}
                            </li>

                            <li
                              style={{ paddingBottom: "12px" , paddingTop:"12px"}}
                              onClick={() => clickBrand()}
                              onMouseLeave={() => onMouseOverAction("OutBrand")}
                              onMouseOver={() => onMouseOverAction("OverBrand")}
                            >
                              {/* <div class="dropdown"> */}
                              <button
                                onMouseOver={() =>
                                  onMouseOverAction("OverBrand")
                                }
                                onMouseLeave={() =>
                                  onMouseOverAction("OutBrand")
                                }
                                class=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span
                                  onMouseOver={() =>
                                    onMouseOverAction("OverBrand")
                                  }
                                  onMouseLeave={() =>
                                    onMouseOverAction("OutBrand")
                                  }
                                >
                                  {" "}
                                  برندها
                                </span>{" "}
                                &nbsp;
                                <span
                                  className={`flaticon-right-chevron-1 ${
                                    activeBrand ? "rotate-270" : "rotate-90"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </button>
                              {/* <div  class={`dropdown-menu`} aria-labelledby="dropdownMenuButton"> */}
                              {activeBrand == true ? (
                                <div>
                                  {/* <MenuBrands  active={activeBrand} data={brandData} /> */}
                                  <MenuProductCategories
                                    type={2}
                                    hideMenu={hideMenuBrand}
                                    active={activeBrand}
                                    data={brandData}
                                  />
                                </div>
                              ) : null}
                            </li>

                            <li>
                              <Link href="/video">
                                <a>ویدیوهای آموزشی</a>
                              </Link>
                            </li>

                            <li>
                              <Link href="/article">
                                <a>بلاگ</a>
                              </Link>
                            </li>

                            {isAuthenticated && (
                              <li>
                                <div class="dropdown">
                                  <button
                                    class=""
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <span className="flaticon-user"></span>
                                    &nbsp; حساب کاربری
                                  </button>
                                  <div
                                    class={`dropdown-menu`}
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {!isAuthenticated ? (
                                      <Link href="/auth">
                                        <a class="dropdown-item" href="#">
                                          ورود / ثبت نام
                                        </a>
                                      </Link>
                                    ) : (
                                      <div>
                                        <Link href="/profile">
                                          <a href="#" class="dropdown-item">
                                            {" "}
                                            پروفایل
                                          </a>
                                        </Link>
                                        <Link href="/profile">
                                          <a href="#" class="dropdown-item">
                                            {" "}
                                            لیست علاقه مندی ها
                                          </a>
                                        </Link>
                                        <Link href="/profile">
                                          <a href="#" class="dropdown-item">
                                            {" "}
                                            سفارش های من
                                          </a>
                                        </Link>
                                        <Link href="/checkout">
                                          <a href="#" class="dropdown-item">
                                            {" "}
                                            سبد خرید شما
                                          </a>
                                        </Link>
                                        <a
                                          onClick={() => {
                                            deleteCoockie("token");
                                            location.reload();
                                          }}
                                          class="dropdown-item"
                                          href="#"
                                        >
                                          خروج
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )}
                            {!isAuthenticated && (
                              <li>
                                <Link href="/auth">
                                  <a href="#">
                                    <small>ورود / ثبت نام</small>
                                  </a>
                                </Link>
                              </li>
                            )}

                            <li>
                              {/* <ShoppingCard /> */}
                              <button
                                style={{ border: "none" }}
                                onClick={() => showShoppingBag()}
                                className=" btn btn-sm btn-outline-secondary "
                              >
                                {props?.items.length > 0 ? (
                                  <span className="badge badge-danger bag-icon">
                                    {props?.items
                                      ?.map((q) => q.itemCount)
                                      .reduce((total, num) => total + num)}
                                  </span>
                                ) : null}
                                &nbsp; سبد خرید
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </>
      )}
      {showBag == true ? <ShoppingCard /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.shoppingCard.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, index) => dispatch(removeItem(id, index)),
    addItem: (item) => dispatch(addItem(item)),
    getAll: () => dispatch(getAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navabr);
