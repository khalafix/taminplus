import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  removeItem,
  addItem,
  getAll,
  removeItemCount,
} from "redux/actions/shoppingCardActions";
import { isMobile, isBrowser, isTablet } from "react-device-detect";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getCookie, setCoockie, deleteCoockie, getUrl } from "helpers/Helpers";
import { ServerFileIdentifier } from "constants/configs";
import Link from "next/link";
import { Card } from "react-bootstrap";

const ShoppingCard = (props) => {
  const router = useRouter();
  // let [isCardOpen, setIsCardOpen] = useState(false);
  let [isCardClose, setIsCardClose] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);

  let [counter, setCounter] = useState(0);
  let [hasToken, setHasToken] = useState(false);
  let [itemCountValue, setItemCountValue] = useState([]);

  useEffect(() => {
    setMobileDevice(isMobile);
    // if (!getCookie('token')) {
    //     setIsCardOpen(false);
    //     router.push("/auth")
    // }

    // if (localStorage.getItem("shopping-card") != null) {
    //     let itemCounts = [];
    //     let items = JSON.parse(localStorage.getItem("shopping-card"));
    //     props.addItem([...items]);
    //     for (let index = 0; index < items.length; index++) {
    //         const element = items[index];
    //         itemCounts.push({ id: element.id, itemCount: element.itemCount });
    //     }
    //     setItemCountValue(itemCounts)
    // }

    setCounter(1);
  }, []);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const login = () => {
    setIsCardClose(true);
    debugger;
    router.push("/auth?redirectUrl=checkout");
  };

  const checkoutCheck = () => {
    setIsCardClose(true);
    // if (getCookie('token')) {

    router.push("/checkout");
    // } else {
    //     toast.warn("برای ثبت سفارش ابتدا وارد حساب کاربری خود شوید.")
    //     router.push("/auth?redirectUrl=checkout")
    // }
  };

  const AddItemCount = (itemValue, index) => {
    props.addItem(itemValue);
  };

  const MinesItemCount = (itemValue, index) => {
    props.removeItemCount(itemValue);
  };

  if (!counter) {
    return null;
  }

  return (
    // <div className="shopping-card-wrapper" style={{ right: isCardOpen ? "0" : !isMobile || isTablet ? "-400px" : "calc(-100vw + 50px)" }}>
    <div className="shopping-card-wrapper" hidden={isCardClose}>
      {/* {props.items.length > 0 && <div onClick={() => toggleCard()} className="shopping-card-icon">
                {!isCardOpen ? <span className="flaticon-shopping-bag">
                    <i className="shopping-card-items-count">{props.items.length > 0 && props.items.length}</i>
                </span> : <span className="flaticon-remove"></span>}
            </div>} */}

      <div className="shopping-card-container">
        <div className="shopping-card-title">
          {/* <span>
                        {props.items.length > 0 && (props.items.map(q => q.price).reduce((total, num) => (total + num))).toLocaleString()}
                    </span> */}

          <span className="flaticon-shopping-bag ml-2"></span>
          <span>سبد خرید شما</span>

          <div className="shopping-card-list-item-actions">
            <span
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => {
                setIsCardClose(true);
              }}
            >
              X
            </span>
          </div>
        </div>
        <div
          className="shopping-card-info"
          style={{ overflowY: "scroll", height: "350px" }}
        >
          {props.items.length > 0 ? (
            <ul className="shopping-card-list">
              {props.items.map((item, index) => {
                return (
                  <li className="shopping-card-product-item mb-2 mt-2">
                    <div
                      className="shopping-card-list-item-pic w-25"
                      onClick={() => setIsCardClose(true)}
                    >
                      <Link
                        href={`/product/${
                          item.enTitle
                            ? getUrl(item.enTitle)
                            : getUrl(item.productName)
                        }`}
                      >
                        <a href="">
                          <img
                            className="w-100"
                            src={`${ServerFileIdentifier()}${item.coverFile}`}
                          />
                        </a>
                      </Link>
                    </div>

                    {item.itemCount <= 1 ? (
                      <div className="shopping-card-list-item-infos ">
                        <div class="input-group mb-3">
                          <span
                            class="input-group-text font-weight-bold flaticon-add text-danger"
                            onClick={() => AddItemCount(item, index)}
                          ></span>
                        </div>
                      </div>
                    ) : (
                      <div className="shopping-card-list-item-infos">
                        <div class="input-group mb-3">
                          <span
                            class="input-group-text font-weight-bold flaticon-add text-danger"
                            onClick={() => AddItemCount(item, index)}
                          ></span>
                          <input
                            value={item.itemCount}
                            type="text"
                            class="input-group-form-control  input-styles-item text-center "
                            disabled
                          />
                          <span
                            class="input-group-text font-weight-bold flaticon-remove text-danger"
                            onClick={() => MinesItemCount(item, index)}
                          ></span>
                        </div>
                      </div>
                    )}

                    <div className="shopping-card-list-item-infos w-100  text-dark">
                      {item.productName} - {item.brandName}
                    </div>

                    {/* <div className="shopping-card-list-item-infos">
                                        {item.categoryName}
                                    </div> */}
                    {/* <div className="shopping-card-list-item-infos">
                                        {item.brandName}
                                    </div> */}

                    <div className="shopping-card-list-item-price w-80 text-dark mb-2">
                      {item.discountedPrice ? (
                        <>
                          <span className="text-muted   font-weight-light">
                            <strike> {item?.price?.toLocaleString()} </strike>{" "}
                          </span>
                          &nbsp;&nbsp;
                          <span>{item?.discountedPrice?.toLocaleString()}</span>
                        </>
                      ) : (
                        <>{item?.price?.toLocaleString()}</>
                      )}
                      <span className="font-weight-light">ریال</span>
                    </div>

                    <div className="shopping-card-list-item-actions">
                      <span
                        className=""
                        onClick={() => {
                          props.removeItem(item.id, item.index);
                          // setIsCardOpen(false);

                          if (props.items.length == 0) {
                            setIsCardClose(true);
                          }
                          toast.error("✔️ محصول از سبد خرید شما حذف شد");
                        }}
                      >
                        <span
                          style={{ marginBottom: "0%" }}
                          className="flaticon-remove"
                        ></span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <section className="price-section ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
                    <Card style={{ width: "100%" }}>
                      <Card.Img
                        className="mx-auto"
                        style={{ width: "400px", height: "400px" }}
                        variant="top"
                        src="/images/empty-cart.svg"
                      />
                      <Card.Body className="mx-auto">
                        {/* <Card.Img style={{ width: "20%", height: "20%", float: "left" }} src={`${ServerFileIdentifier()}${q.coverFile}`}></Card.Img> */}
                        {/* <Card.Title>{q.productName}</Card.Title> */}

                        <Card.Text style={{ textAlign: "center" }}>
                          <h4>سبد خرید شما خالی است!</h4>
                        </Card.Text>

                        <Card.Text>
                          <h6 className="text-danger text-center">
                            <a href="/product">مشاهده محصولات</a>
                          </h6>
                        </Card.Text>
                      </Card.Body>
                    </Card>{" "}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {props.items.length > 0 ? (
          !getCookie("token") ? (
            <div
              className="checkout-btn"
              style={{ marginBottom: mobileDevice == false ? "13%" : "28%" }}
            >
              <button
                onClick={() => login()}
                href="#"
                className="cs-btn-one btn-gradient-color btn-md  w-75"
              >
                {" "}
                ورود و ثبت سفارش
              </button>
            </div>
          ) : (
            <div
              className="checkout-btn"
              style={{ marginBottom: mobileDevice == false ? "13%" : "28%" }}
            >
              <button
                onClick={() => checkoutCheck()}
                disabled={props.items.length === 0}
                href="#"
                className="cs-btn-one btn-gradient-color btn-md  w-75"
              >
                {" "}
                ثبت سفارش
              </button>
            </div>
          )
        ) : null}
      </div>
    </div>
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
    //getAll: () => dispatch(getAll()),
    removeItemCount: (item) => dispatch(removeItemCount(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCard);
