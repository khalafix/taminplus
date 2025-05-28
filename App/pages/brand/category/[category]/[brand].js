import axios from 'axios';
import ProductFilterSidebar from "components/product/ProductFilterSidebar";
import ProductThumb from "components/product/ProductThumb";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { productServices } from 'services/catalog/productServices';
import { brandServices } from 'services/catalog/brandServices';

import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { Collapse, Modal } from 'react-bootstrap';
import { isMobile, isMobileSafari } from 'react-device-detect';
import SortOrderFilter from 'components/SortOrderFilter';

import Link from 'next/link';
import { bannerServices } from 'services/media/bannerServices';
import { PositionPlace } from 'utils/positionPlace';

import BannerOfferForBrandPiece from "components/banner/BannerOfferForBrandPiece";
import CategoryFeatures from "components/CategoryFeatures";
import BrandsProductsCategoryFilterSidebar from 'components/filters/brands/BrandsProductsCategoryFilterSidebar';
import { getUrl, removeDash } from 'helpers/Helpers';
import SubCategories from 'components/SubCategories';
import BannerFeatures from 'components/banner/BannerFeatures';


const ProductList = ({ data, error }) => {

    if (data?.length == 0) {
        return (<div className="col-xl-9 col-lg-8" >
            <div className="error-inner text-center">
                <img width={"60%"} height={"60%"} className="img-center" src='/images/no-products-found.png' alt="محصولی یافت نشد" />

            </div>
        </div>)
    }
    else {
        return data.map((post) => {
            return (
                <ProductThumb post={post} isBlog={true} />
            );
        })
    }

}



