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
import { brandServices } from 'services/catalog/brandServices';
import { getUrl } from 'helpers/Helpers';
import SpecialOfferProductFilterSidebar from '../products/SpecialOfferProductFilterSidebar';

var moment = require('jalali-moment');

const FilterSidebar = ({ props }) => {

    const [mobileDevice, setMobileDevice] = useState(false);

    const router = useRouter();
    const [openCollapse, setOpenCollapse] = useState(false);
    const [openCollapseBrand, setOpenCollapseBrand] = useState([]);
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
    const [loading, setLoading] = useState(false);
    const [loadingCard, setLoadingCard] = useState(false);

    const [tempSelectedBrandItems, setTempSelectedBrandItems] = useState([]);

    const { register, handleSubmit, watch, errors, reset } = useForm();

    useEffect(() => {


        (async () => {
            await getProductCategoriesData();
            await getBrandsData();
        })()
    }, [props]);

    const getProductCategoriesData = async () => {
        const result = await productCategoryServices.getCategoriesForMegaMenu();
        setProductCategoriesData(result.data);

    };

    const getBrandsData = async () => {
        let result = await brandServices.getAllBrandMegaMenu();
        setBrands(result.data.filter(f=>f.key !=-1));
        setTempBrandItems(result.data.filter(f=>f.key !=-1));
    };


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


    const ClickParentBrand = (key, show, e) => {

        // e?.stopPropagation();
        if (openCollapseBrand.find(f => f.key == key)) {
            setOpenCollapseBrand([...openCollapseBrand.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
        }
        else {
            let temp = [];
            temp.push({ parentKey: key, key: key, show: show ? !show : true });
            setOpenCollapseBrand(temp);
        }


    }

    const changeBrandTitle = (e) => {

        if (e.value) {
            setChangeBrandTitleInput(e.value);
            let tempBrand = tempBrandItems.filter(f => f.title.includes(e.value) || f.enTitle?.includes(e.value));
            setBrands(tempBrand);
        }
        else {
            setBrands(tempBrandItems);
        }
    }



    const onSubmit = (val) => {

        let model = {};
        model.Title = val.title;
        router.push({
            pathname: `/product`,
            query: { ...model },
        });

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >

                <Card className={`mt-2  `}  >
                    <div className="mt-3 mr-2 ml-2 mb-2">
                        <input style={{ width: "100%", borderRadius: "15px" }} ref={register({
                            required: false,

                        })}  className="input-group-form-control  input-styles text-center" name="title" placeholder="جستجو در تمام قطعات" />
                    </div>

                    <div className="mt-2 mr-2 ml-2 mb-2">
                        <>
                            <LoadingButton loading={loading} text=" جستجو کن" />
                        </>
                    </div>
                </Card>

                {
                    productCategoriesData.length > 0 &&
                    <Card className={`mt-3  font-weight-bold `}  >
                        <Card.Header style={{ background: "none" }}>
                            دسته‌بندی محصولات
                        </Card.Header>
                        <Card.Body className='p-0'>
                            <div className="example-collapse-text">

                                <ListGroup variant="flush" style={{height: productCategoriesData.length > 6? "400px" :"auto", overflowY: productCategoriesData.length > 6?"scroll":"auto", backgroundColor: "white !importent" }}>

                                    {
                                        productCategoriesData.length > 0 && productCategoriesData.map((parentItem) => {
                                            return (
                                                <ListGroup.Item>
                                                    <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => ClickParentCategory(parentItem.key, openCollapseCategory.find(f => f.key == parentItem.key)?.show)} >
                                                        <Link href={`/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                                                        <h6 className={`flaticon-right-chevron-1 ${openCollapseCategory.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                    </div>


                                                    <>

                                                        <Collapse in={
                                                            openCollapseCategory.find(f => f.key == parentItem.key)?.show ?
                                                                openCollapseCategory.find(f => f.key == parentItem.key)?.show : false

                                                        } >
                                                            <div className="example-collapse-text">

                                                                <ListGroup variant="flush" style={{ height:parentItem?.children?.length > 3 ? "150px": "auto", overflowY:parentItem?.children?.length > 3 ? "scroll": "auto"}}>
                                                                    <>
                                                                        {

                                                                            parentItem.children && parentItem.children.map((childItem) => {
                                                                                return (
                                                                                    <div className='collapse-div mr-5 ml-2 mb-2 mt-2  '>
                                                                                        <>

                                                                                            <Link href={`/product/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`}  collapse-div`}> {childItem.title} </a></Link>
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

                        </Card.Body>







                    </Card>
                }


                <Card className={`mt-3 font-weight-bold  `}  >
                    <Card.Header style={{ background: "none" }}>
                        <input style={{ width: "100%", borderRadius: "15px" }} ref={register({
                            required: false,

                        })} onChange={(e) => changeBrandTitle(e.currentTarget)} className="input-group-form-control  input-styles text-center" name="brandTitle" placeholder="جستجو برند ..." />                        </Card.Header>
                    <Card.Body className='p-0'>
                        <div className="example-collapse-text">

                            <ListGroup variant="flush" style={{height:     brands.length > 0 ?"400px":"auto", overflowY: brands.length > 0 ?"scroll":"auto", backgroundColor: "white !importent" }}>

                                {
                                    brands.length > 0 && brands.map((parentItem) => {
                                        return (
                                            <ListGroup.Item>
                                                <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => ClickParentBrand(parentItem.key, openCollapseBrand.find(f => f.key == parentItem.key)?.show)} >
                                                    <Link href={`/brand/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                                                    <h6 className={`flaticon-right-chevron-1 ${openCollapseBrand.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>
                                                </div>


                                                <>

                                                    <Collapse in={
                                                        openCollapseBrand.find(f => f.key == parentItem.key)?.show ?
                                                            openCollapseBrand.find(f => f.key == parentItem.key)?.show : false

                                                    } >
                                                        <div className="example-collapse-text">

                                                            <ListGroup variant="flush" style={{ height:parentItem?.children?.length > 3 ? "150px": "auto", overflowY:parentItem?.children?.length > 3 ?  "scroll" : "auto" }}>
                                                                <>
                                                                    {

                                                                        parentItem.children && parentItem.children.map((childItem) => {
                                                                            return (
                                                                                <div className='collapse-div mr-5 ml-2 mb-2 mt-2  '>
                                                                                    <>

                                                                                        <Link href={`/brand/category/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`}  collapse-div`}> {childItem.title} </a></Link>
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

                    </Card.Body>







                </Card>

                <SpecialOfferProductFilterSidebar />

            </form>
        </>
    );
};





const BrandsFilterSidebar = (props) => {


    return <aside class="news-sidebar-widget">
        <FilterSidebar props={props} />

    </aside>


}




export default BrandsFilterSidebar;