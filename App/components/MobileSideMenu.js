// import { useGetMenus } from 'actions/index';
import { deleteCoockie, getCookie, getUrl } from "helpers/Helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { bannerServices } from "services/media/bannerServices";
import { PositionPlace } from "utils/positionPlace";
import React, { useEffect, useState } from "react";
import { Card, Collapse, ListGroup, NavDropdown } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import BannerAboveTheMenu from "./banner/BannerAboveTheMenu";
import { Navi } from 'components/m-menu/mmenu';
import ShoppingCard from "./ShoppingCart";
import { connect } from 'react-redux';
import { removeItem, addItem, getAll } from 'redux/actions/shoppingCardActions';
import MenuProductCategories from './MenuProductCategories';
import { Modal } from 'react-bootstrap';
import MobileMegaMenu from "./MobileMegaMenu";
import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { brandServices } from 'services/catalog/brandServices';
import { useForm } from "react-hook-form";

const fixCTA = () => {
  if (window.location.href.indexOf("course") > 0) {
    document.querySelector(".mobile-cta").style.opacity = 0;
  }
  if (document.querySelector(".serivce-section") != null) {
    if (
      window.pageYOffset > document.querySelector(".serivce-section").offsetTop
    ) {
      document.querySelector(".mobile-cta").style.opacity = 1;
    } else {
      document.querySelector(".mobile-cta").style.opacity = 0;
    }
  } else if (window.location.href.indexOf("course") < 0) {
    document.querySelector(".mobile-cta").style.opacity = 1;
  }
  var navbar = document.querySelector(".mobile-menu-header");
  if (window.pageYOffset > 0) {
    navbar.style.position = "fixed";
    //document.querySelector('.page-wrapper').style.paddingTop = '0'
  } else if (window.pageYOffset == 0 && isMobile) {
    //navbar.style.position = 'relative';
    document.querySelector(".page-wrapper").style.paddingTop = "60px";
  }
};