export default function Blog({ posts, total, isNew, topVisited,
    topSale, brandId, hasInventory, title, productCategoryId, allCategories, categories
    , brands, featuresData, featuresIds, featuresValues, featuresTitles, categoriesFeatures,
    banner, brand, category, bannerProductFeatures }) {
    // const dispatch = useDispatch();
    // dispatch({
    //     type : types.GET_INITIAL_POSTS , 
    //     payload : initialData
    // })
    const [mobileDevice, setMobileDevice] = useState(false);

    const router = useRouter()
    const [pageIndex, setPageIndex] = useState(0);
    const [topSaleFilter, setTopSaleFilter] = useState(false);
    const [topVisitedFilter, setTopVisitedFilter] = useState(false);
    const [isNewFilter, setIsNewFilter] = useState(false);
    const [colorActiveIsNew, setColorActiveIsNew] = useState("black");
    const [colorActiveTopVisited, setColorActiveTopVisited] = useState("black");
    const [colorActiveTopSale, setColorActiveTopSale] = useState("black");
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState("sort");
    const [open, setOpen] = useState(false);

    const categoryChangeHandler = (categoryId) => {

        const currentPath = router.pathname;
        const currentQuery = { ...router.query };
        currentQuery.PageNumber = 1;
        //props.onChange(data.selected);
        // router.push({
        //     pathname: currentPath,
        //     query: currentQuery,
        // });
    }

    useEffect(() => {
        setMobileDevice(isMobile)

        if (isNew) {
            setColorActiveIsNew("red");
        }
        if (topVisited) {
            setColorActiveTopVisited("red");
        }
        if (topSale) {
            setColorActiveTopSale("red");
        }
        setShow(false);

    }, [posts]);

    if (!posts) {
        return <div></div>
    }

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleShow = (type) => {
        setShow(true);
        setModalType(type)
    }

    const sortOrder = (type) => {
        let model = {};
        setShow(false);

        switch (type) {
            case "topVisited":
                model.TopVisited = true;
                setColorActiveTopVisited("red");
                setColorActiveTopSale("black");
                setColorActiveIsNew("black");

                break;
            case "topSale":
                model.TopSale = true;
                setColorActiveTopVisited("black");
                setColorActiveTopSale("red");
                setColorActiveIsNew("black");
                break;
            case "isNew":
                model.IsNew = true;
                setColorActiveTopVisited("black");
                setColorActiveTopSale("black");
                setColorActiveIsNew("red");
                break;
            default:
                model.IsNew = "";
                model.TopSale = "";
                model.TopVisited = "";
                setColorActiveTopVisited("black");
                setColorActiveTopSale("black");
                setColorActiveIsNew("black");
                break;
        }
        router.push({
            pathname: `/brand/category/${category}/${brand}`,
            query: { ...model },
        });

    }


    return (
        <>
            <Head>
                <title>
                    {allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.categoryName}
                </title>
                <meta name="description" content={allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.categoryName} />
                <link rel="canonical" href={`/brands/${brandId}/${productCategoryId}`}></link>
            </Head>
            <div class="service-details-page ">
                <div class="container">

                    <div className='breadcrumb-div' >
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href={`/brand`}>
                                        <a>
                                            برندها
                                        </a>
                                    </Link>
                                </li>


                                {
                                    brand &&
                                    <li class="breadcrumb-item ">

                                        <Link
                                            href={`/brand/${brand}`}>
                                            <a>
                                                {
                                                    brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.title
                                                }
                                            </a>
                                        </Link>

                                    </li>
                                }


                                {
                                    category &&
                                    <li class="breadcrumb-item active" aria-current="page">


                                        {allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.categoryName}

                                    </li>


                                }

                            </ol>
                        </nav>
                    </div>

                    <div className='row mb-1'>
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            <BannerOfferForBrandPiece props={banner} />

                        </div>
                        <div class="col-xl-9 col-lg-8">
                            {/* <SubCategories showTitle={false} hideTitle={true} categories={categories} /> */}

                            {bannerProductFeatures.model ?
                                <BannerFeatures props={bannerProductFeatures} />
                                :
                                <SubCategories showTitle={false} hideTitle={true} categories={categories} />
                            }




                        </div>
                    </div>





                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            {!mobileDevice && <BrandsProductsCategoryFilterSidebar
                                categoriesFeatures={categoriesFeatures}
                                categories={categories}
                                featuresIds={featuresIds}
                                brand={brand}
                                category={category}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles}
                                featuresData={featuresData} posts={posts} brandId={brandId} currentPage={true} productCategoryId={productCategoryId} isDetail={false} categoryChangeHandler={categoryChangeHandler} />}
                        </div>

                        <div class="col-xl-9 col-lg-8">
                            {
                                !mobileDevice ?
                                    <div className='sort-order text-center ' >
                                        <div class="" style={{ display: "contents" }}>
                                            <span class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} />  <a onClick={() => sortOrder("")}> مرتب سازی: </a> </span> &nbsp; &nbsp;
                                            <span style={{ color: `${colorActiveTopVisited}` }} class="sort-order-item "><a onClick={() => sortOrder("topVisited")}>پر‌‌بازدید ترین </a></span>&nbsp; &nbsp;

                                            <span style={{ color: `${colorActiveTopSale}` }} class="sort-order-item "><a onClick={() => sortOrder("topSale")}>پر‌‌فروش ترین </a></span>&nbsp; &nbsp;

                                            <span style={{ color: `${colorActiveIsNew}` }} class="sort-order-item "><a onClick={() => sortOrder("isNew")}>جدید ترین</a></span>&nbsp; &nbsp;


                                        </div>
                                    </div>

                                    :

                                    <div className='d-flex justify-content-center'>

                                        <div className='filter '  >

                                            <span onClick={() => handleShow("filter")} class="sort-order-item font-weight-bold "> <img height={"20px"} width={"20px"} src={'/images/filter.png'} /> فیلترها </span> &nbsp; &nbsp;
                                        </div>

                                        <div className='sort-order '  >
                                            <span onClick={() => handleShow('sort')} class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی   </span> &nbsp; &nbsp;
                                            {
                                                isNew &&
                                                <>
                                                    <span style={{ color: `${colorActiveIsNew}` }} class="sort-order-item "><a onClick={() => sortOrder("isNew")}>جدید ترین</a></span>
                                                </>
                                            }

                                            {
                                                topVisited &&
                                                <>
                                                    <span style={{ color: `${colorActiveTopVisited}` }} class="sort-order-item "><a onClick={() => sortOrder("topVisited")}>پر‌‌بازدید ترین </a></span>

                                                </>
                                            }

                                            {
                                                topSale &&
                                                <>
                                                    <span style={{ color: `${colorActiveTopSale}` }} class="sort-order-item "><a onClick={() => sortOrder("topSale")}>پر‌‌فروش ترین </a></span>

                                                </>
                                            }

                                        </div>
                                    </div>

                            }
                            {
                                posts.length > 0 ?
                                    <>
                                        <div class="row">
                                            {/* <div class="card-group"> */}
                                            <ProductList data={posts} error={false} />
                                            {/* </div> */}
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <nav class="pagination-nav pdt-30">
                                                    {total > 9 && <Pagination page={pageIndex} onChange={setPageIndex} pageCount={total / 9} />}
                                                </nav>
                                            </div>
                                        </div>
                                        {/* {
                                            allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.remark &&
                                            <a onClick={() => setOpen(!open)} >
                                                بیشتر ...
                                            </a>

                                        } */}

                                        {/* <Collapse in={open} > */}
                                        <div className='container'>
                                            {
                                                allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.remark &&
                                                <div class="row mb-3 box-remark">
                                                    <div className="col-xl-12 entry-content product-detail-slider">
                                                        <div dangerouslySetInnerHTML={{ __html: allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.remark }} className=""></div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        {/* </Collapse> */}


                                    </> :
                                    < >
                                        <div className="error-inner text-center">
                                            <img width={"60%"} height={"60%"} className="img-center" src='/images/no-products-found.png' alt="محصولی یافت نشد" />

                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <Modal
                // size="lg"
                // aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}

            >

                {
                    modalType == "sort" ?
                        <Modal.Header > مرتب سازی بر اساس
                        </Modal.Header> :
                        // <Modal.Header >   فیلتر ها
                        // </Modal.Header>
                        null
                }
                {
                    modalType == "sort" ?

                        <Modal.Body>
                            <SortOrderFilter isNew={isNew} topVisited={topVisited} topSale={topSale} changeSortOrder={sortOrder} />
                        </Modal.Body> :
                        <Modal.Body>
                            <BrandsProductsCategoryFilterSidebar
                                categories={categories}
                                categoriesFeatures={categoriesFeatures}
                                brand={brand}
                                category={category}
                                featuresIds={featuresIds}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles}
                                featuresData={featuresData}
                                posts={posts} currentPage={true}
                                brandId={brandId}
                                productCategoryId={productCategoryId}
                                isDetail={false}
                                categoryChangeHandler={categoryChangeHandler} />                        </Modal.Body>
                }

                <Modal.Footer>
                    <button className='btn btn-outline-secondary' onClick={handleClose}>
                        بستن
                    </button>
                </Modal.Footer>


            </Modal>
        </>
    )
}

export async function getServerSideProps(context) {

    let model = {};
    model.size = 9;
    model.page = context.query["PageNumber"];
    model.sorted = [];
    model.brand = context.query["brand"];
    model.category = context.query["category"];

    model.filtered = [
        { "column": "brand", "value": model.brand },
        { "column": "category", "value": model.category },
        { "column": "topSale", "value": context?.query["TopSale"] },
        { "column": "topVisited", "value": context?.query["TopVisited"] },
        { "column": "isNew", "value": context?.query["IsNew"] },
    ];

    let result = await productServices.getAll(model);

    let resultBrands = await brandServices.getUserList(1000000);
    let featuresData = [];
    // if (model.productCategoryId) {
    //     let features = await productCategoryServices.getFeaturesForSearch(model.productCategoryId);
    //     featuresData = features.data;
    // }
    let banner = await bannerServices.getAll(PositionPlace.OfferForBrandPiece);

    let resultCategories = await productCategoryServices.getUserAllList();

    let categories = await productCategoryServices.getSubCategoryByCategoryAndBrand(model.category, model.brand); // count=10
    let categoriesFeatures = await productCategoryServices.getFeaturesByCategoryAndBrand(model.category, model.brand); // count=10

    let bannerProductFeatures = await bannerServices.getAll(PositionPlace.BrandPiece);


    return {
        props: {
            posts: result?.data, total: result?.total,
            category: model.category,
            brand: model.brand,
            brands: resultBrands.data,
            allCategories: resultCategories.data, featuresData: featuresData,
            featuresIds: context.query["FeaturesId"] ?? null,
            featuresValues: context.query["FeaturesValue"] ?? null,
            featuresTitles: context.query["FeaturesTitle"] ?? null,
            banner: banner.data,
            categories: categories.data,
            categoriesFeatures: categoriesFeatures.data,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,
            bannerProductFeatures: bannerProductFeatures.data

        }
    }


}


