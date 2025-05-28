import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "components/LoadingButton";
import Select from 'react-select';
import { comboServices } from 'services/base-Info/comboService';
import { userService } from "services/userService";
import { goldiranServices } from 'services/gold-iran/goldiranService';
const CustomerInformation = ({ close }) => {
    const { register, handleSubmit, watch, errors, reset, getValues, setError } = useForm();

    const [loading, setLoading] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(0);
    const [showError, setShowError] = useState(false);
    const [defaultValueProvince, setDefaultValueProvince] = useState(0);
    const [changeStateProvince, setChangeStateProvince] = useState(false);
    const [defaultActiveKeyTab, setDefaultActiveKeyTab] = useState("userInfo");
    const [indexItem, setIndexItem] = useState([]);
    const [selectedBookMark, setSelectedBookMark] = useState(false);
    const [show, setShow] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [currentProductId, setCurrentProductId] = useState(0);
    const [cityData, setCityData] = useState([]);

    const [defaultValueCity, setDefaultValueCity] = useState(0);
    const [changeStateCity, setChangeStateCity] = useState(false);
    const [citySelected, setCitySelected] = useState(0);

    const [regions, setRegions] = useState([]);
    const [regionSelected, setRegionSelected] = useState(0);
    const [changeStateRegion, setChangeStateRegion] = useState(false);

    const [parishes, setParishes] = useState([]);
    const [parishSelected, setParishSelected] = useState(0);
    const [changeStateParish, setChangeStateParish] = useState(false);

    const [isPaidOrder, setIsPaidOrder] = useState(false);

    const [loadingGetData, setLoadingGetData] = useState(false);




    useEffect(() => {

        (async () => {


            await getUserData();


        })()




    }, []);

    const getProvinceCombo = async () => {
        setLoadingGetData(true)

        // let provinceData = await comboServices.getProvince();
        let provinceData = await goldiranServices.getProvince();

        setProvinces(provinceData.data)
        setLoadingGetData(false)

    }


    const handleClose = () => setShow(false);
    const handleShow = (productId) => {
        setCurrentProductId(productId);
        setShow(true)
    };




    const ChangeProvinceWithParam = async (el, cityId) => {
        setProvinceSelected(el);
        setCityData([])


        if (el && cityId) {
            // const result = await comboServices.getCities(el);
            const result = await goldiranServices.getCities(el);

            if (result.isSuccess) {
                setCityData(result.data);
                setChangeStateProvince(true);
                setDefaultValueCity(cityId);
                setCitySelected(cityId)
                setChangeStateCity(true)


            }
            else {
                toast.error(result.message)
            }
        }
        else {

        }

    };

    const ChangeRegionWithParam = async (cityId, el) => {
        setParishes([])
        const result = await goldiranServices.getParishes(cityId, el, "");
        if (result.isSuccess) {
            setParishes(result.data);
        }
        else {
            toast.error(result.message)
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
        }
        else {
            toast.error(result.message)
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
        }
        else {
            toast.error(result.message)
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
        }
        else {
            toast.error(result.message)
        }
    };

    const changeRegion = async (el) => {
        setRegionSelected(el);
        setParishes([])
        setParishSelected(0);

        const result = await goldiranServices.getParishes(citySelected, el, "");
        if (result.isSuccess) {

            setParishes(result.data);
        }
        else {
            toast.error(result.message)
        }
    };

    const changeParish = async (el) => {
        setParishSelected(el);
        setChangeStateParish(!changeStateParish);

    };




    const getUserData = async () => {
        setLoadingGetData(true)
        await getProvinceCombo();


        const result = await userService.getuserbyId();

        if (result.isSuccess == true) {

            if (result?.data) {
                // setChangeStateCity(false);

                await ChangeProvinceWithParam(result.data.goldIranProvinceId, result.data.goldIranCityId);

                setCitySelected(result.data.goldIranCityId)

                setDefaultValueCity(result.data.goldIranCityId);
                setDefaultValueProvince(result.data.goldIranProvinceId);
                setProvinceSelected(result.data.goldIranProvinceId);


                if (result.data.goldIranCityId) {
                    await ChangeCityWithParam(result.data.goldIranCityId);
                }
                if (result.data.goldIranCityId && result.data.regionId) {
                    setRegionSelected(result.data.regionId)
                    await ChangeRegionWithParam(result.data.goldIranCityId, result.data.regionId);
                }

                if (result.data.parishId) {
                    setChangeStateParish(true)
                    await changeParish(result.data.parishId)
                }
                reset({ ...result.data });
                setLoadingGetData(false)

            }
            setLoadingGetData(false)

        }
        setLoadingGetData(false)

    }




    const MinesItemCount = (itemValue, index) => {

        props.removeItemCount(itemValue);
        // getItemCount(itemValue.id);
        // props?.getAll();
    }

    const AddPayment = async () => {
        let model = {};
        model = getValues();
        model.isPaied = true;

        setIsPaidOrder(true);
        onSubmitUserInfo(model)
    }

    const onSubmitUserInfo = async (data) => {
        setLoading(true);
        data.isPaied = data.isPaied ? data.isPaied : false;
        

        if (data.firstName == "") {
            setError('firstName', { type: 'required', message: 'نام الزامی می باشد' });
            setLoading(false);
            return false;
        }
        if (data.lastName == "") {
            setError('lastName', { type: 'required', message: 'نام خانوادگی الزامی می باشد' });
            setLoading(false);
            return false;
        }
        if (data.deliveryAddress == "") {
            setError('deliveryAddress', { type: 'required', message: ' آدرس محل تحویل الزامی می باشد' });
            setLoading(false);
            return false;
        }
        if (data.natinalCode == "") {
            setError('natinalCode', { type: 'required', message: ' کد ملی الزامی می باشد' });
            setLoading(false);
            return false;
        }

        if (provinceSelected == 0 || provinceSelected == null) {
            setShowError(true)
            setLoading(false);

            return false;
        }

        if (citySelected == 0 || citySelected == null) {
            setShowError(true)
            setLoading(false);

            return false;
        }

        if ((regionSelected == 0 || regionSelected == null) && regions.length > 0) {
            setShowError(true)
            setLoading(false);
            return false;
        }

        if ((parishSelected == 0 || parishSelected == null) && parishes.length > 0) {
            setShowError(true)
            setLoading(false);
            return false;
        }

        data.goldIranProvinceId = provinceSelected;
        data.goldIranCityId = citySelected;
        data.parishId = parishSelected;
        data.regionId = regionSelected;

        data.cityTitle = cityData.length > 0 ? cityData?.find(f => f.value == citySelected)?.lable : "";
        data.provinceTitle = provinces.length > 0 ? provinces?.find(f => f.value == provinceSelected)?.lable : "";
        data.parishTitle = parishes.length > 0 ? parishes?.find(f => f.value == parishSelected)?.lable : "";
        data.regionTitle = regions.length > 0 ? regions?.find(f => f.value == regionSelected)?.lable : "";




        let result = await userService.updateUser(data);
        if (result.isSuccess == true) {
            setLoading(false);
            // callAddOrder(data);
            toast.success(result.message);
            close();
        }
        else {
            setLoading(false);
            toast.error(result.message)
        }




    }

    var loadingStyleButton = {
        width: "53px",
        borderRadius: "50%",
        padding: "0px",
        lineHeight: "0",
    }


    return (
        <div>
            <div className="price-table  text-center">
                {/* <div className="table-header">
                    <h3 className="pricing-plan-name"> اطلاعات کاربری </h3>
                </div> */}
                <div className="table-content">
                    {
                        loadingGetData ?

                            <button style={{ backgroundColo: 'red', ransition: "all 0.3s", loadingStyleButton }} className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block">
                                {<div class="lds-ring" style={{ width: "40px", height: "23px" }}><div></div><div></div><div></div><div></div></div>}
                            </button>
                            :
                            <form onSubmit={handleSubmit(onSubmitUserInfo)}>
                                <div className="row font-weight-bold" >

                                    <div className="form-group col-md-4  ">
                                        <label className="fl-r" for="firstName"><span className="text-danger">*</span> نام</label>
                                        <input style={{ fontFamily: "SDF" }} ref={register({
                                            required: true,
                                            validate: {

                                                firstName: (value) => {
                                                    if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                                        return (true)
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                }
                                            }
                                        })} type="text" className="form-control main-filter-input  font-weight-bold" name="firstName" placeholder="نام" />
                                        {errors.firstName?.type === "firstName" && <div className="form-text text-danger"> فرمت نام صحیح نمی باشد</div>}
                                        {errors.firstName?.type === "required" && <div className="form-text text-danger">نام الزامی می باشد</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="fl-r" for="lastName"><span className="text-danger">*</span> نام خانوادگی</label>
                                        <input style={{ fontFamily: "SDF" }} ref={register({
                                            required: true,
                                            validate: {

                                                lastName: (value) => {
                                                    if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                                        return (true)
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                }
                                            }
                                        })} type="text" className="form-control  main-filter-input font-weight-bold" name="lastName" placeholder=" نام خانوادگی" />
                                        {errors.lastName?.type === "lastName" && <div className="form-text text-danger"> فرمت نام خانوادگی صحیح نمی باشد</div>}
                                        {errors.lastName?.type === "required" && <div className="form-text text-danger">نام خانوادگی الزامی می باشد</div>}
                                    </div>

                                    <div className="form-group col-md-4  ">
                                        <label className="fl-r" for="natinalCode"><span className="text-danger">*</span> کد ملی</label>
                                        <input style={{ fontFamily: "SDF" }} ref={register({
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
                                        })} maxLength={"10"} type="text" className="form-control main-filter-input  font-weight-bold" name="natinalCode" placeholder="کد ملی" />
                                        {/* {errors.natinalCode?.type === "natinalCode" && <div className="form-text text-danger"> فرمت کد ملی صحیح نمی باشد</div>} */}
                                        {errors.natinalCode?.type === "required" && <div className="form-text text-danger">کد ملی الزامی می باشد</div>}
                                    </div>

                                    <div className="form-group col-md-4  ">
                                        <label className="fl-r" for="postCode"><span className="text-danger">*</span> کد پستی</label>
                                        <input style={{ fontFamily: "SDF" }} ref={register({
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
                                        })} type="text" className="form-control main-filter-input  font-weight-bold" name="postCode" placeholder="کد پستی" />
                                        {errors.postCode?.type === "postCode" && <div className="form-text text-danger"> فرمت کد پستی صحیح نمی باشد</div>}
                                        {errors.postCode?.type === "required" && <div className="form-text text-danger">کد پستی الزامی می باشد</div>}
                                    </div>



                                    <div className="form-group col-md-4">
                                        <label for="Province"><span className="text-danger">*</span>  استان محل سکونت</label>
                                        {
                                            changeStateProvince == false ?
                                                <>
                                                    <Select onChange={e => ChangeProvinceCombo(e.value)} isSearchable placeholder="استان محل سکونت" className="course-select " css={{ height: "50%" }} isRtl options={provinces} />
                                                    {showError == true && (provinceSelected == 0 || provinceSelected == null) ? <div className="form-text text-danger"> استان محل سکونت الزامی می باشد</div> : null}
                                                </>

                                                :
                                                <>
                                                    <Select value={provinces.find(i => i.value == defaultValueProvince)} onChange={e => ChangeProvinceCombo(e.value)} isSearchable placeholder="استان محل سکونت" className="course-select " css={{ height: "50%" }} isRtl options={provinces} />
                                                    {showError == true && (provinceSelected == 0 || provinceSelected == null) ? <div className="form-text text-danger"> استان محل سکونت الزامی می باشد</div> : null}
                                                </>

                                        }

                                    </div>
                                    <div className="form-group col-md-4">

                                        {
                                            cityData.length > 0 ?
                                                <>
                                                    {

                                                        changeStateCity == true && citySelected ?
                                                            <>
                                                                <label for="city"><span className="text-danger">*</span>  شهر سکونت</label>
                                                                <Select value={cityData.find(i => i.value == defaultValueCity)} onChange={e => changeCity(e.value)} isSearchable placeholder="شهر محل سکونت" className="course-select " css={{ height: "50%" }} isRtl options={cityData} />
                                                                {showError == true && (citySelected == 0 || citySelected == null) ? <div className="form-text text-danger"> شهر محل سکونت الزامی می باشد</div> : null}

                                                            </>

                                                            :
                                                            <>
                                                                <label for="city"><span className="text-danger">*</span>  شهر سکونت</label>
                                                                <Select onChange={e => changeCity(e.value)} isSearchable placeholder="شهر محل سکونت" className="course-select " css={{ height: "50%" }} isRtl options={cityData} />
                                                                {showError == true && (citySelected == 0 || citySelected == null) ? <div className="form-text text-danger"> شهر محل سکونت الزامی می باشد</div> : null}
                                                            </>
                                                    }
                                                </> : null

                                        }



                                    </div>

                                    <div className="form-group col-md-4">

                                        {regions.length > 0 ?

                                            changeStateRegion == true && regionSelected ?
                                                <>
                                                    <label for="city"><span className="text-danger">*</span>  منطقه</label>


                                                    <Select value={regions.find(i => i.value == regionSelected)} onChange={e => changeRegion(e.value)} isSearchable placeholder="منطقه" className="course-select " css={{ height: "50%" }} isRtl options={regions} />
                                                    {showError == true && (regionSelected == 0 || regionSelected == null) ? <div className="form-text text-danger"> منطقه الزامی می باشد</div> : null}

                                                </>

                                                :
                                                <>
                                                    <label for="city"><span className="text-danger">*</span>  منطقه</label>
                                                    <Select onChange={e => changeRegion(e.value)} isSearchable placeholder="منطقه" className="course-select " css={{ height: "50%" }} isRtl options={regions} />
                                                    {showError == true && (regionSelected == 0 || regionSelected == null) ? <div className="form-text text-danger"> منطقه الزامی می باشد</div> : null}


                                                </> : null
                                        }
                                    </div>


                                    <div className="form-group col-md-4">

                                        {parishes.length > 0 ?
                                            changeStateParish == false ?
                                                <>
                                                    <label for="parish"><span className="text-danger">*</span>  محله</label>
                                                    <Select onChange={e => changeParish(e.value)} isSearchable placeholder="محله" className="course-select " css={{ height: "50%" }} isRtl options={parishes} />
                                                    {showError == true && (parishSelected == 0 || parishSelected == null) ? <div className="form-text text-danger"> محله الزامی می باشد</div> : null}
                                                </>

                                                :
                                                <>
                                                    <label for="parish"><span className="text-danger">*</span>  محله</label>
                                                    <Select value={parishes.find(i => i.value == parishSelected)} onChange={e => changeParish(e.value)} isSearchable placeholder="محله" className="course-select " css={{ height: "50%" }} isRtl options={parishes} />
                                                    {showError == true && (parishSelected == 0 || parishSelected == null) ? <div className="form-text text-danger"> محله الزامی می باشد</div> : null}
                                                </>
                                            : null
                                        }
                                    </div>




                                    <div className="form-group col-md-12">
                                        <label className="fl-r" for="deliveryAddress"><span className="text-danger">*</span>   آدرس محل تحویل</label>
                                        <input style={{ fontFamily: "SDF" }} ref={register({
                                            required: true,

                                        })} type="text" className="form-control input-sm  font-weight-bold" name="deliveryAddress" placeholder="  آدرس محل تحویل" />
                                        {errors.deliveryAddress?.type === "required" && <div className="form-text text-danger"> آدرس محل تحویل الزامی می باشد</div>}
                                    </div>
                                </div>
                                <LoadingButton loading={loading} text=" ثبت و ذخیره" />

                            </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default CustomerInformation
