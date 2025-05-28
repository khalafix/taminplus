import axios from 'axios';
import ProductFilterSidebar from "components/product/ProductFilterSidebar";
import ProductThumb from "components/product/ProductThumb";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { productServices } from 'services/catalog/productServices';
import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { Collapse, Modal } from 'react-bootstrap';
import { isMobile, isMobileSafari } from 'react-device-detect';
import SortOrderFilter from 'components/SortOrderFilter';
import ProductCategories from "components/ProductCategories";
import { PositionPlace } from "utils/positionPlace";
import { bannerServices } from "services/media/bannerServices";
import BannerOfferForProductCategory from "components/banner/BannerOfferForProductCategory";
import ProductsSubCategoryFilterSidebar from "components/filters/products/ProductsSubCategoryFilterSidebar";
import { removeDash } from 'helpers/Helpers';
import Link from 'next/link';



const ProductList = ({ data, error }) => {

    return data.map((post) => {
        return (
            <ProductThumb post={post} isBlog={true} />
        );
    })
}



export default function Blog({ posts, total, isNew, topVisited,
    topSale, brandId, hasInventory, title, productCategoryId,
    allCategories, featuresData, featuresIds, featuresValues, featuresTitles, categories, banner, category }) {
    // const dispatch = useDispatch();
    // dispatch({
    //     type : types.GET_INITIAL_POSTS , 
    //     payload : initialData
    // })
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
    const [mobileDevice, setMobileDevice] = useState(false);
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

        if (hasInventory || productCategoryId || brandId) {
            setColorActiveTopSale("black");
            setColorActiveIsNew("black");
            setColorActiveTopVisited("black");
            // topSale = "";
            // topVisited = "";
            // isNew = "";
        }

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
        const currentPath = router.asPath;

        let model = {};
        // model.BrandId = brandId;
        // model.ProductCategoryId = productCategoryId;
        // model.HasInventory = hasInventory;
        // model.Category=category;
        // model.Title = title;
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
            pathname: `/category/${category}`,
            query: { ...model },
        });

    }


    return (
        <>
            <Head>
                <title> محصولات  </title>
                <meta name="description" content="محصولات " />
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
                                    category && <li class="breadcrumb-item active" aria-current="page">{allCategories?.find(f => f.categoryName == removeDash(category) || f.enName == removeDash(category))?.categoryName}</li>
                                }
                            </ol>
                        </nav>
                    </div>
                    <div className='row mb-1'>
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            <BannerOfferForProductCategory props={banner} />

                        </div>
                        <div class="col-xl-9 col-lg-8">
                            <ProductCategories showTitle={false} hideTitle={true} category={category} categories={categories} />
                        </div>
                    </div>




                    <div class="row mb-2">
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            {!mobileDevice && <ProductsSubCategoryFilterSidebar featuresIds={featuresIds}
                                category={category}
                                allCategories={allCategories}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles} featuresData={featuresData} currentPage={true} productCategoryId={productCategoryId} isDetail={false} categoryChangeHandler={categoryChangeHandler} />}
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
                            <ProductsSubCategoryFilterSidebar
                                allCategories={allCategories}
                                category={category}
                                featuresIds={featuresIds}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles} featuresData={featuresData} currentPage={true} productCategoryId={productCategoryId} isDetail={false} categoryChangeHandler={categoryChangeHandler} />                        </Modal.Body>
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
    model.productCategoryId = null;
    model.category = context.query["slug"] ?? null;

    model.filtered = [
        { "column": "category", "value": model.category },
        // { "column": "featuresIds", "value": context?.query["FeaturesId"] },
        // { "column": "featuresValues", "value": context?.query["FeaturesValue"] },
        // { "column": "featuresTitles", "value": context?.query["FeaturesTitle"] },
        { "column": "topSale", "value": context?.query["TopSale"] },
        { "column": "topVisited", "value": context?.query["TopVisited"] },
        { "column": "isNew", "value": context?.query["IsNew"] },
    ];
    let featuresData = [];
    // if (model.productCategoryId) {
    //     let features = await productCategoryServices.getFeaturesForSearch(model.productCategoryId);
    //     featuresData = features.data;
    // }
    let result = await productServices.getProductsForParentItemsMegaMenu(model);

    let allCategories = await productCategoryServices.getUserAllList();

    let categories = await productCategoryServices.getUserByParentId(10000000, model.category); // count=10

    let banner = await bannerServices.getAll(PositionPlace.OfferForProductCategory);

    return {
        props: {
            posts: result?.data, total: result?.total,
            productCategoryId: model.productCategoryId ?? null,
            allCategories: allCategories.data,
            featuresData: featuresData,
            featuresIds: context.query["FeaturesId"] ?? null,
            featuresValues: context.query["FeaturesValue"] ?? null,
            featuresTitles: context.query["FeaturesTitle"] ?? null,
            categories: categories.data,
            banner: banner.data,
            category: model.category,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,

        }
    }


}


