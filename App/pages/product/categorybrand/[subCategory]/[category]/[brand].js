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
import BannerOfferForOfferForPiece from 'components/banner/BannerOfferForOfferForPiece';
import { bannerServices } from 'services/media/bannerServices';
import { PositionPlace } from 'utils/positionPlace';
import ProductBrands from 'components/ProductBrands';

import CategoryFeatures from "components/CategoryFeatures";
import FeaturesFilterSidebar from 'components/filters/features/FeaturesFilterSidebar';
import { getUrl, removeDash } from 'helpers/Helpers';
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



export default function Blog({ posts, total, isNew, topVisited, topSale, brandId, hasInventory, title, productCategoryId,
    allCategories, brands, featuresData, featuresIds, featuresValues, featuresTitles,
    banner, products, categoriesFeatures, features, category, brand, bannerProductFeatures , subcategory  }) {
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
        model.Brand = brand;
        model.category = category;
        model.HasInventory = hasInventory;

        model.Title = title;
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
            pathname: `/product/categorybrand/${subcategory}/${category}/${brand}`,
            query: { ...model },
        });

    }


    return (
        <>
            <Head>
                <title>
                    {
                        brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.title
                    }  </title>
                <meta name="description" content={
                    brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.title
                } />
                <link rel="canonical" href="/product"></link>
            </Head>
            <div class="service-details-page ">
                <div class="container">


                    <div className='breadcrumb-div' >
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link href="/product">
                                    <a >محصولات</a>
                                </Link></li>
                                {
                                    subcategory &&
                                    <li class="breadcrumb-item ">
                                        <Link href={`/category/${getUrl(allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.enName ? allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.enName : allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.categoryName )}`}>
                                            <a>
                                                {allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.categoryName}
                                            </a>
                                        </Link>
                                    </li>
                                }
                                {
                                    category &&
                                    <li class="breadcrumb-item ">
                                        <Link
                                            href={`/product/category/${getUrl(allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.enName ? allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.enName : allCategories?.find(f => f.categoryName == removeDash(subcategory) || f.enName == removeDash(subcategory))?.categoryName)}/${category}`}>
                                            <a>
                                                {allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.categoryName}
                                            </a>
                                        </Link>
                                    </li>


                                }

                                {
                                    brand &&
                                    <li class="breadcrumb-item active" aria-current="page">


                                        {
                                            brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.title
                                        }
                                    </li>
                                }
                            </ol>
                        </nav>
                    </div>
                    <div className='row mb-1'>
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            <BannerOfferForOfferForPiece props={banner} />

                        </div>
                        <div class="col-xl-9 col-lg-8">
                            {/* <CategoryFeatures showTitle={false} hideTitle={true} categoriesFeatures={categoriesFeatures} /> */}
                            <BannerFeatures props={bannerProductFeatures} />

                        </div>
                    </div>



                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            {!mobileDevice && <FeaturesFilterSidebar
                                subcategory={allCategories?.find(f => f.id == allCategories?.find(k => k.categoryName == removeDash(category) || k.enName == removeDash(category))?.parentId)?.categoryName}
                                brand={brand}
                                category={category}
                                features={features}
                                featuresIds={featuresIds}
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
                                        {/* 
                                        {

                                            brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description &&
                                            <a onClick={() => setOpen(!open)} >
                                                بیشتر ...
                                            </a>
                                        } */}

                                        {/* <Collapse in={true} > */}
                                            <div className='container'>
                                                {
                                                    brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description &&
                                                    <div class="row mb-3 box-remark">
                                                        <div className="col-xl-12 entry-content product-detail-slider">
                                                            <div dangerouslySetInnerHTML={{ __html: brands?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description }} className=""></div>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        {/* </Collapse> */}


                                    </> :
                                    <>
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
                            <FeaturesFilterSidebar
                                subcategory={allCategories?.find(f => f.id == allCategories?.find(k => k.categoryName == removeDash(category) || k.enName == removeDash(category))?.parentId)?.categoryName}
                                brand={brand}
                                category={category}
                                features={features}
                                featuresIds={featuresIds}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles} featuresData={featuresData} posts={posts} currentPage={true}
                                brandId={brandId} productCategoryId={productCategoryId} isDetail={false}
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
    model.brand = context.query["brand"] ?? null;
    model.category = context.query["category"] ?? null;
    model.subcategory = context.query["subCategory"] ?? null;

    model.filtered = [
        { "column": "productCategory", "value": model.subcategory },
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

    let resultCategories = await productCategoryServices.getUserAllList();
    let banner = await bannerServices.getAll(PositionPlace.OfferForPiece);
    let categoriesFeatures = await productCategoryServices.getFeaturesByCategoryAndBrand(model.category, model.brand); // count=10
    let bannerProductFeatures = await bannerServices.getAll(PositionPlace.ProductFeatures);

    return {
        props: {
            posts: result?.data, total: result?.total,
            // productCategoryId: null, 
            // brandId: null ,
            brands: resultBrands.data,
            allCategories: resultCategories.data, featuresData: featuresData,
            banner: banner.data,
            featuresIds: context.query["FeaturesId"] ?? null,
            featuresValues: context.query["FeaturesValues"] ?? null,
            featuresTitles: context.query["FeaturesTitle"] ?? null,
            products: result?.data,
            categoriesFeatures: categoriesFeatures.data,
            features: categoriesFeatures.data,
            category: model.category,
            brand: model.brand,
            bannerProductFeatures: bannerProductFeatures.data,  subcategory:  model.subcategory,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,
        }
    }


}