const MobileSideMenu = (props) => {
  var router = useRouter();
  let [btnText, setBtnText] = useState();
  //let { data: items, error } = useGetMenus();
  let [banner, setBanner] = useState({});
  let [isDropDownOpen, setIsDropDownOpen] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [isTools, setIsTools] = useState(false);
  let [isToolsHovered, setIsToolsHovered] = useState(false);
  let [active, setActive] = useState(false);
  let [activeBrand, setBrand] = useState(false);
  const [productCategoriesData, setProductCategoriesData] = useState([]);
  const [brandData, setBrandData] = useState([])
  const [showBag, setShowBag] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("productcategory")
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const [selectedChangeCategory, setSelectedChangeCategory] = useState(0);

  const [openCollapseCategory, setOpenCollapseCategory] = useState([]);
  const [openCollapseCateoryProduct, setOpenCollapseCateoryProduct] = useState([]);
  const [openCollapseCateoryProductParentItem, setOpenCollapseCateoryProductParentItem] = useState([]);
  const [openCollapseCateoryProductParentItemItem, setOpenCollapseCateoryProductParentItemItem] = useState([]);

  const [clickParentProduct, setClickParentProduct] = useState(false);



  const [openCollapseCategoryBrand, setOpenCollapseCategoryBrand] = useState([]);
  const [openCollapseCateoryProductBrand, setOpenCollapseCateoryProductBrand] = useState([]);
  const [openCollapseCateoryProductParentItemBrand, setOpenCollapseCateoryProductParentItemBrand] = useState([]);
  const [openCollapseCateoryProductParentItemItemBrand, setOpenCollapseCateoryProductParentItemItemBrand] = useState([]);

  const [clickParentProductBrand, setClickParentProductBrand] = useState(false);


  useEffect(() => {
    (async () => {
      setIsAuthenticated(getCookie("token") != "");
      await getProductCategoriesData();
      await getBrand();
      let bannerAboveTheMenu = await bannerServices.getAll(
        PositionPlace.AboveTheMenu
      );
      setBanner(bannerAboveTheMenu.data);
    })();
  }, []);

  const getProductCategoriesData = async () => {
    const result = await productCategoryServices.getCategoriesForMegaMenu();
    setProductCategoriesData(result.data)
  };
  const getBrand = async () => {

    let result = await brandServices.getBrandMenu();
    setBrandData(result.data)
  };


  const handleClose = () => {
    setShowModal(false)
    closeNav();
  };
  const handleShow = (type) => {
    setShowModal(true);
    setModalType(type)
  }

  const handleClick = (link) => {
    //e.preventDefault()
    document.querySelector(".sidenav").style.right = "-400px";
    document.querySelector(".mobile-side-layer").style.display = "none";
    closeNav();
    router.push(link);
  };

  const func = (e) => {
    var element = document.getElementById(e);
    element.classList.toggle("active");
    var dropdownContent = element.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  };

  const closeNav = () => {
    // if (isMobile) {
    //   document.querySelector('.shopping-card-wrapper').style.right = "calc(-100vw + 50px)";
    // }
    document.querySelector(".sidenav").style.right = "-400px";
    document.querySelector(".mobile-side-layer").style.display = "none";
    //document.querySelector(".page-wrapper").style.marginLeft = "0";
    //document.body.style.backgroundColor = "white !important";
  };

  const openNav = () => {
    document.querySelector(".sidenav").style.right = "0";
    document.querySelector(".mobile-side-layer").style.display = "block";
    //document.querySelector(".page-wrapper").style.marginLeft = "250px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4) !important";
    setShowBag(false);

  };


  const showShoppingBag = () => {
    setShowBag(!showBag);
    closeNav();
  }

  const clickBrand = () => {
    // closeNav();
    handleShow("brand");
  }
  const clickCategory = () => {
    // setBrand(false);
    // setActive(!active)
    // router.push("/product");
    // closeNav();
    handleShow("productcategory");
  }
  const onMouseOverAction = (type) => {

    switch (type) {
      case "Out":
        setBrand(false);
        setActive(false)
        break;
      case "Over":
        setBrand(false);
        setActive(true)
        break;


    }

  }

  const hideMenuCategory = () => {
    setActive(true)

  }

  const hideMenuBrand = () => {
    setBrand(false)
  }

  const onSubmit = async (data) => {
    let model = {};
    model.Title = data.title;
    closeNav();
    router.push({
      pathname: "/product",
      query: { ...model },
    });

  };


  const ClickParentCategory = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCategory.find(f => f.key == key)) {
      setOpenCollapseCategory([...openCollapseCategory.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCategory(temp);
    }


  }

  const ClickParentCateoryProduct = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProduct.find(f => f.key == key)) {
      setOpenCollapseCateoryProduct([...openCollapseCateoryProduct.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProduct(temp);
    }


  }


  const ClickParentCateoryProductParentItem = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProductParentItem.find(f => f.key == key)) {
      setOpenCollapseCateoryProductParentItem([...openCollapseCateoryProductParentItem.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProductParentItem(temp);
    }


  }



  const ClickParentCateoryProductItem = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProductParentItemItem.find(f => f.key == key)) {
      setOpenCollapseCateoryProductParentItemItem([...openCollapseCateoryProductParentItemItem.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProductParentItemItem(temp);
    }


  }


  const ClickParentProduct = (e) => {

    setClickParentProduct(!clickParentProduct);
  }








  const ClickParentCategoryBrand = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCategoryBrand.find(f => f.key == key)) {
      setOpenCollapseCategoryBrand([...openCollapseCategoryBrand.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCategoryBrand(temp);
    }


  }

  const ClickParentCateoryProductBrand = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProductBrand.find(f => f.key == key)) {
      setOpenCollapseCateoryProductBrand([...openCollapseCateoryProductBrand.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProductBrand(temp);
    }


  }


  const ClickParentCateoryProductParentItemBrand = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProductParentItemBrand.find(f => f.key == key)) {
      setOpenCollapseCateoryProductParentItemBrand([...openCollapseCateoryProductParentItemBrand.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProductParentItemBrand(temp);
    }


  }



  const ClickParentCateoryProductItemBrand = (key, show, e) => {

    e?.stopPropagation();
    if (openCollapseCateoryProductParentItemItemBrand.find(f => f.key == key)) {
      setOpenCollapseCateoryProductParentItemItemBrand([...openCollapseCateoryProductParentItemItemBrand.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
    }
    else {
      let temp = [];
      temp.push({ parentKey: key, key: key, show: show ? !show : true });
      setOpenCollapseCateoryProductParentItemItemBrand(temp);
    }


  }


  const ClickParentProductBrand = (e) => {


    setClickParentProductBrand(!clickParentProductBrand);
  }



  return (
    <>
      {/* <div style={{ width: "100%" }}>
        <BannerAboveTheMenu banner={banner.model} />
      </div> */}
      <div className="d-block d-md-none">
        <div className="mobile-cta d-flex d-md-none">{btnText}</div>
        <div onClick={() => closeNav()} className={`mobile-side-layer`}></div>
        <div className="mobile-menu-header ">
          <span onClick={() => openNav()}>☰</span>
 
          <Link href="/">
            <a className="text-center">
              <img
                width={"80%"}
                height={"80%"}
                src="/images/taminplus.png"
                alt="تامین پلاس"
              />
            </a>
          </Link>

          <Link href="/checkout">
            <a style={{fontSize:"14px" , padding:0}} href="#" onClick={() => closeNav()} class="dropdown-item">
              {props?.getAll().payload.length > 0 ?
                <span  className='badge badge-danger bag-icon'>{props?.getAll().payload
                  ?.map((q) => q.itemCount)
                  ?.reduce((total, num) => total + num)}</span> : null}
              {/* <span className='flaticon-shopping-bag '></span> */}
              &nbsp;
              سبد خرید
            </a>
          </Link>
        </div>
        <div class="sidenav sidenav-mobile">
          <a
            href="javascript:void(0)"
            class="closebtn"
            onClick={() => closeNav()}
          >
            &times;
          </a>
          {/* <a onClick={() => handleClick("/")}>
            <span className="flaticon-home"></span>
          </a> */}
          {/* {items && */}

          {typeof window != 'undefined' && getCookie("token") &&
            <Link href="">
              <a href="#" class="dropdown-item font-weight-bold text-danger " style={{ fontSize: "18px" }} >   {typeof window != 'undefined' && getCookie("lastLoginDate")}</a>
            </Link>

          }
          <form className="mt-3 nav-form" onSubmit={handleSubmit(onSubmit)}>




            <input
              style={{ width: "100%" }}
              ref={register({
                required: false,
              })}
              className="form-control main-filter-input "
              name="title"
              placeholder="جستجو ... "
            />
            <span className=' button-Serch flaticon-search' onClick={handleSubmit(onSubmit)}></span>

          </form>





          {/*  محصولات - سطح 0 */}
          <div className="mt-4">
            <div className="d-flex collapse-div">

              <Link href={`/product`}><a onClick={() => closeNav()} className={` font-weight-bold collapse-div`}> محصولات</a></Link>

              <span onClick={() => ClickParentProduct(true)} className={`flaticon-right-chevron-1 ${clickParentProduct ? "rotate-270" : "rotate-90"}`} ></span>
            </div>

            <Collapse in={clickParentProduct}>
              <div className="example-collapse-text">

                <ListGroup variant="flush" style={{ height: productCategoriesData.length > 4 ? "300px" : "auto", overflowX: "hidden", overflowY: productCategoriesData.length > 4 ? "scroll" : "auto", backgroundColor: "white !importent" }}>
                  {/*  سطح 1 - دسته بندی */}

                  {
                    productCategoriesData.length > 0 && productCategoriesData.map((parentItem) => {
                      return (

                        <ListGroup.Item>
                          <div className="   mr-3   d-flex justify-content-between collapse-div " onClick={() => ClickParentCategory(parentItem.key, openCollapseCategory.find(f => f.key == parentItem.key)?.show)} >
                            <Link href={`/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a onClick={() => closeNav()} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} p-1 font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                            <h6 className={`flaticon-right-chevron-1 ${openCollapseCategory.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                          </div>


                          <>

                            <Collapse in={
                              openCollapseCategory.find(f => f.key == parentItem.key)?.show ?
                                openCollapseCategory.find(f => f.key == parentItem.key)?.show : false

                            } >
                              <div className="example-collapse-text">

                                <ListGroup variant="flush" style={{ height: parentItem?.children?.length > 3 ? "250px" : "auto", overflowX: "hidden", overflowY: parentItem?.children?.length > 3 ? "scroll" : "auto" }}>
                                  <>
                                    {/*  سطح 2 -  قطعه */}

                                    {

                                      parentItem.children && parentItem.children.map((childItem) => {
                                        return (
                                          <ListGroup.Item>
                                            <div className="mr-4    d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProduct(childItem.key, openCollapseCateoryProduct.find(f => f.key == childItem.key)?.show)} >
                                              <Link href={`/product/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}`}><a onClick={() => closeNav()} className={` p-1 text-dark font-weight-bold collapse-div`}> {`${childItem.title}`} </a></Link>
                                              <h6 className={`flaticon-right-chevron-1 ${openCollapseCateoryProduct.find(f => f.key == childItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                            </div>


                                            <>

                                              <Collapse in={
                                                openCollapseCateoryProduct.find(f => f.key == childItem.key)?.show ?
                                                  openCollapseCateoryProduct.find(f => f.key == childItem.key)?.show : false

                                              } >

                                                <div className="example-collapse-text">

                                                  <ListGroup variant="flush" style={{ height: childItem?.children?.length > 5 ? "250px" : "auto", overflowX: "hidden", overflowY: childItem?.children?.length > 5 ? "scroll" : "auto" }}>
                                                    <>
                                                      {/*  سطح 3 -  برند */}

                                                      {

                                                        childItem.children && childItem.children.map((childItemItem) => {
                                                          return (
                                                            <ListGroup.Item>
                                                              <div className=" mr-5    d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProductParentItem(childItemItem.key, openCollapseCateoryProductParentItem.find(f => f.key == childItemItem.key)?.show)} >
                                                                <Link href={`/product/categorybrand/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}/${getUrl(childItemItem.enTitle ? childItemItem.enTitle : childItemItem.title)}`}><a onClick={() => closeNav()} className={` p-1 text-dark font-weight-bold collapse-div`}> {`${childItemItem.title}`} </a></Link>
                                                                <h6 className={`flaticon-right-chevron-1 ${openCollapseCateoryProductParentItem.find(f => f.key == childItemItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                              </div>


                                                              <>

                                                                <Collapse in={
                                                                  openCollapseCateoryProductParentItem.find(f => f.key == childItemItem.key)?.show ?
                                                                    openCollapseCateoryProductParentItem.find(f => f.key == childItemItem.key)?.show : false

                                                                } >

                                                                  <div className="example-collapse-text">

                                                                    <ListGroup variant="flush" style={{ height: childItemItem?.children?.length > 6 ? "150px" : "auto", overflowX: "hidden", overflowY: childItemItem?.children?.length > 6 ? "scroll" : "auto" }}>
                                                                      <>
                                                                        {/*  سطح 4 -  محصول */}

                                                                        {

                                                                          childItemItem.children && childItemItem.children.map((childItemItemItem) => {
                                                                            return (
                                                                              <ListGroup.Item>
                                                                                <div className="  d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProductItem(childItemItemItem.key, openCollapseCateoryProductParentItemItem.find(f => f.key == childItemItemItem.key)?.show)} >
                                                                                  <Link href={`/product/${getUrl(childItemItemItem.enTitle ? childItemItemItem.enTitle : childItemItem.title)}`}><a onClick={() => closeNav()} style={{ fontSize: "12px" }} className={`text-dark font-weight-bold collapse-div p-0`}> {`${childItemItemItem.title}`} </a></Link>
                                                                                  <h6 className={`flaticon-right-chevron-1 flip-h text-dark`} ></h6>
                                                                                </div>


                                                                              </ListGroup.Item>


                                                                            )
                                                                          })
                                                                        }


                                                                      </>
                                                                    </ListGroup>

                                                                  </div>


                                                                </Collapse>
                                                              </>
                                                            </ListGroup.Item>


                                                          )
                                                        })
                                                      }


                                                    </>
                                                  </ListGroup>

                                                </div>

                                              </Collapse>
                                            </>
                                          </ListGroup.Item>


                                        )
                                      })
                                    }


                                  </>
                                </ListGroup>

                              </div>
                            </Collapse>
                          </>
                        </ListGroup.Item>
                      )
                    })
                  }


                </ListGroup>

              </div>
            </Collapse>
          </div>




          {/* <Link href="/brand">
            <a onClick={() => closeNav()}>
              برندها
            </a>
          </Link> */}


          <div className="mt-1">
            <div className="d-flex collapse-div">

              <Link href={`/brand`}><a onClick={() => closeNav()} className={` font-weight-bold collapse-div`}> برندها</a></Link>

              <span onClick={() => ClickParentProductBrand(true)} className={`flaticon-right-chevron-1 ${clickParentProductBrand ? "rotate-270" : "rotate-90"}`} ></span>
            </div>

            <Collapse in={clickParentProductBrand}>
              <div className="example-collapse-text">

                <ListGroup variant="flush" style={{ height: brandData.length > 4 ? "300px" : "auto", overflowX: "hidden", overflowY: brandData.length > 4 ? "scroll" : "auto", backgroundColor: "white !importent" }}>
                  {/*  سطح 1 -  برند ها */}

                  {
                    brandData.length > 0 && brandData.map((parentItem) => {
                      return (

                        <ListGroup.Item>
                          <div className="   mr-3   d-flex justify-content-between collapse-div " onClick={() => ClickParentCategoryBrand(parentItem.key, openCollapseCategoryBrand.find(f => f.key == parentItem.key)?.show)} >
                            <Link href={`${parentItem.key == -1 ?
                              '/brands'
                              :
                              `/brand/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}`}><a onClick={() => closeNav()} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} p-1 font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                            {
                              parentItem.key != -1 &&
                              <h6 className={`flaticon-right-chevron-1 ${openCollapseCategoryBrand.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                            }
                          </div>


                          <>

                            <Collapse in={
                              openCollapseCategoryBrand.find(f => f.key == parentItem.key)?.show ?
                                openCollapseCategoryBrand.find(f => f.key == parentItem.key)?.show : false

                            } >
                              <div className="example-collapse-text">

                                <ListGroup variant="flush" style={{ height: parentItem?.children?.length > 3 ? "250px" : "auto", overflowX: "hidden", overflowY: parentItem?.children?.length > 3 ? "scroll" : "auto" }}>
                                  <>
                                    {/*  سطح 2 -  قطعه */}

                                    {

                                      parentItem.children && parentItem.children.map((childItem) => {
                                        return (
                                          <ListGroup.Item>
                                            <div className="mr-4    d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProductBrand(childItem.key, openCollapseCateoryProductBrand.find(f => f.key == childItem.key)?.show)} >
                                              <Link href={`/brand/category/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a onClick={() => closeNav()} className={` p-1 text-dark font-weight-bold collapse-div`}> {`${childItem.title}`} </a></Link>
                                              <h6 className={`flaticon-right-chevron-1 ${openCollapseCateoryProductBrand.find(f => f.key == childItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                            </div>


                                            <>

                                              <Collapse in={
                                                openCollapseCateoryProductBrand.find(f => f.key == childItem.key)?.show ?
                                                  openCollapseCateoryProductBrand.find(f => f.key == childItem.key)?.show : false

                                              } >

                                                <div className="example-collapse-text">

                                                  <ListGroup variant="flush" style={{ height: childItem?.children?.length > 5 ? "250px" : "auto", overflowX: "hidden", overflowY: childItem?.children?.length > 5 ? "scroll" : "auto" }}>
                                                    <>
                                                      {/*  سطح 3 -  دسته بندی */}

                                                      {

                                                        childItem.children && childItem.children.map((childItemItem) => {
                                                          return (
                                                            <ListGroup.Item>
                                                              <div className=" mr-4    d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProductParentItemBrand(childItemItem.key, openCollapseCateoryProductParentItemBrand.find(f => f.key == childItemItem.key)?.show)} >
                                                                <Link href={`/brandcategory/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}/${getUrl(childItemItem.enTitle ? childItemItem.enTitle : childItemItem.title)}`}><a onClick={() => closeNav()} className={` p-1 text-dark font-weight-bold collapse-div`}> {`${childItemItem.title}`} </a></Link>
                                                                <h6 className={`flaticon-right-chevron-1 ${openCollapseCateoryProductParentItemBrand.find(f => f.key == childItemItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                              </div>


                                                              <>

                                                                <Collapse in={
                                                                  openCollapseCateoryProductParentItemBrand.find(f => f.key == childItemItem.key)?.show ?
                                                                    openCollapseCateoryProductParentItemBrand.find(f => f.key == childItemItem.key)?.show : false

                                                                } >

                                                                  <div className="example-collapse-text">

                                                                    <ListGroup variant="flush" style={{ height: childItemItem?.children?.length > 6 ? "150px" : "auto", overflowX: "hidden", overflowY: childItemItem?.children?.length > 6 ? "scroll" : "auto" }}>
                                                                      <>
                                                                        {/*  سطح 4 -  محصول */}

                                                                        {

                                                                          childItemItem.children && childItemItem.children.map((childItemItemItem) => {
                                                                            return (
                                                                              <ListGroup.Item>
                                                                                <div className="  d-flex justify-content-between collapse-div " onClick={() => ClickParentCateoryProductItemBrand(childItemItemItem.key, openCollapseCateoryProductParentItemItemBrand.find(f => f.key == childItemItemItem.key)?.show)} >
                                                                                  <Link href={`/product/${getUrl(childItemItemItem.enTitle ? childItemItemItem.enTitle : childItemItem.title)}`}><a onClick={() => closeNav()} style={{ fontSize: "12px" }} className={`text-dark font-weight-bold collapse-div p-0`}> {`${childItemItemItem.title}`} </a></Link>
                                                                                  <h6 className={`flaticon-right-chevron-1 flip-h text-dark`} ></h6>
                                                                                </div>


                                                                              </ListGroup.Item>


                                                                            )
                                                                          })
                                                                        }


                                                                      </>
                                                                    </ListGroup>

                                                                  </div>


                                                                </Collapse>
                                                              </>
                                                            </ListGroup.Item>


                                                          )
                                                        })
                                                      }


                                                    </>
                                                  </ListGroup>

                                                </div>

                                              </Collapse>
                                            </>
                                          </ListGroup.Item>


                                        )
                                      })
                                    }


                                  </>
                                </ListGroup>

                              </div>
                            </Collapse>
                          </>
                        </ListGroup.Item>
                      )
                    })
                  }


                </ListGroup>

              </div>
            </Collapse>
          </div>










          <Link href="/video">
            <a onClick={() => closeNav()}>
              ویدیوهای آموزشی
            </a>
          </Link>




          <Link href="/article">
            <a onClick={() => closeNav()}>
              بلاگ
            </a>
          </Link>



          {/* <ShoppingCard /> */}
          {/* <button style={{ border: "none" }} onClick={() => showShoppingBag()} className=" btn btn-sm btn-outline-secondary ">
            {props?.getAll().payload.length > 0 ?
              <span className='badge badge-danger bag-icon'>{props?.getAll().payload.length}</span> : null}
            &nbsp;
            سبد خرید
          </button> */}

          <Link href="/checkout">
            <a href="#" onClick={() => closeNav()} class="dropdown-item">
              {props?.getAll().payload.length > 0 ?
                <span className='badge badge-danger bag-icon'>{props?.getAll().payload
                  ?.map((q) => q.itemCount)
                  ?.reduce((total, num) => total + num)}</span> : null}
              {/* <span className='flaticon-shopping-bag '></span> */}
              &nbsp;
              سبد خرید
            </a>
          </Link>



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
                      <a href="#" onClick={() => closeNav()} class="dropdown-item">
                        {" "}
                        پروفایل
                      </a>
                    </Link>
                    {/* <Link href="/checkout">
                      <a href="#" onClick={() => closeNav()} class="dropdown-item">
                        {" "}
                        سبد خرید شما
                      </a>
                    </Link> */}
                    <Link href="/profile/favoriteProducts">
                      <a href="#" onClick={() => closeNav()} class="dropdown-item">
                        {" "}
                        لیست علاقه مندی ها
                      </a>
                    </Link>
                    <Link href="/profile/orders">
                      <a href="#" onClick={() => closeNav()} class="dropdown-item">
                        {" "}
                        سفارش های من
                      </a>
                    </Link>
                    <Link href="/profile/payments">
                      <a href="#" onClick={() => closeNav()} class="dropdown-item">
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
              <a onClick={() => handleClick("/auth")}>ورود - ثبت نام</a>

            </Link>
          )}
          {/* {typeof window != 'undefined' && <div
            className={`login-box text-white ${getCookie("token") ? "bg-danger" : "bg-primary"
              }`}
          >
            {!getCookie("token") ? (
              <a onClick={() => handleClick("/auth")}>ورود - ثبت نام</a>
            ) : (
              <a
                onClick={() => {
                  deleteCoockie("token");
                  window.location.reload();
                }}
              >
                خروج از حساب کاربری
              </a>
            )}
          </div>} */}

        </div>
      </div>

      {
        showBag == true ?
          <ShoppingCard /> : null
      }
      {/* <Modal
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}

      >

        {
          modalType == "productcategory" ?
            <Modal.Header >محصولات
            </Modal.Header> :
            <Modal.Header >برندها
            </Modal.Header>

        }
        <Modal.Body>
          <MobileMegaMenu data={modalType == "productcategory" ? productCategoriesData : brandData} type={modalType} />

        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-secondary' onClick={()=>handleClose()}>
            بستن
          </button>
        </Modal.Footer>

      </Modal> */}

    </>
  );
};

// export default MobileSideMenu;
const mapStateToProps = (state) => {

  return {
    items: state.shoppingCard.items.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, index) => dispatch(removeItem(id, index)),
    addItem: (item) => dispatch(addItem(item, true)),
    getAll: () => dispatch(getAll())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileSideMenu);