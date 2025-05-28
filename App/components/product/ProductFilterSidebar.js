import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { ServerFileIdentifier } from "constants/configs";
import { Button, Card, Col, FormCheck, ListGroup, InputGroup } from 'react-bootstrap';
import SliderRange from "components/SliderRange";
import Collapse from 'react-bootstrap/Collapse';

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { comboServices } from 'services/base-Info/comboService';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import LoadingButton from 'components/LoadingButton';
import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { isMobile } from 'react-device-detect';

var moment = require('jalali-moment');

const FilterSidebar = ({ props }) => {
    const [mobileDevice, setMobileDevice] = useState(false);

    const router = useRouter();
    const [openCollapse, setOpenCollapse] = useState(false);
    const [openCollapseBrand, setOpenCollapseBrand] = useState(false);
    const [openCollapseCategory, setOpenCollapseCategory] = useState([]);
    const [openCollapseFeature, setOpenCollapseFeature] = useState(false);

    const [brands, setBrands] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [changeCategory, setChangeCategory] = useState(true);
    const [selectedBrands, setSelectedBrands] = useState(0);
    const [selectedChangeCategory, setSelectedChangeCategory] = useState(0);
    const [filterModel, setFilterModel] = useState({});
    const [hasInventory, setHasInventory] = useState(false);
    const [topSale, setTopSale] = useState(false);
    const [topVisited, setTopVisited] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [selectedBrandItems, setSelectedBrandItems] = useState([]);
    const [selectedBrandTitleItems, setSelectedBrandTitleItems] = useState("");
    const [changeBrandTitleInput, setChangeBrandTitleInput] = useState("");
    const [tempBrandItems, setTempBrandItems] = useState([]);
    const [productCategoriesData, setProductCategoriesData] = useState([]);
    const [allProductCategoriesData, setAllProductCategoriesData] = useState([]);
    const [changeHandler, setChangeHandler] = useState([]);
    const [featureHasValue, setFeatureHasValue] = useState([]);
    const [featureHasValueList, setFeatureHasValueList] = useState([]);
    const [changeOptions, setChangeOptions] = useState([]);
    let [loading, setLoading] = useState(false);
    const [tempSelectedBrandItems, setTempSelectedBrandItems] = useState([]);

    const { register, handleSubmit, watch, errors, reset } = useForm();

    useEffect(() => {
        setMobileDevice(isMobile)
        setSelectedBrandTitleItems("")
        if (props?.featuresValues) {
            setOpenCollapseFeature(true);
            let tempfeaturesValues = [];
            let tempfeaturesValuesOptions = [];

            let featuresValuesItems = props?.featuresValues.split(",");
            let featuresTitleItems = props?.featuresTitles.split(",");
            let featuresIdsItems = props?.featuresIds.split(",");

            for (let index = 0; index < featuresValuesItems.length; index++) {
                const element = featuresValuesItems[index];
                tempfeaturesValues.push({ value: element, title: featuresTitleItems[index], featureId: featuresIdsItems[index] });
                tempfeaturesValuesOptions.push({ value: element, title: featuresTitleItems[index], featureId: featuresIdsItems[index], selected: true });
            }

            setFeatureHasValueList(tempfeaturesValues);
            setChangeOptions(tempfeaturesValuesOptions);
        }
        if (props?.productCategoryId) {
            setChangeCategory(true);
            setOpenCollapse(true);

            let e;
            setSelectedChangeCategory(parseInt(props?.productCategoryId))
            ClickParentCategory(parseInt(props?.productCategoryId), true, e);
        }
        if (props?.brandId) {
            setOpenCollapseBrand(true);
            let brandTitleTemp = [];
            let tempBrandId = [...tempSelectedBrandItems];
            let tempBrandIdSelected = [...selectedBrandItems];

            for (let index = 0; index < props?.brandId.split(",").length; index++) {
                const element = props?.brandId.split(",")[index];
                let brandTitle = tempBrandItems.find(i => i.value == element)?.label;
                brandTitleTemp.push(brandTitle);
                tempBrandIdSelected.push({ value: parseInt(element), selected: true });
            }

            setSelectedBrandTitleItems(brandTitleTemp.toString());
            tempBrandId = tempBrandId.concat(props.brandId.split(","));
            tempBrandId = getListWithoutDuplicates(selectedBrandItems.filter(f => f.selected == true).map(m => m.value)).length > 0 ? getListWithoutDuplicates(selectedBrandItems.filter(f => f.selected == true).map(m => m.value)) : getListWithoutDuplicates(tempBrandId);
            setTempSelectedBrandItems(tempBrandId);
            setSelectedBrandItems(getUniqueListBy(tempBrandIdSelected.filter(f => f.selected == true), 'value'));
        }
        if (props?.hasInventory) {
            setHasInventory(true);
        }
        else {
            setHasInventory(false);
        }


        (async () => {
            await getProductCategoriesData();
            await getBrandsData();
            let productCategoryData = await comboServices.getProductCategory();
            setProductCategory(productCategoryData);
        })()

    }, [props]);

    const getBrandsData = async () => {
        setBrands([]);
        setTempBrandItems([]);
        // setSelectedBrandItems([]);
        let brandsData = await comboServices.getBrands();
        setBrands(brandsData);
        setTempBrandItems(brandsData);
    };

    const getProductCategoriesData = async () => {
        const result = await productCategoryServices.getCategoriesForMegaMenu();
        setProductCategoriesData(result.data)
    };

    const getUniqueListBy = (arr, key) => {
        let templist = [...new Map(arr.map(item => [item[key], item])).values()];
        return templist
    }
    const dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    const onSubmit = async (data) => {
        setLoading(true);
        let model = {};

        model.BrandId = selectedBrandItems.filter(f => f.selected == true).length == 0 ? props.brandId : getListWithoutDuplicates(selectedBrandItems.filter(f => f.selected == true).map(m => m.value));
        model.BrandId = model.BrandId?.toString();
        model.ProductCategoryId = selectedChangeCategory == 0 ? props.productCategoryId : selectedChangeCategory;
        model.HasInventory = hasInventory;
        // model.TopSale = topSale;
        // model.TopVisited = topVisited;
        // model.IsNew = isNew;
        model.Title = data.title == null ? props.title : data.title != props.title ? data.title : props.title;
        setSelectedChangeCategory(0)
        setSelectedChangeCategory(model.ProductCategoryId)


        let list = [];
        // let obj = JSON.parse(data);
        for (var key in data) {

            if (data.hasOwnProperty(key)) {

                if (key.includes("featureHasValue") && data[key]) {
                    
                    let featureId = key.substring(key.lastIndexOf("-") + 1, key.length);
                    let id = key.substring(0, key.indexOf('-'));
                    list.push({
                        id: parseInt(id),
                        featureId: parseInt(featureId),
                        value: featureHasValue?.find(f => f.featureId == featureId)?.value ? featureHasValue?.find(f => f.featureId == featureId)?.value : false,
                        title: "switch",
                        controlType: 103,
                    });
                }

                if (key.includes("featureFrom") && data[key]) {
                    let featureId = key.substring(key.lastIndexOf("-") + 1, key.length);
                    let id = key.substring(0, key.indexOf('-'));
                    list.push({
                        id: parseInt(id),
                        featureId: parseInt(featureId),
                        value: data[key],
                        title: "featureFrom",
                        controlType: 102,
                    });
                }

                if (key.includes("featureTo") && data[key]) {
                    let featureId = key.substring(key.lastIndexOf("-") + 1, key.length);
                    let id = key.substring(0, key.indexOf('-'));

                    list.push({
                        id: parseInt(id),
                        featureId: parseInt(featureId),
                        value: data[key],
                        title: "featureTo",
                        controlType: 102,
                    });
                }

                if (key.includes("productFeatureValues") && data[key]) {
                    let featureId = key.substring(key.lastIndexOf("-") + 1, key.length);

                    let id = key.substring(0, key.indexOf('-'));

                    list.push({
                        id: parseInt(id),
                        featureId: parseInt(featureId),
                        value: data[key],
                        title: "text",
                        controlType: 101,
                    });
                }

            }
        }


        if (changeHandler.length > 0) {
            for (let index = 0; index < changeHandler.length; index++) {
                const element = changeHandler[index];
                list.push({
                    featureId: element.featureId,
                    id: element.id,
                    value: element.value,
                    title: "tag",
                    controlType: 104,
                });
            }

        }

        // model.FeaturesId = getUniqueListBy(list, 'value').sort(dynamicSort("featureId")).map(m => m.featureId).join(",");
        // model.FeaturesValue = getUniqueListBy(list, 'value').sort(dynamicSort("featureId")).map(m => m.value).join(",");
        // model.FeaturesTitle = getUniqueListBy(list, 'value').sort(dynamicSort("featureId")).map(m => m.title).join(",");

        model.FeaturesId = list.sort(dynamicSort("featureId")).map(m => m.featureId).join(",");
        model.FeaturesValue = list.sort(dynamicSort("featureId")).map(m => m.value).join(",");
        model.FeaturesTitle = list.sort(dynamicSort("featureId")).map(m => m.title).join(",");
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        router.push({
            // pathname: props?.currentPage == true ? router.pathname : "/product",
            pathname: "/product",
            query: { ...model },
        });


    }


    const getListWithoutDuplicates = (withDuplicates) => {
        const withoutDuplicates = [...new Set(withDuplicates)];
        return withoutDuplicates
    }



    const ChaneHasInventory = (e) => {

        setHasInventory(e)
    }


    const RemoveFilter = (props) => {
        let model = {};

        // props.brandId="";
        // props.productCategoryId="";
        setResetForm(true);
        setOpenCollapse(false);
        setOpenCollapseBrand(false);
        setSelectedBrandItems([]);
        setSelectedChangeCategory(0);
        setTempSelectedBrandItems([]);

        model.Title = "";


        reset();
        setOpenCollapseCategory([]);
        router.push({
            pathname: "/product",
            query: { ...model },
        });

    }

    const changeBrand = (value, checked) => {
        // setSelectedBrands(checked);

        if (checked) {
            if (selectedBrandItems.length == 0) {
                let tempCheckBox = [];
                tempCheckBox.push({ value: value, selected: true });
                if (props?.brandId) {
                    for (let index = 0; index < props?.brandId?.split(",").length; index++) {
                        const element = props?.brandId.split(",")[index];
                        tempCheckBox.push({ value: parseInt(element), selected: true });
                    }
                }

                setSelectedBrandItems(tempCheckBox);
            }
            else {
                setSelectedBrandItems([...selectedBrandItems.filter(f => f.value != value), { value: value, selected: true }]);
            }

        } else {

            setSelectedBrandItems([...selectedBrandItems.filter(f => f.value != value), { value: value, selected: false }]);

        }
    }
    const changeBrandTitle = (e) => {
        
        if (e.value) {
            setChangeBrandTitleInput(e.value);
            let tempBrand = tempBrandItems.filter(f => f.label.includes(e.value) || f.enTitle?.includes(e.value));
            setBrands(tempBrand);
        }
        else {
            setBrands(tempBrandItems);
        }
    }

    const ClickParentCategory = (key, show, e) => {

        // e?.stopPropagation();
        if (openCollapseCategory.find(f => f.key == key)) {
            setOpenCollapseCategory([...openCollapseCategory.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
        }
        else {
            let temp = [];
            temp.push({ parentKey: key, key: key, show: show ? !show : true });
            setOpenCollapseCategory(temp);
        }


    }

    const ClickChild = async (key) => {
        setSelectedChangeCategory(key);
    }

    const GetOptionsForSelect = (item) => {
        let tempOption = [];
        if (item.option) {
            let option = item.option.split(",");
            for (let index = 0; index < option.length; index++) {
                const element = option[index];
                tempOption.push({ value: element, label: element });
            }
        }
        return tempOption;
    }

    const ChangeSelectHandler = (e, featureId, id) => {
        let temp = [];


        if (changeHandler.length == 0) {
            temp.push({ id: id, featureId: featureId, value: e, selected: false })
            setChangeHandler(temp);
            setChangeOptions(temp);

        } else {
            setChangeHandler([...changeHandler.filter(f => f.featureId != featureId), { featureId: featureId, value: e }]);
            setChangeOptions([...changeHandler.filter(f => f.featureId != featureId), { featureId: featureId, value: e, selected: false }]);

        }

    }

    const ChangeFeatureHasValue = (checked, featureId) => {

        if (checked) {
            if (featureHasValue.length == 0) {
                let tempCheckBox = [];
                tempCheckBox.push({ featureId: featureId, value: true });
                setFeatureHasValue(tempCheckBox);
            }
            else {
                setFeatureHasValue([...featureHasValue.filter(f => f.featureId != featureId), { featureId: featureId, value: true }]);
            }

        } else {

            setFeatureHasValue([...featureHasValue.filter(f => f.featureId != featureId), { featureId: featureId, value: false }]);

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >

                {

                    mobileDevice == false ?
                        <Card className={`mt-2  `} style={{
                            position: props?.currentPage == false ? `absolute` : props?.posts?.length > 9 ? 'absolute' : 'relative',
                            height: props?.currentPage == false ? 'auto' : "auto", width: props?.currentPage == false ? "100%" : "100%",
                            zIndex: props?.currentPage == false ? '1' : '1',

                        }} >
                            <div className="mt-3 mr-2 ml-3 mb-0 d-flex justify-content-between">
                                <h6> فیلتر ها</h6>
                                {
                                    (props?.title || props?.productCategoryId || props?.brandId || props?.hasInventory || props?.featuresValues) &&
                                    <span style={{ cursor: 'pointer', color: "red" }} onClick={() => { RemoveFilter(props) }}>حذف فیلترها</span>

                                }
                            </div>


                            <div className="mt-3 mr-2 ml-2 mb-2">
                                <input style={{ width: "100%" }} ref={register({
                                    required: false,

                                })}  className="input-group-form-control  input-styles text-center" name="title" placeholder="جستجو بر اساس نام محصول" />
                            </div>

                            <ListGroup variant="flush">

                                <ListGroup.Item className='collapse-div'>

                                    <div className="mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={(e) => { e.stopPropagation(); setOpenCollapse(!openCollapse); setOpenCollapseBrand(false); }} >
                                        <h6> دسته‌بندی محصولات </h6><h6 className={`flaticon-right-chevron-1 ${openCollapse ? "rotate-270" : "rotate-90"}`} ></h6>
                                    </div>
                                    <Collapse in={openCollapse} >
                                        <div className="example-collapse-text">

                                            <ListGroup variant="flush" style={{ height: "270px", overflowY: "scroll", backgroundColor: "white !importent" }}>

                                                {
                                                    productCategoriesData.length > 0 && productCategoriesData.map((parentItem) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => ClickParentCategory(parentItem.key, openCollapseCategory.find(f => f.key == parentItem.key)?.show)} >
                                                                    <Link href={`/productcategory/${parentItem.key}`}><a onClick={() => ClickChild(parentItem.key)} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                                                                    <h6 className={`flaticon-right-chevron-1 ${openCollapseCategory.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                                </div>


                                                                <>

                                                                    <Collapse in={
                                                                        openCollapseCategory.find(f => f.key == parentItem.key)?.show ?
                                                                            openCollapseCategory.find(f => f.key == parentItem.key)?.show : false

                                                                    } >
                                                                        <div className="example-collapse-text">

                                                                            <ListGroup variant="flush" style={{ height: "150px", overflowY: "scroll" }}>
                                                                                <>
                                                                                    {

                                                                                        parentItem.children && parentItem.children.map((childItem) => {
                                                                                            return (
                                                                                                <div onClick={() => ClickChild(childItem.key)} className='collapse-div mr-5 ml-2 mb-2 mt-2  '>
                                                                                                    <>
                                                                                                        <Link href={`/product/category/${childItem.key}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`}  collapse-div`}> {childItem.title} </a></Link>
                                                                                                        <span className={`flaticon-right-chevron-1 flip-h ${selectedChangeCategory == childItem.key ? 'text-danger' : 'text-dark'}`} ></span>

                                                                                                    </>
                                                                                                </div>)
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
                                </ListGroup.Item>


                                <ListGroup.Item className='collapse-div'>

                                    <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => { setOpenCollapseBrand(!openCollapseBrand); setOpenCollapse(false) }} >
                                        <h6>  برند ها </h6><h6 className={`flaticon-right-chevron-1 ${openCollapseBrand ? "rotate-270" : "rotate-90"}`} ></h6>
                                    </div>


                                    <Collapse in={openCollapseBrand} >
                                        <div className="example-collapse-text">
                                            <div className=" mt-3 mr-2 ml-2 mb-2 " >
                                                <input style={{ width: "100%" }} ref={register({
                                                    required: false,

                                                })} onChange={(e) => changeBrandTitle(e.currentTarget)} className="input-group-form-control  input-styles text-center" name="brandTitle" placeholder="جستجو برند ..." />                                </div>


                                            <ListGroup variant="flush" style={{ height: "270px", overflowY: "scroll" }}>

                                                {

                                                    brands?.map((item) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                <label className='mb-0 collapse-div'>
                                                                    <input inline
                                                                        // defaultChecked={props.brandId && props.brandId.split(",").find(f => f == item.value) ? true : false}
                                                                        defaultChecked={tempSelectedBrandItems?.length > 0 && tempSelectedBrandItems.find(f => f == item.value) ? true : false}
                                                                        onChange={(e) => changeBrand(item.value, e.currentTarget.checked)} type="checkbox"
                                                                        name={item.label} label={item.label} id={item.value} /><span className='mr-2'>{item.label}</span> {item.enTitle && <span> - {item.enTitle}</span>}
                                                                </label>
                                                            </ListGroup.Item>)
                                                    })
                                                }



                                            </ListGroup>

                                        </div>
                                    </Collapse>


                                </ListGroup.Item>

                                {
                                    props?.featuresData?.length > 0 && props?.currentPage == true ?
                                        <>
                                            <ListGroup.Item className='collapse-div'>

                                                <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => { setOpenCollapseFeature(!openCollapseFeature); setOpenCollapseBrand(false); setOpenCollapse(false) }} >
                                                    <h6>   ویژگی ها </h6><h6 className={`flaticon-right-chevron-1 ${openCollapseFeature ? "rotate-270" : "rotate-90"}`} ></h6>
                                                </div>


                                                <Collapse in={openCollapseFeature} >
                                                    <div className="example-collapse-text">

                                                        <ListGroup variant="flush" >

                                                            {

                                                                props?.featuresData?.map((item, index) => {
                                                                    return (
                                                                        <ListGroup.Item>
                                                                            <>
                                                                                {
                                                                                    item.controlType == 102 ?
                                                                                        <>
                                                                                            <div >
                                                                                                <label >
                                                                                                    {`${item.title} - (${item.symbolTitle}) :
                                                                                                   (${item.min} - ${item.max})`
                                                                                                    }
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="input-group ">
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "featureFrom" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "featureFrom" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,

                                                                                                })} class="input-group-form-control input-styles  text-center" name={`${item.id}-featureFrom-${item.featureId}`} placeholder="از" aria-label="from" />
                                                                                                <span class="input-group-text">-</span>
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "featureTo" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "featureTo" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,
                                                                                                })} class="input-group-form-control  input-styles  text-center" name={`${item.id}-featureTo-${item.featureId}`} placeholder="تا" aria-label="to" />
                                                                                            </div>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                                {
                                                                                    item.controlType == 104 ?
                                                                                        <>

                                                                                            {
                                                                                                changeOptions?.length > 0 && changeOptions.find(f => f.featureId == item.featureId)?.selected == true && featureHasValueList.find(f => f.title == "tag" && f.featureId == item.featureId) ?
                                                                                                    <div className="mt-2 mr-2 ml-2 mb-2">
                                                                                                        <Select
                                                                                                            value={GetOptionsForSelect(item).find(i => i.value == featureHasValueList.find(f => f.title == "tag" && f.featureId == item.featureId)?.value)}
                                                                                                            isSearchable placeholder={`${item.title}`} className="course-select w-100" isRtl
                                                                                                            onChange={e => ChangeSelectHandler(e.value, item.featureId, item.id)}
                                                                                                            options={GetOptionsForSelect(item)} />
                                                                                                    </div>
                                                                                                    :

                                                                                                    <Select isSearchable placeholder={`${item.title}`} className="course-select w-100" isRtl
                                                                                                        onChange={e => ChangeSelectHandler(e.value, item.featureId, item.id)}
                                                                                                        options={GetOptionsForSelect(item)} />
                                                                                            }



                                                                                        </>
                                                                                        : null
                                                                                }




                                                                                {
                                                                                    item.controlType == 101 ?
                                                                                        <>
                                                                                            <div >
                                                                                                <label >
                                                                                                    {`${item.title} - (${item.symbolTitle}) :`}
                                                                                                </label>
                                                                                            </div>
                                                                                            <div >
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "text" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "text" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,

                                                                                                })} style={{ width: "100%" }} class=" text-center  input-group-form-control  input-styles"
                                                                                                    name={`${item.id}-productFeatureValues-${item.featureId}`} placeholder="" />
                                                                                            </div>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                                {
                                                                                    item.controlType == 103 ?
                                                                                        <>
                                                                                            <label className='mb-0 collapse-div'>

                                                                                                <input defaultChecked={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "switch" && f.featureId == item.featureId)?.value == 'true' ? true : false}
                                                                                                    ref={register({
                                                                                                        required: false,

                                                                                                    })}
                                                                                                    className='collapse-div'
                                                                                                    // defaultChecked={props?.hasInventory == "true" ? true : false}
                                                                                                    onChange={(e) => ChangeFeatureHasValue(e.currentTarget.checked, item.featureId)}
                                                                                                    type="checkbox" name={`${item.id}-featureHasValue-${item.featureId}`} id='550' />
                                                                                                <span className='mr-2'> {`${item.title}  `}</span>
                                                                                            </label>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                            </>
                                                                        </ListGroup.Item>
                                                                    )
                                                                })
                                                            }



                                                        </ListGroup>

                                                    </div>
                                                </Collapse>


                                            </ListGroup.Item>


                                        </>

                                        : null
                                }


                                {
                                    props?.currentPage == true ?
                                        <>
                                            <div className="mt-1 mr-2 mb-0 collapse-div" style={{ padding: ".75rem 1rem" }}>
                                                <label className='mb-0 collapse-div'>

                                                    <input
                                                        className='collapse-div' defaultChecked={props?.hasInventory == "true" ? true : false}
                                                        onChange={(e) => ChaneHasInventory(e.currentTarget.checked)} type="checkbox" name='hasInventory' id='10' />
                                                    <span className='mr-2'>فقط کالاهای موجود</span>
                                                </label>
                                            </div>

                                        </>
                                        : null
                                }

                            </ListGroup>


                            <div className="mt-2 mr-2 ml-2 mb-2">
                                <>
                                    <LoadingButton loading={loading} text=" جستجو کن" />
                                </>
                            </div>


                        </Card>
                        :
                        <Card className={`mt-2  `} style={{ position: "relative" }} >
                            <div className="mt-3 mr-2 ml-3 mb-0 d-flex justify-content-between">
                                <h6> فیلتر ها</h6>
                                {
                                    (props?.title || props?.productCategoryId || props?.brandId || props?.hasInventory || props?.featuresValues) &&
                                    <span style={{ cursor: 'pointer', color: "red" }} onClick={() => { RemoveFilter(props) }}>حذف فیلترها</span>

                                }
                            </div>

                            <div className="mt-3 mr-2 ml-2 mb-2">
                                <input style={{ width: "100%" }} ref={register({
                                    required: false,

                                })}  className="input-group-form-control  input-styles text-center" name="title" placeholder="جستجو بر اساس نام محصول" />
                            </div>

                            <ListGroup variant="flush">

                                <ListGroup.Item className='collapse-div'>

                                    <div className="mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={(e) => { e.stopPropagation(); setOpenCollapse(!openCollapse); setOpenCollapseBrand(false); }} >
                                        <h6> دسته‌بندی محصولات </h6><h6 className={`flaticon-right-chevron-1 ${openCollapse ? "rotate-270" : "rotate-90"}`} ></h6>
                                    </div>
                                    <Collapse in={openCollapse} >
                                        <div className="example-collapse-text">

                                            <ListGroup variant="flush" style={{ height: "270px", overflowY: "scroll", backgroundColor: "white !importent" }}>

                                                {
                                                    productCategoriesData.length > 0 && productCategoriesData.map((parentItem) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => ClickParentCategory(parentItem.key, openCollapseCategory.find(f => f.key == parentItem.key)?.show)} >
                                                                    <Link href={`/productcategory/${parentItem.key}`}><a onClick={() => ClickChild(parentItem.key)} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                                                                    <h6 className={`flaticon-right-chevron-1 ${openCollapseCategory.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                                </div>


                                                                <>

                                                                    <Collapse in={
                                                                        openCollapseCategory.find(f => f.key == parentItem.key)?.show ?
                                                                            openCollapseCategory.find(f => f.key == parentItem.key)?.show : false

                                                                    } >
                                                                        <div className="example-collapse-text">

                                                                            <ListGroup variant="flush" style={{ height: "150px", overflowY: "scroll" }}>
                                                                                <>
                                                                                    {

                                                                                        parentItem.children && parentItem.children.map((childItem) => {
                                                                                            return (
                                                                                                <div onClick={() => ClickChild(childItem.key)} className='collapse-div mr-5 ml-2 mb-2 mt-2  '>
                                                                                                    <>
                                                                                                        <Link href={`/product/category/${childItem.key}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`}  collapse-div`}> {childItem.title} </a></Link>
                                                                                                        <span className={`flaticon-right-chevron-1 flip-h ${selectedChangeCategory == childItem.key ? 'text-danger' : 'text-dark'}`} ></span>

                                                                                                    </>
                                                                                                </div>)
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
                                </ListGroup.Item>


                                <ListGroup.Item className='collapse-div'>

                                    <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => { setOpenCollapseBrand(!openCollapseBrand); setOpenCollapse(false) }} >
                                        <h6>  برند ها </h6><h6 className={`flaticon-right-chevron-1 ${openCollapseBrand ? "rotate-270" : "rotate-90"}`} ></h6>
                                    </div>


                                    <Collapse in={openCollapseBrand} >
                                        <div className="example-collapse-text">
                                            <div className=" mt-3 mr-2 ml-2 mb-2 " >
                                                <input style={{ width: "100%" }} ref={register({
                                                    required: false,

                                                })} onChange={(e) => changeBrandTitle(e.currentTarget)} className="input-group-form-control  input-styles text-center" name="brandTitle" placeholder="جستجو برند ..." />                                </div>


                                            <ListGroup variant="flush" style={{ height: "270px", overflowY: "scroll" }}>

                                                {

                                                    brands?.map((item) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                <label className='mb-0 collapse-div'>
                                                                    <input inline
                                                                        // defaultChecked={props.brandId && props.brandId.split(",").find(f => f == item.value) ? true : false}
                                                                        defaultChecked={tempSelectedBrandItems?.length > 0 && tempSelectedBrandItems.find(f => f == item.value) ? true : false}
                                                                        onChange={(e) => changeBrand(item.value, e.currentTarget.checked)} type="checkbox"
                                                                        name={item.label} label={item.label} id={item.value} /><span className='mr-2'>{item.label}</span> {item.enTitle && <span> - {item.enTitle}</span>}
                                                                </label>
                                                            </ListGroup.Item>)
                                                    })
                                                }



                                            </ListGroup>

                                        </div>
                                    </Collapse>


                                </ListGroup.Item>

                                {
                                    props?.featuresData?.length > 0 && props?.currentPage == true ?
                                        <>
                                            <ListGroup.Item className='collapse-div'>

                                                <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => { setOpenCollapseFeature(!openCollapseFeature); setOpenCollapseBrand(false); setOpenCollapse(false) }} >
                                                    <h6>   ویژگی ها </h6><h6 className={`flaticon-right-chevron-1 ${openCollapseFeature ? "rotate-270" : "rotate-90"}`} ></h6>
                                                </div>


                                                <Collapse in={openCollapseFeature} >
                                                    <div className="example-collapse-text">

                                                        <ListGroup variant="flush" >

                                                            {

                                                                props?.featuresData?.map((item, index) => {
                                                                    return (
                                                                        <ListGroup.Item>
                                                                            <>
                                                                                {
                                                                                    item.controlType == 102 ?
                                                                                        <>
                                                                                            <div >
                                                                                                <label >
                                                                                                    {`${item.title} - (${item.symbolTitle}) :
                                                                                                   (${item.min} - ${item.max})`
                                                                                                    }
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="input-group ">
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "featureFrom" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "featureFrom" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,

                                                                                                })} class="input-group-form-control input-styles  text-center" name={`${item.id}-featureFrom-${item.featureId}`} placeholder="از" aria-label="from" />
                                                                                                <span class="input-group-text">-</span>
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "featureTo" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "featureTo" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,
                                                                                                })} class="input-group-form-control  input-styles  text-center" name={`${item.id}-featureTo-${item.featureId}`} placeholder="تا" aria-label="to" />
                                                                                            </div>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                                {
                                                                                    item.controlType == 104 ?
                                                                                        <>

                                                                                            {
                                                                                                changeOptions?.length > 0 && changeOptions.find(f => f.featureId == item.featureId)?.selected == true && featureHasValueList.find(f => f.title == "tag" && f.featureId == item.featureId) ?
                                                                                                    <div className="mt-2 mr-2 ml-2 mb-2">
                                                                                                        <Select
                                                                                                            value={GetOptionsForSelect(item).find(i => i.value == featureHasValueList.find(f => f.title == "tag" && f.featureId == item.featureId)?.value)}
                                                                                                            isSearchable placeholder={`${item.title}`} className="course-select w-100" isRtl
                                                                                                            onChange={e => ChangeSelectHandler(e.value, item.featureId, item.id)}
                                                                                                            options={GetOptionsForSelect(item)} />
                                                                                                    </div>
                                                                                                    :

                                                                                                    <Select isSearchable placeholder={`${item.title}`} className="course-select w-100" isRtl
                                                                                                        onChange={e => ChangeSelectHandler(e.value, item.featureId, item.id)}
                                                                                                        options={GetOptionsForSelect(item)} />
                                                                                            }



                                                                                        </>
                                                                                        : null
                                                                                }




                                                                                {
                                                                                    item.controlType == 101 ?
                                                                                        <>
                                                                                            <div >
                                                                                                <label >
                                                                                                    {`${item.title} - (${item.symbolTitle}) :`}
                                                                                                </label>
                                                                                            </div>
                                                                                            <div >
                                                                                                <input defaultValue={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "text" && f.featureId == item.featureId) ? featureHasValueList.find(f => f.title == "text" && f.featureId == item.featureId).value : null} type="text" ref={register({
                                                                                                    required: false,

                                                                                                })} style={{ width: "100%" }} class=" text-center  input-group-form-control  input-styles"
                                                                                                    name={`${item.id}-productFeatureValues-${item.featureId}`} placeholder="" />
                                                                                            </div>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                                {
                                                                                    item.controlType == 103 ?
                                                                                        <>
                                                                                            <label className='mb-0 collapse-div'>

                                                                                                <input defaultChecked={featureHasValueList.length > 0 && featureHasValueList.find(f => f.title == "switch" && f.featureId == item.featureId)?.value == 'true' ? true : false}
                                                                                                    ref={register({
                                                                                                        required: false,

                                                                                                    })}
                                                                                                    className='collapse-div'
                                                                                                    // defaultChecked={props?.hasInventory == "true" ? true : false}
                                                                                                    onChange={(e) => ChangeFeatureHasValue(e.currentTarget.checked, item.featureId)}
                                                                                                    type="checkbox" name={`${item.id}-featureHasValue-${item.featureId}`} id='550' />
                                                                                                <span className='mr-2'> {`${item.title}  `}</span>
                                                                                            </label>
                                                                                        </>
                                                                                        : null
                                                                                }

                                                                            </>
                                                                        </ListGroup.Item>
                                                                    )
                                                                })
                                                            }



                                                        </ListGroup>

                                                    </div>
                                                </Collapse>


                                            </ListGroup.Item>


                                        </>

                                        : null
                                }


                                {
                                    props?.currentPage == true ?
                                        <>
                                            <div className="mt-1 mr-2 mb-0 collapse-div" style={{ padding: ".75rem 1rem" }}>
                                                <label className='mb-0 collapse-div'>

                                                    <input
                                                        className='collapse-div' defaultChecked={props?.hasInventory == "true" ? true : false}
                                                        onChange={(e) => ChaneHasInventory(e.currentTarget.checked)} type="checkbox" name='hasInventory' id='10' />
                                                    <span className='mr-2'>فقط کالاهای موجود</span>
                                                </label>
                                            </div>

                                        </>
                                        : null
                                }

                            </ListGroup>

                            <div className="mt-2 mr-2 ml-2 mb-2">
                                <>
                                    <LoadingButton loading={loading} text=" جستجو کن" />
                                </>
                            </div>
                            
                        </Card>
                }

            </form>
        </>
    );
};







const ProductFilterSidebar = (props) => {


    return <aside class="news-sidebar-widget">
        <FilterSidebar props={props} />

    </aside>


}




export default ProductFilterSidebar;