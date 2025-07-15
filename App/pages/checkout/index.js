import { getPagesSeourl, getPageBySeourl } from "lib/api";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import LoadingButton from "components/LoadingButton";
import { getCookie, getUrl, getUserid } from "helpers/Helpers";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  Button,
  Card,
  Col,
  Form,
  Nav,
  Row,
  OverlayTrigger,
  Tooltip,
  Modal,
  Popover,
} from "react-bootstrap";
import { ServerFileIdentifier } from "constants/configs";
import {
  removeItem,
  addItem,
  clear,
  getAll,
  removeItemCount,
  getCount,
} from "redux/actions/shoppingCardActions";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { orderServices } from "services/catalog/orderServices";
import CustomerInformation from "components/CustomerInformation";
import { isMobile } from "react-device-detect";
import { userService } from "services/userService";

const Checkout = (props) => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, reset, Su } = useForm();
  const [show, setShow] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

  let [isCardOpen, setIsCardOpen] = useState(false);
  let [koponResult, setKoponResult] = useState({});
  const [showPersonalInfornation, setShowPersonalInfornation] = useState(false);

  const [isResultOrder, setIsResultOrder] = useState(false);
  const [showCardOrder, setShowCardOrder] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  let koponInput = useRef();

  let [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/auth?redirectUrl=checkout");
    } else {
      getUserInformation();
      setHasToken(true);
    }
  }, []);

  const handleCloseCustomerInfo = async () => {
    setShowCustomerInfo(false);
    await getUserInformation();
  };
  const handleShowCustomerInfo = () => setShowCustomerInfo(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeAllItem = () => {
    setIsCardOpen(false);
    props.clear();
    toast.error("✔️ همه محصولات از سبد خرید شما حذف شد  ");
    setShow(false);
  };

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
  useEffect(() => {
    Swal.fire({
      title: "توجه!",
      text: "هزینه ارسال کالا بر عهده مشتری می‌باشد",
      icon: "info",
      confirmButtonText: "فهمیدم",
      confirmButtonColor: "#3085d6",
      background: "#fffbe6",
      customClass: {
        popup: "rtl-alert",
      },
    });
  }, []);
  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Title as="h3">Popover right</Popover.Title> */}
      <Popover.Content style={{ width: "400px", height: "80px" }}>
        <div
          className="mt-2 font-weight-bold"
          style={{ color: "dark !importent", fontFamily: "SDF" }}
        >
          <Link href={"/profile/orders"}>
            <a href="#">
              {" "}
              <span className="flaticon-checklist text-dark">
                {" "}
                سفارش های من
              </span>{" "}
            </a>
          </Link>
        </div>

        <div style={{ fontFamily: "SDF" }} className="mt-2 font-weight-bold">
          <a className="text-danger" onClick={() => handleShow()}>
            {" "}
            <span>X</span> <span> حذف همه</span>{" "}
          </a>
        </div>
      </Popover.Content>
    </Popover>
  );
  const ActionButton = () => {
    if (!isMobile) {
      return (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <button
            style={{ marginRight: "53%" }}
            size="sm"
            class="btn btn-secondary"
          >
            <span className="flaticon-planning-1"></span>{" "}
          </button>
        </OverlayTrigger>
      );
    } else {
      return (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <button
            style={{ marginRight: "49.25%" }}
            size="sm"
            class="btn btn-secondary"
          >
            <span className="flaticon-planning-1"></span>{" "}
          </button>
        </OverlayTrigger>
      );
    }
  };

  const checkKopon = async () => {
    setKoponResult({});
    if (koponInput.current.value) {
      let result = await orderServices.checkKopon(koponInput.current.value);
      if (result.isSuccess) {
        setKoponResult(result.data);
        toast.success(result.message + "✔️");
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("کوپن تخفیف را وارد کنید");
    }
  };

  const addOrderWithPay = async () => {
    setLoadingAction(true);
    let model = {};
    model.isPaied = true;
    model.items = [];
    // model.parishId = val.parishId;
    // model.regionId = val.regionId;
    // model.cityId = val.goldIranCityId;
    // model.provinceId = val.goldIranProvinceId;
    // model.deliveryAddress = val.deliveryAddress;

    model.koponCode = koponResult.code;
    for (let index = 0; index < props?.items.length; index++) {
      const element = props?.items[index];
      model.items.push({
        productId: element.id,
        itemCount: element.itemCount ? element.itemCount : 1,
      });
    }

    let result = await orderServices.addOrder(model);

    if (result.isSuccess == true) {
      debugger;

      // reset({ ...result.data });
      document.getElementById("RefId").value = result?.data?.refId;
      document.getElementById("MobileNo").value = result?.data?.mobileNo;
      document.getElementById("formSubmit").submit();
      setTimeout(() => {
        setLoadingAction(false);
      }, 3000);
    } else {
      setLoadingAction(false);
      toast.error(result.message);
    }
  };

  const addOrder = async (val) => {
    setLoadingAction(true);

    let model = {};
    model.isPaied = false;
    model.items = [];
    // model.parishId = val.parishId;
    // model.regionId = val.regionId;
    // model.cityId = val.goldIranCityId;
    // model.provinceId = val.goldIranProvinceId;
    // model.deliveryAddress = val.deliveryAddress;

    model.koponCode = koponResult.code;
    for (let index = 0; index < props?.items.length; index++) {
      const element = props?.items[index];
      model.items.push({
        productId: element.id,
        itemCount: element.itemCount ? element.itemCount : 1,
      });
    }

    let result = await orderServices.addOrder(model);

    if (result.isSuccess == true) {
      setLoadingAction(false);

      toast.success(result.message);
      setLoading(false);
      props.clear();
      setShowCardOrder(true);
      router.push("/profile/orders");
    } else {
      setLoadingAction(false);
      toast.error(result.message);
      setLoading(false);
    }
  };

  const AddItemCount = (itemValue, index) => {
    props.addItem(itemValue);
    // getItemCount(itemValue.id);
    // props?.getAll();
  };

  const MinesItemCount = (itemValue, index) => {
    props.removeItemCount(itemValue);
    // getItemCount(itemValue.id);
    // props?.getAll();
  };

  const getItemCount = (id) => {
    return props.getCount(id).payload;
  };

  const getUserInformation = async () => {
    const result = await userService.getuserbyId();
    if (result.isSuccess) {
      setUserInfo(result.data);
    }
  };
  const listOrder = async () => {
    router.push("/profile");
  };

  return (
    <>
      {hasToken == true && (
        <>
          <Head>
            <title>سبد خرید</title>
            <meta name="description" content="سبد خرید " />
          </Head>

          {props?.items?.length > 0 ? (
            <>
              <section className="price-section mt-4">
                <div className="container">
                  <div className="d-flex justify-content-start">
                    <h6>
                      سبد خرید شما ({" "}
                      {props?.items
                        .map((q) => q.itemCount)
                        .reduce((total, num) => total + num)}{" "}
                      کالا )
                    </h6>

                    <ActionButton />
                  </div>
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 mx-auto mb-2">
                      {/* { props?.items.map(q => { */}
                      {props?.items.map((q) => {
                        return (
                          // <li>
                          //     <label>✔️ {q.productName}</label>
                          //     <label>{q.price ? q.price.toLocaleString() :  q.discountedPrice.toLocaleString()}<small className="mr-2">ریال</small></label>
                          // </li>
                          <>
                            {/* <Col md={12}> */}

                            <li
                              className="shopping-card-product-item  "
                              style={{ direction: "ltr" }}
                            >
                              <div className="shopping-card-list-item-pic w-25 ">
                                <Link href={`/product/${getUrl(q.enTitle)}`}>
                                  <a href="">
                                    <img
                                      className="w-100"
                                      src={`${ServerFileIdentifier()}${
                                        q.coverFile
                                      }`}
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className="shopping-card-list-item-infos text-dark  w-50">
                                {q.productName}
                              </div>

                              {/* <div className="shopping-card-list-item-infos text-dark">
                                                                    {q.brandName}
                                                                </div> */}

                              <div className="shopping-card-list-item-price text-dark ">
                                <span className="font-weight-light">ریال</span>{" "}
                                &nbsp;
                                {q.discountedPrice ? (
                                  <>
                                    <span className="text-muted mr-2">
                                      <strike>
                                        {" "}
                                        {q.price.toLocaleString()}{" "}
                                      </strike>{" "}
                                    </span>{" "}
                                    {q.discountedPrice.toLocaleString()}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <span className="text-muted mr-5"></span>
                                    {q.price.toLocaleString()}
                                  </>
                                )}
                              </div>

                              <div className="shopping-card-list-item-price text-dark  w-25">
                                {q.itemCount <= 1 ? (
                                  <div>
                                    <div className="text-danger mr-3">
                                      {"1"}
                                    </div>
                                    <div class="input-group mb-3">
                                      <span
                                        class="input-group-text font-weight-bold flaticon-add text-danger"
                                        onClick={() => AddItemCount(q)}
                                      ></span>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div class="input-group mb-3">
                                      <span
                                        class="input-group-text font-weight-bold flaticon-add text-danger"
                                        onClick={() => AddItemCount(q)}
                                      ></span>
                                      <input
                                        value={q.itemCount}
                                        type="text"
                                        class="input-group-form-control  input-styles-item text-center "
                                        disabled
                                      />
                                      <span
                                        class="input-group-text font-weight-bold flaticon-remove text-danger"
                                        onClick={() => MinesItemCount(q)}
                                      ></span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="shopping-card-list-item-actions">
                                <span
                                  className=""
                                  onClick={() => {
                                    props.removeItem(q.id, q.index);
                                    // setIsCardOpen(false);
                                    toast.error(
                                      "✔️ محصول از سبد خرید شما حذف شد"
                                    );
                                  }}
                                >
                                  X
                                </span>
                              </div>
                            </li>
                            {/* </Col> */}
                          </>
                        );
                      })}
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4  mx-auto ">
                      <div className="">
                        <Card style={{ width: "100%" }}>
                          <Card.Body>
                            <Card.Text
                              style={{ textAlign: "center", marginTop: "2%" }}
                            >
                              <div className="row">
                                <div className="col-12 font-weight-bold ">
                                  <label className="ml-3"> جمع سبد خرید:</label>
                                  <label className="">
                                    {props.items
                                      .map((q) =>
                                        q.discountedPrice
                                          ? q.discountedPrice * q.itemCount
                                          : q.price * q.itemCount
                                      )
                                      .reduce((total, num) => total + num)
                                      .toLocaleString()}
                                    <small className="mr-2">ریال</small>
                                  </label>
                                </div>
                                {props.items
                                  .map((q) => q.price * q.itemCount)
                                  .reduce((total, num) => total + num) -
                                  props.items
                                    .map((q) =>
                                      q.discountedPrice
                                        ? q.discountedPrice * q.itemCount
                                        : q.price * q.itemCount
                                    )
                                    .reduce((total, num) => total + num) >
                                  0 && (
                                  <div className="col-12 font-weight-bold">
                                    <label className="ml-3">
                                      {" "}
                                      سود شما از خرید:
                                    </label>
                                    <label>
                                      {(
                                        props.items
                                          .map((q) => q.price * q.itemCount)
                                          .reduce((total, num) => total + num) -
                                        props.items
                                          .map((q) =>
                                            q.discountedPrice
                                              ? q.discountedPrice * q.itemCount
                                              : q.price * q.itemCount
                                          )
                                          .reduce((total, num) => total + num)
                                      ).toLocaleString()}
                                      <small className="mr-2">ریال</small>
                                    </label>
                                  </div>
                                )}

                                {koponResult?.percent ? (
                                  <>
                                    <div className="col-12 font-weight-bold">
                                      <label className="ml-3">
                                        {" "}
                                        مبلغ تخفیف کوپن:{" "}
                                      </label>
                                      <label>
                                        {koponResult?.percent ? (
                                          <>
                                            <span>
                                              {(
                                                (props.items
                                                  .map((q) =>
                                                    q.discountedPrice
                                                      ? q.discountedPrice *
                                                        q.itemCount
                                                      : q.price * q.itemCount
                                                  )
                                                  .reduce(
                                                    (total, num) => total + num
                                                  ) *
                                                  koponResult?.percent) /
                                                100
                                              ).toLocaleString()}
                                            </span>
                                          </>
                                        ) : (
                                          props.items
                                            .map((q) =>
                                              q.discountedPrice
                                                ? q.discountedPrice *
                                                  q.itemCount
                                                : q.price * q.itemCount
                                            )
                                            .reduce((total, num) => total + num)
                                            .toLocaleString()
                                        )}
                                        <small className="mr-2">ریال</small>
                                      </label>
                                    </div>
                                  </>
                                ) : null}
                                <div className="col-12 font-weight-bold  text-danger ">
                                  <label className="ml-3">
                                    {" "}
                                    مبلغ قابل پرداخت:
                                  </label>
                                  <label>
                                    {koponResult?.percent
                                      ? (
                                          props.items
                                            .map((q) =>
                                              q.discountedPrice
                                                ? q.discountedPrice *
                                                  q.itemCount
                                                : q.price * q.itemCount
                                            )
                                            .reduce(
                                              (total, num) => total + num
                                            ) -
                                          (props.items
                                            .map((q) =>
                                              q.discountedPrice
                                                ? q.discountedPrice *
                                                  q.itemCount
                                                : q.price * q.itemCount
                                            )
                                            .reduce(
                                              (total, num) => total + num
                                            ) *
                                            koponResult?.percent) /
                                            100
                                        ).toLocaleString()
                                      : props.items
                                          .map((q) =>
                                            q.discountedPrice
                                              ? q.discountedPrice * q.itemCount
                                              : q.price * q.itemCount
                                          )
                                          .reduce((total, num) => total + num)
                                          .toLocaleString()}

                                    <small className="mr-2">ریال</small>
                                  </label>
                                </div>
                              </div>
                            </Card.Text>
                            <Card.Text>
                              <div className="row li-Space">
                                <input
                                  style={{ fontFamily: "SDF" }}
                                  ref={koponInput}
                                  className="custom-form-control text-center "
                                  name="koponCode"
                                  placeholder="    کوپن تخفیف"
                                />

                                <button
                                  onClick={() => checkKopon()}
                                  type="button"
                                  class="btn btn-success"
                                >
                                  <span className="flaticon-wallet">
                                    {" "}
                                    &nbsp;اعمال
                                  </span>
                                </button>
                              </div>
                            </Card.Text>

                            {/* <div className="row mt-3  li-Space">

                                                                <button disabled={loadingAction} onClick={() => addOrder()} type="button" class="btn btn-primary ">  ثبت سفارش و بعدا پرداخت می کنم </button>

                                                            </div> */}
                            <div className="row mt-3 li-Space">
                              <button
                                disabled={loadingAction}
                                onClick={() => addOrderWithPay()}
                                type="button"
                                class="btn btn-danger "
                              >
                                {" "}
                                ثبت سفارش و پرداخت آنلاین{" "}
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>

                      <div className=" mt-2 mb-2">
                        <Card style={{ width: "100%" }}>
                          <Card.Body>
                            <Card.Text
                              style={{ textAlign: "", marginTop: "2%" }}
                            >
                              <div className="row font-weight-bold ">
                                <div className="col-1"></div>
                                <div className="col-11">
                                  <label className="ml-2"> نام:</label>
                                  <label className="">
                                    {userInfo?.firstName}
                                  </label>
                                </div>
                              </div>

                              <div className="row font-weight-bold ">
                                <div className="col-1"></div>

                                <div className="col-11">
                                  <label className="ml-2"> نام خانوادگی:</label>
                                  <label>{userInfo?.lastName}</label>
                                </div>
                              </div>

                              <div className="row font-weight-bold mt-1 ">
                                <div className="col-1"></div>
                                <div className="col-11">
                                  <label className="ml-2 "> کد پستی:</label>

                                  <label className="">
                                    {userInfo?.postCode}
                                  </label>
                                </div>
                              </div>

                              <div className="row font-weight-bold mt-1 ">
                                <div className="col-1"></div>
                                <div className="col-11">
                                  <label className="ml-2 ">
                                    {" "}
                                    آدرس محل تحویل:
                                  </label>
                                  <label className="">
                                    {userInfo?.deliveryAddress}
                                  </label>
                                </div>
                              </div>

                              <div className="row mt-3 ">
                                <div className="col-md-1 col-xs-1 col-sm-1"></div>
                                <div className="col-md-10 col-xs-10 col-sm-10 ">
                                  <button
                                    onClick={() => handleShowCustomerInfo()}
                                    type="button"
                                    class="btn btn-danger "
                                  >
                                    {" "}
                                    تکمیل اطلاعات کاربری و تغییر آدرس تحویل
                                  </button>
                                </div>
                                <div className="col-md-1 col-xs-1 col-sm-1 "></div>
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* {
                                    showCardOrder == true ?
                                        <div className="container mt-5">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <Card style={{ width: '100%' }}>
                                                        <Card.Body className="mx-auto">
                                                            <Card.Text >

                                                                <button onClick={() => listOrder()} className="btn btn-danger">
                                                                    لیست سفارشات من
                                                                </button>
                                                            </Card.Text>

                                                        </Card.Body>

                                                    </Card>                                    </div>
                                            </div>
                                        </div>

                                        : */}
              <div className="container mt-5">
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

              {/* } */}
            </>
          )}

          <form
            style={{ display: "none" }}
            id="formSubmit"
            name="input"
            action={`https://bpm.shaparak.ir/pgwchannel/startpay.mellat`}
            method="post"
            //target="_blank"
          >
            <input
              // ref={register({
              //     required: true,

              // })}
              className="form-control  main-filter-input font-weight-bold"
              type="text"
              id="RefId"
              name="RefId"
            />
            <input
              // ref={register({
              //     required: true,

              // })}
              className="form-control  main-filter-input font-weight-bold"
              type="text"
              id="MobileNo"
              name="MobileNo"
            />

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>

          <Modal size="md" show={show} onHide={handleClose} closeButton>
            <Modal.Header closeButton>
              <h5> حذف همه کالاها از سبد </h5>
            </Modal.Header>
            <Modal.Body>
              <p>همه کالاها را از سبد حذف می‌کنید؟</p>
              <Row style={{ direction: "ltr" }}>
                <Col lg={3}>
                  <button
                    type="button"
                    onClick={() => removeAllItem()}
                    class="btn btn-danger"
                  >
                    {" "}
                    حذف همه
                  </button>
                </Col>
                <Col lg={2}>
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    class="btn btn-secondary"
                  >
                    بازگشت
                  </button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            size="lg"
            show={showCustomerInfo}
            onHide={handleCloseCustomerInfo}
            closeButton
          >
            <Modal.Header closeButton>
              <h5> اطلاعات کاربری خود را تکمیل کنید </h5>
            </Modal.Header>
            <Modal.Body>
              <CustomerInformation close={handleCloseCustomerInfo} />
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={() => handleCloseCustomerInfo()}
                class="btn btn-secondary"
              >
                بازگشت
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state?.shoppingCard.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, index) => dispatch(removeItem(id, index)),
    addItem: (item) => dispatch(addItem(item)),
    clear: () => dispatch(clear()),
    //getAll: () => dispatch(getAll()),
    removeItemCount: (item) => dispatch(removeItemCount(item)),
    getCount: (id) => dispatch(getCount(id)),
  };
};

// export default connect(mapStateToProps)(Checkout);
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
