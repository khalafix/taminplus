import { getPagesSeourl, getPageBySeourl } from "lib/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingButton from "components/LoadingButton";
import { getCookie, getUrl, getUserid } from "helpers/Helpers";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Card, Col, Modal, Nav, Row, Alert } from "react-bootstrap";
import { ServerFileIdentifier } from "constants/configs";
import {
  removeItem,
  addItem,
  removeItemCount,
  getCount,
} from "redux/actions/shoppingCardActions";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { comboServices } from "services/base-Info/comboService";
import { userService } from "services/userService";
import Orders from "components/order/Orders";
import { productServices } from "services/catalog/productServices";
import { goldiranServices } from "services/gold-iran/goldiranService";
import Payments from "components/payment/Payments";

const Profile = (props) => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, reset, setError } = useForm();

  let [loading, setLoading] = useState(false);
  let [hasToken, setHasToken] = useState(false);
  const [provinces, setProvinces] = useState([]);
  let [provinceSelected, setProvinceSelected] = useState(0);
  let [showError, setShowError] = useState(false);
  let [defaultValueProvince, setDefaultValueProvince] = useState(0);
  const [changeStateProvince, setChangeStateProvince] = useState(false);
  const [defaultActiveKeyTab, setDefaultActiveKeyTab] = useState("userInfo");
  let [indexItem, setIndexItem] = useState([]);
  const [selectedBookMark, setSelectedBookMark] = useState(false);
  const [show, setShow] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [cityData, setCityData] = useState([]);

  let [defaultValueCity, setDefaultValueCity] = useState(0);
  const [changeStateCity, setChangeStateCity] = useState(false);
  let [citySelected, setCitySelected] = useState(0);

  const [regions, setRegions] = useState([]);
  const [regionSelected, setRegionSelected] = useState(0);
  const [changeStateRegion, setChangeStateRegion] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [parishSelected, setParishSelected] = useState(0);
  const [changeStateParish, setChangeStateParish] = useState(false);

  const [loadingGetData, setLoadingGetData] = useState(false);

  let loadingStyleButton = {
    width: "53px",
    borderRadius: "50%",
    padding: "0px",
    lineHeight: "0",
  };

  useEffect(() => {
    if (!getCookie("token")) {
      // router.push("/auth");
      router.push("/auth?redirectUrl=profile");
      setHasToken(false);
    } else {
      let title = window.location.pathname.replace("/profile", "");

      setDefaultActiveKeyTab(title ? title : "userInfo");
      setHasToken(true);

      (async () => {
        await getProvinceCombo();

        await getUserData();

        await getAllFavoriteProduct();
      })();
    }
  }, []);

  const getProvinceCombo = async () => {
    // let provinceData = await comboServices.getProvince();
    let provinceData = await goldiranServices.getProvince();
    setProvinces(provinceData.data);
  };

  const handleClose = () => setShow(false);
  const handleShow = (productId) => {
    setCurrentProductId(productId);
    setShow(true);
  };

  const ChangeProvinceWithParam = async (el, cityId) => {
    setProvinceSelected(el);
    setCityData([]);

    if (el && cityId) {
      // const result = await comboServices.getCities(el);
      const result = await goldiranServices.getCities(el);

      if (result.isSuccess) {
        setCityData(result.data);
        setChangeStateProvince(true);
        setDefaultValueCity(cityId);
        setCitySelected(cityId);
        setChangeStateCity(true);
      } else {
        toast.error(result.message);
      }
    } else {
    }
  };

  const ChangeRegionWithParam = async (cityId, el) => {
    setParishes([]);
    const result = await goldiranServices.getParishes(cityId, el, "");
    if (result.isSuccess) {
      setParishes(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const ChangeProvinceCombo = async (el) => {
    setProvinceSelected(el);
    setChangeStateCity(false);
    setCitySelected(0);
    setRegionSelected(0);
    setParishSelected(0);
    setCityData([]);
    setRegions([]);
    setParishes([]);

    const result = await goldiranServices.getCities(el);
    if (result.isSuccess) {
      setCityData(result.data);
      setChangeStateCity(false);
      setCitySelected(0);
      // setChangeStateCity(true)
    } else {
      toast.error(result.message);
    }
  };
  const ChangeCityWithParam = async (el) => {
    setCitySelected(el);
    setRegions([]);
    setParishes([]);
    setChangeStateCity(true);

    const result = await goldiranServices.getRegions(el);
    if (result.isSuccess) {
      setChangeStateRegion(true);

      setRegions(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const changeCity = async (el) => {
    setCitySelected(el);
    setRegions([]);
    setParishes([]);
    setChangeStateCity(true);
    setRegionSelected(0);
    setParishSelected(0);

    const result = await goldiranServices.getRegions(el);
    if (result.isSuccess) {
      setRegions(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const changeRegion = async (el) => {
    setRegionSelected(el);
    setParishes([]);
    setParishSelected(0);

    const result = await goldiranServices.getParishes(citySelected, el, "");
    if (result.isSuccess) {
      setParishes(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const changeParish = async (el) => {
    setParishSelected(el);
    setChangeStateParish(!changeStateParish);
  };

  const getUserData = async () => {
    setLoadingGetData(true);

    const result = await userService.getuserbyId();

    if (result.isSuccess == true) {
      if (result?.data) {
        // setChangeStateCity(false);

        await ChangeProvinceWithParam(
          result.data.goldIranProvinceId,
          result.data.goldIranCityId
        );

        setCitySelected(result.data.goldIranCityId);

        setDefaultValueCity(result.data.goldIranCityId);
        setDefaultValueProvince(result.data.goldIranProvinceId);
        setProvinceSelected(result.data.goldIranProvinceId);

        if (result.data.goldIranCityId) {
          await ChangeCityWithParam(result.data.goldIranCityId);
        }
        if (result.data.goldIranCityId && result.data.regionId) {
          setRegionSelected(result.data.regionId);
          await ChangeRegionWithParam(
            result.data.goldIranCityId,
            result.data.regionId
          );
        }

        if (result.data.parishId) {
          setChangeStateParish(true);
          await changeParish(result.data.parishId);
        }
        reset({ ...result.data });
      }
    }
    setLoadingGetData(false);
  };

  const getAllFavoriteProduct = async () => {
    setLoadingGetData(true);

    let result = await productServices.getAllFavoriteProduct();
    setFavoriteProducts(result.data);
    setLoadingGetData(false);
  };

  const MinesItemCount = (itemValue, index) => {
    props.removeItemCount(itemValue);
    // getItemCount(itemValue.id);
    // props?.getAll();
  };

  const onSubmitUserInfo = async (data) => {
    setLoading(true);

    if (provinceSelected == 0 || provinceSelected == null) {
      setShowError(true);
      setLoading(false);

      return false;
    }

    if (citySelected == 0 || citySelected == null) {
      setShowError(true);
      setLoading(false);

      return false;
    }

    if ((regionSelected == 0 || regionSelected == null) && regions.length > 0) {
      setShowError(true);
      setLoading(false);
      return false;
    }

    if (
      (parishSelected == 0 || parishSelected == null) &&
      parishes.length > 0
    ) {
      setShowError(true);
      setLoading(false);
      return false;
    }

    if (data.firstName == "") {
      setError("firstName", {
        type: "required",
        message: "نام الزامی می باشد",
      });
      setLoading(false);
      return false;
    }
    if (data.lastName == "") {
      setError("lastName", {
        type: "required",
        message: "نام خانوادگی الزامی می باشد",
      });
      setLoading(false);
      return false;
    }
    if (data.deliveryAddress == "") {
      setError("deliveryAddress", {
        type: "required",
        message: " آدرس محل تحویل الزامی می باشد",
      });
      setLoading(false);
      return false;
    }
    if (data.natinalCode == "") {
      setError("natinalCode", {
        type: "required",
        message: " کد ملی الزامی می باشد",
      });
      setLoading(false);
      return false;
    }

    data.goldIranProvinceId = provinceSelected;
    data.goldIranCityId = citySelected;
    data.parishId = parishSelected;
    data.regionId = regionSelected;
    // data.cityTitle = cityData.find(f=>f.value==citySelected).lable;
    // data.provinceTitle = provinces.find(f=>f.value==provinceSelected).lable;
    data.cityTitle =
      cityData.length > 0
        ? cityData?.find((f) => f.value == citySelected)?.lable
        : "";
    data.provinceTitle =
      provinces.length > 0
        ? provinces?.find((f) => f.value == provinceSelected)?.lable
        : "";
    data.parishTitle =
      parishes.length > 0
        ? parishes?.find((f) => f.value == parishSelected)?.lable
        : "";
    data.regionTitle =
      regions.length > 0
        ? regions?.find((f) => f.value == regionSelected)?.lable
        : "";

    let result = await userService.updateUser(data);
    if (result.isSuccess == true) {
      setLoading(false);
      toast.success(result.message);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  const addFavoriteProduct = async () => {
    let model = {};

    model.productId = currentProductId;
    model.isSelected = false;
    let result = await productServices.addFavoriteProduct(model);

    if (result.isSuccess == true) {
      handleClose();
      toast.success(result.message);
      await getAllFavoriteProduct();
    }
  };

  // const ChangeProvince = (e) => {
  //     setProvinceSelected(e);
  //     setChangeStateProvince(!changeStateProvince);
  // }

  const addProductToBasket = (data) => {
    setIndexItem([
      ...indexItem,
      {
        id: data.productId,
        enTitle: data.enTitle,
        productName: data.productName,
        price: data.price,
        discountedPrice: data.discountedPrice,
        coverFile: data.coverFile,
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        brandName: data.brandName,
        index: data.index,
        productFeatureValues: data.productFeatureValues,
      },
    ]);

    data.index = indexItem.length > 0 ? indexItem.length : 0;
    props.addItem(data);
    // toast.success('✔️ آیتم به سبد خرید شما اضافه شد');
  };

  return (
    <>
      <Head>
        <title>پروفایل</title>
        <meta name="description" content="پروفایل " />
      </Head>

      <section className="price-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-8 col-sm-12 mx-auto">
              {hasToken == true ? (
                <>
                  <Tabs
                    defaultActiveKey={defaultActiveKeyTab}
                    id="uncontrolled-tab-example"
                    className="mb-3 font-weight-bold"
                    fill
                  >
                    <Tab eventKey="userInfo" title={`  اطلاعات کاربری `}>
                      <div className="price-table mrb-30 text-center">
                        <div className="table-header">
                          <h3 className="pricing-plan-name">
                            {" "}
                            اطلاعات کاربری{" "}
                          </h3>
                        </div>

                        {loadingGetData ? (
                          <button
                            style={{
                              marginTop: "5%",
                              backgroundColo: "red",
                              ransition: "all 0.3s",
                              loadingStyleButton,
                            }}
                            className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block"
                          >
                            {
                              <div
                                class="lds-ring"
                                style={{ width: "40px", height: "23px" }}
                              >
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            }
                          </button>
                        ) : (
                          <div className="table-content">
                            <form onSubmit={handleSubmit(onSubmitUserInfo)}>
                              <div className="row font-weight-bold">
                                <div className="form-group col-md-4  ">
                                  <label className="fl-r" for="firstName">
                                    <span className="text-danger">*</span> نام
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                      validate: {
                                        firstName: (value) => {
                                          if (
                                            /^([^<>%\-@+$|='"0-9]*$)$/.test(
                                              value
                                            )
                                          ) {
                                            return true;
                                          } else {
                                            return false;
                                          }
                                        },
                                      },
                                    })}
                                    type="text"
                                    className="form-control main-filter-input  font-weight-bold"
                                    name="firstName"
                                    placeholder="نام"
                                  />
                                  {errors.firstName?.type === "firstName" && (
                                    <div className="form-text text-danger">
                                      {" "}
                                      فرمت نام صحیح نمی باشد
                                    </div>
                                  )}
                                  {errors.firstName?.type === "required" && (
                                    <div className="form-text text-danger">
                                      نام الزامی می باشد
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="fl-r" for="lastName">
                                    <span className="text-danger">*</span> نام
                                    خانوادگی
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                      validate: {
                                        lastName: (value) => {
                                          if (
                                            /^([^<>%\-@+$|='"0-9]*$)$/.test(
                                              value
                                            )
                                          ) {
                                            return true;
                                          } else {
                                            return false;
                                          }
                                        },
                                      },
                                    })}
                                    type="text"
                                    className="form-control  main-filter-input font-weight-bold"
                                    name="lastName"
                                    placeholder=" نام خانوادگی"
                                  />
                                  {errors.lastName?.type === "lastName" && (
                                    <div className="form-text text-danger">
                                      {" "}
                                      فرمت نام خانوادگی صحیح نمی باشد
                                    </div>
                                  )}
                                  {errors.lastName?.type === "required" && (
                                    <div className="form-text text-danger">
                                      نام خانوادگی الزامی می باشد
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-md-4  ">
                                  <label className="fl-r" for="natinalCode">
                                    <span className="text-danger">*</span> کد
                                    ملی
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                      // validate: {

                                      //     postCode : (value) => {
                                      //         if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                      //             return (true)
                                      //         }
                                      //         else {
                                      //             return false;
                                      //         }
                                      //     }
                                      // }
                                    })}
                                    maxLength={"10"}
                                    type="text"
                                    className="form-control main-filter-input  font-weight-bold"
                                    name="natinalCode"
                                    placeholder="کد ملی"
                                  />
                                  {/* {errors.natinalCode?.type === "natinalCode" && <div className="form-text text-danger"> فرمت کد ملی صحیح نمی باشد</div>} */}
                                  {errors.natinalCode?.type === "required" && (
                                    <div className="form-text text-danger">
                                      کد ملی الزامی می باشد
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-md-4">
                                  <label className="fl-r" for="email">
                                    {" "}
                                    ایمیل{" "}
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: false,
                                      email: (value) => {
                                        if (
                                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                            value
                                          )
                                        ) {
                                          return true;
                                        }
                                        return false;
                                      },
                                    })}
                                    type="email"
                                    className="form-control main-filter-input  font-weight-bold"
                                    name="email"
                                    placeholder="ایمیل"
                                  />
                                  {errors.email?.type === "email" && (
                                    <div className="form-text">
                                      فرمت ایمیل وارد شده صحیح نمی باشد.
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-md-4  ">
                                  <label className="fl-r" for="postCode">
                                    <span className="text-danger">*</span> کد
                                    پستی
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                      // validate: {

                                      //     postCode : (value) => {
                                      //         if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                      //             return (true)
                                      //         }
                                      //         else {
                                      //             return false;
                                      //         }
                                      //     }
                                      // }
                                    })}
                                    type="text"
                                    className="form-control main-filter-input  font-weight-bold"
                                    name="postCode"
                                    placeholder="کد پستی"
                                  />
                                  {errors.postCode?.type === "postCode" && (
                                    <div className="form-text text-danger">
                                      {" "}
                                      فرمت کد پستی صحیح نمی باشد
                                    </div>
                                  )}
                                  {errors.postCode?.type === "required" && (
                                    <div className="form-text text-danger">
                                      کد پستی الزامی می باشد
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-md-4">
                                  <label className="text-right" for="city">
                                    <span className="text-danger">*</span> استان
                                    محل سکونت
                                  </label>
                                  {changeStateProvince == false ? (
                                    <>
                                      <Select
                                        onChange={(e) =>
                                          ChangeProvinceCombo(e.value)
                                        }
                                        isSearchable
                                        placeholder="استان محل سکونت"
                                        className="course-select "
                                        css={{ height: "50%" }}
                                        isRtl
                                        options={provinces}
                                      />
                                      {showError == true &&
                                      (provinceSelected == 0 ||
                                        provinceSelected == null) ? (
                                        <div className="form-text text-danger">
                                          {" "}
                                          استان محل سکونت الزامی می باشد
                                        </div>
                                      ) : null}
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        value={provinces.find(
                                          (i) => i.value == defaultValueProvince
                                        )}
                                        onChange={(e) =>
                                          ChangeProvinceCombo(e.value)
                                        }
                                        isSearchable
                                        placeholder="استان محل سکونت"
                                        className="course-select "
                                        css={{ height: "50%" }}
                                        isRtl
                                        options={provinces}
                                      />
                                      {showError == true &&
                                      (provinceSelected == 0 ||
                                        provinceSelected == null) ? (
                                        <div className="form-text text-danger">
                                          {" "}
                                          استان محل سکونت الزامی می باشد
                                        </div>
                                      ) : null}
                                    </>
                                  )}
                                </div>
                                <div className="form-group col-md-4">
                                  {cityData.length > 0 ? (
                                    <>
                                      {changeStateCity == true &&
                                      citySelected ? (
                                        <>
                                          <label for="city">
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                            شهر سکونت
                                          </label>
                                          <Select
                                            value={cityData.find(
                                              (i) => i.value == defaultValueCity
                                            )}
                                            onChange={(e) =>
                                              changeCity(e.value)
                                            }
                                            isSearchable
                                            placeholder="شهر محل سکونت"
                                            className="course-select "
                                            css={{ height: "50%" }}
                                            isRtl
                                            options={cityData}
                                          />
                                          {showError == true &&
                                          (citySelected == 0 ||
                                            citySelected == null) ? (
                                            <div className="form-text text-danger">
                                              {" "}
                                              شهر محل سکونت الزامی می باشد
                                            </div>
                                          ) : null}
                                        </>
                                      ) : (
                                        <>
                                          <label for="city">
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                            شهر سکونت
                                          </label>
                                          <Select
                                            onChange={(e) =>
                                              changeCity(e.value)
                                            }
                                            isSearchable
                                            placeholder="شهر محل سکونت"
                                            className="course-select "
                                            css={{ height: "50%" }}
                                            isRtl
                                            options={cityData}
                                          />
                                          {showError == true &&
                                          (citySelected == 0 ||
                                            citySelected == null) ? (
                                            <div className="form-text text-danger">
                                              {" "}
                                              شهر محل سکونت الزامی می باشد
                                            </div>
                                          ) : null}
                                        </>
                                      )}
                                    </>
                                  ) : null}
                                </div>

                                <div className="form-group col-md-4">
                                  {regions.length > 0 ? (
                                    changeStateRegion == true &&
                                    regionSelected ? (
                                      <>
                                        <label for="city">
                                          <span className="text-danger">*</span>{" "}
                                          منطقه
                                        </label>

                                        <Select
                                          value={regions.find(
                                            (i) => i.value == regionSelected
                                          )}
                                          onChange={(e) =>
                                            changeRegion(e.value)
                                          }
                                          isSearchable
                                          placeholder="منطقه"
                                          className="course-select "
                                          css={{ height: "50%" }}
                                          isRtl
                                          options={regions}
                                        />
                                        {showError == true &&
                                        (regionSelected == 0 ||
                                          regionSelected == null) ? (
                                          <div className="form-text text-danger">
                                            {" "}
                                            منطقه الزامی می باشد
                                          </div>
                                        ) : null}
                                      </>
                                    ) : (
                                      <>
                                        <label for="city">
                                          <span className="text-danger">*</span>{" "}
                                          منطقه
                                        </label>
                                        <Select
                                          onChange={(e) =>
                                            changeRegion(e.value)
                                          }
                                          isSearchable
                                          placeholder="منطقه"
                                          className="course-select "
                                          css={{ height: "50%" }}
                                          isRtl
                                          options={regions}
                                        />
                                        {showError == true &&
                                        (regionSelected == 0 ||
                                          regionSelected == null) ? (
                                          <div className="form-text text-danger">
                                            {" "}
                                            منطقه الزامی می باشد
                                          </div>
                                        ) : null}
                                      </>
                                    )
                                  ) : null}
                                </div>

                                <div className="form-group col-md-4">
                                  {parishes.length > 0 ? (
                                    changeStateParish == false ? (
                                      <>
                                        <label for="parish">
                                          <span className="text-danger">*</span>{" "}
                                          محله
                                        </label>
                                        <Select
                                          onChange={(e) =>
                                            changeParish(e.value)
                                          }
                                          isSearchable
                                          placeholder="محله"
                                          className="course-select "
                                          css={{ height: "50%" }}
                                          isRtl
                                          options={parishes}
                                        />
                                        {showError == true &&
                                        (parishSelected == 0 ||
                                          parishSelected == null) ? (
                                          <div className="form-text text-danger">
                                            {" "}
                                            محله الزامی می باشد
                                          </div>
                                        ) : null}
                                      </>
                                    ) : (
                                      <>
                                        <label for="parish">
                                          <span className="text-danger">*</span>{" "}
                                          محله
                                        </label>
                                        <Select
                                          value={parishes.find(
                                            (i) => i.value == parishSelected
                                          )}
                                          onChange={(e) =>
                                            changeParish(e.value)
                                          }
                                          isSearchable
                                          placeholder="محله"
                                          className="course-select "
                                          css={{ height: "50%" }}
                                          isRtl
                                          options={parishes}
                                        />
                                        {showError == true &&
                                        (parishSelected == 0 ||
                                          parishSelected == null) ? (
                                          <div className="form-text text-danger">
                                            {" "}
                                            محله الزامی می باشد
                                          </div>
                                        ) : null}
                                      </>
                                    )
                                  ) : null}
                                </div>

                                <div className="form-group col-md-12">
                                  <label className="fl-r" for="address">
                                    <span className="text-danger">*</span> آدرس
                                    محل سکونت
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                    })}
                                    type="text"
                                    className="form-control input-sm  font-weight-bold"
                                    name="address"
                                    placeholder="  آدرس محل سکونت"
                                  />
                                  {errors.address?.type === "required" && (
                                    <div className="form-text text-danger">
                                      {" "}
                                      آدرس محل سکونت الزامی می باشد
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-md-12">
                                  <label className="fl-r" for="deliveryAddress">
                                    <span className="text-danger">*</span> آدرس
                                    محل تحویل
                                  </label>
                                  <input
                                    style={{ fontFamily: "SDF" }}
                                    ref={register({
                                      required: true,
                                    })}
                                    type="text"
                                    className="form-control input-sm  font-weight-bold"
                                    name="deliveryAddress"
                                    placeholder="  آدرس محل تحویل"
                                  />
                                  {errors.deliveryAddress?.type ===
                                    "required" && (
                                    <div className="form-text text-danger">
                                      {" "}
                                      آدرس محل تحویل الزامی می باشد
                                    </div>
                                  )}
                                </div>
                              </div>
                              <br />
                              <LoadingButton loading={loading} text="ذخیره" />
                              {/* <div className="d-flex justify-content-between">
                                                                                     <div>
                                                                                         <label onClick={() => props.setActiveTab(2)}>
                                                                                             ثبت نام
                                                                                         </label>
                                                                                     </div>
                                                                                     <div>
                                                                                         <label onClick={() => props.setActiveTab(3)}>
                                                                                             رمز عبور خود را فراموش کردم.
                                                                                         </label>
                                                                                     </div>
                     
                                                                                 </div> */}
                            </form>
                          </div>
                        )}
                      </div>
                    </Tab>

                    <Tab eventKey="orders" title={`  سفارش های من`}>
                      <div>
                        <Orders />
                      </div>
                    </Tab>

                    <Tab eventKey="payments" title={` پرداخت های من`}>
                      <div>
                        <Payments />
                      </div>
                    </Tab>

                    <Tab
                      eventKey="favoriteProducts"
                      title={`  لیست علاقه مندی ها `}
                    >
                      <div style={{ height: "auto" }}>
                        <div className="table-content">
                          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
                            {loadingGetData ? (
                              <button
                                style={{
                                  backgroundColo: "red",
                                  ransition: "all 0.3s",
                                  loadingStyleButton,
                                }}
                                className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block"
                              >
                                {
                                  <div
                                    class="lds-ring"
                                    style={{ width: "40px", height: "23px" }}
                                  >
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                }
                              </button>
                            ) : favoriteProducts.length > 0 ? (
                              <Card.Body>
                                {/* { props?.items.map(q => { */}
                                {favoriteProducts?.map((q) => {
                                  return (
                                    // <li>
                                    //     <label>✔️ {q.productName}</label>
                                    //     <label>{q.price ? q.price.toLocaleString() :  q.discountedPrice.toLocaleString()}<small className="mr-2">ریال</small></label>
                                    // </li>
                                    <>
                                      {/* <Col md={12}> */}
                                      <>
                                        <Link
                                          href={`/product/${getUrl(
                                            q.enTitle
                                              ? q.enTitle
                                              : q.productName
                                          )}`}
                                        >
                                          <li
                                            className="shopping-card-product-item  "
                                            style={{ direction: "ltr" }}
                                          >
                                            <div className="shopping-card-list-item-pic w-25 ">
                                              <Link
                                                href={`/product/${getUrl(
                                                  q.enTitle
                                                    ? q.enTitle
                                                    : q.productName
                                                )}`}
                                              >
                                                <a href="">
                                                  <img
                                                    className="w-50"
                                                    src={`${ServerFileIdentifier()}${
                                                      q.coverFile
                                                    }`}
                                                  />
                                                </a>
                                              </Link>
                                            </div>
                                            <div className="shopping-card-list-item-infos-favorit text-dark  w-75">
                                              {q.brandName} - {q.productName}
                                            </div>

                                            {/* <div className="shopping-card-list-item-infos text-dark">
        {q.brandName}
    </div> */}

                                            {/* <div className="shopping-card-list-item-price text-dark ">
                                                                                            <span className="font-weight-light">ریال</span> &nbsp;
                                                                                            {
                                                                                                q.discountedPrice ?
                                                                                                    <>
                                                                                                        <span className="text-muted mr-2" ><strike> {(q.price).toLocaleString()}  </strike>  </span> {q.discountedPrice.toLocaleString()}
                                                                                                    </> : <> <span className="text-muted mr-5" ></span>{(q.price).toLocaleString()}</>
                                                                                            }
                                                                                        </div> */}

                                            {/* <div className="shopping-card-list-item-price text-dark  w-25">
                                                                                            {
                                                                                                getCount(q.id).payload && getCount(q.id).payload <= 1 ?
                                                                                                    <div  >

                                                                                                        <div class="input-group mb-3">
                                                                                                            <span class="input-group-text font-weight-bold flaticon-add text-danger" onClick={() => addProductToBasket(q)}></span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    :
                                                                                                    <div  >
                                                                                                        <div class="input-group mb-3">
                                                                                                            <span class="input-group-text font-weight-bold flaticon-add text-danger" onClick={() => addProductToBasket(q)}></span>
                                                                                                            <input value={getCount(q.id).payload} type="text" class="input-group-form-control  input-styles-item text-center " disabled />
                                                                                                            <span class="input-group-text font-weight-bold flaticon-remove text-danger" onClick={() => MinesItemCount(q)}></span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                            }
                                                                                        </div> */}

                                            <div className="shopping-card-list-item-actions">
                                              <span
                                                className=""
                                                onClick={() =>
                                                  handleShow(q.productId, false)
                                                }
                                              >
                                                X
                                              </span>
                                            </div>
                                          </li>
                                        </Link>
                                        {/* </Col> */}
                                      </>
                                    </>
                                  );
                                })}
                              </Card.Body>
                            ) : (
                              <Alert variant={"danger"}>
                                ! محصولی ثبت نشده است
                              </Alert>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <Modal
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"

          show={show}
          onHide={handleClose}
        >
          <Modal.Body>
            {
              <h6 className="font-weight-bold">
                آیا می خواهید این محصول را از لیست علاقه مندی ها حذف کنید ؟
              </h6>
            }
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => handleClose()}
              class="btn btn-secondary ml-2"
            >
              بازگشت
            </button>

            <button
              type="button"
              onClick={() => addFavoriteProduct()}
              class={"btn btn-danger"}
            >
              {" "}
              {"حذف"}{" "}
            </button>
          </Modal.Footer>
        </Modal>
      </section>
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
    removeItemCount: (item) => dispatch(removeItemCount(item)),
    getCount: (id) => dispatch(getCount(id)),
    // addItem: (item) => dispatch(addItem(item, true))
  };
};

// export default connect(mapStateToProps)(Checkout);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
