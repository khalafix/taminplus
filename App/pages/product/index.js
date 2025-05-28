import axios from 'axios';
import ProductFilterSidebar from "components/product/ProductFilterSidebar";
import ProductThumb from "components/product/ProductThumb";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { productServices } from 'services/catalog/productServices';
import Image from "next/image";
import { isMobile, isMobileSafari } from 'react-device-detect';
import SortOrderFilter from 'components/SortOrderFilter';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { productCategoryServices } from 'services/catalog/productCategoryServices';
import ProductCategories from "components/ProductCategories";
import ProductsFilterSidebar from 'components/filters/products/ProductsFilterSidebar';
import ProductCategoriesForProducts from 'components/ProductCategoriesForProducts';



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



export default function Blog({ posts, total, title, isNew, topVisited, topSale, hasInventory, 
    productCategoryId, brandId, allCategories, featuresData, featuresIds, featuresValues, featuresTitles, categories , brand , productCategory ,category }) {
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

    const objectModel = router.query;



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



    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleShow = (type) => {
        setShow(true);
        setModalType(type)
    }

    const sortOrder = (type) => {
        let model = {};
        model.Brand = brand;
        model.ProductCategory = productCategory;
        model.Category = category;
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
            pathname: "/product",
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

                    <div>
                        {/* {
                        isMobile == false ?
                            <>
                                <div className='d-flex justify-content-start'>

                                    <div className='breadcrumb-div' style={{ width: "40%" }}>
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">
                                                    <Link href={`/product`}>
                                                        <a>
                                                            محصولات
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>



                                    {
                                        posts.length > 0 && <div className='sort-order ' >
                                            <div class="" style={{ display: "contents" }}>
                                                <span class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی: </span> &nbsp; &nbsp;
                                                <span style={{ color: `${colorActiveTopVisited}` }} class="sort-order-item "><a onClick={() => sortOrder("topVisited")}>پر‌‌بازدید ترین </a></span>&nbsp; &nbsp;

                                                <span style={{ color: `${colorActiveTopSale}` }} class="sort-order-item "><a onClick={() => sortOrder("topSale")}>پر‌‌فروش ترین </a></span>&nbsp; &nbsp;

                                                <span style={{ color: `${colorActiveIsNew}` }} class="sort-order-item "><a onClick={() => sortOrder("isNew")}>جدید ترین</a></span>&nbsp; &nbsp;


                                            </div>
                                        </div>
                                    }
                                </div>
                            </> :
                            <>
                                <div></div>
                                <div className='breadcrumb-div' >
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <Link href={`/product`}>
                                                    <a>
                                                        محصولات
                                                    </a>
                                                </Link>
                                            </li>

                                        </ol>
                                    </nav>
                                </div>

                                {
                                    posts.length > 0 &&
                                    <div className='d-flex justify-content-center'>

                                        <div className='filter '  >

                                            <span onClick={() => handleShow("filter")} class="sort-order-item font-weight-bold "> <img height={"20px"} width={"20px"} src={'/images/filter.png'} /> فیلترها </span> &nbsp; &nbsp;
                                        </div>

                                        <div className='sort-order '  >
                                            <span onClick={() => handleShow('sort')} class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی </span> &nbsp; &nbsp;
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

                            </>
                    } */}

                    </div>

                    <div className='breadcrumb-div' >
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href={`/product`}>
                                        <a>
                                            محصولات
                                        </a>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className='mb-1'>
                        <ProductCategoriesForProducts hideTitle={true} categories={categories} />
                    </div>



                    <div class="row mb-3">
                        {!mobileDevice &&
                            <div class="col-xl-3 col-lg-4 sidebar-right">
                                <ProductsFilterSidebar featuresIds={featuresIds}
                                    featuresValues={featuresValues}
                                    featuresTitles={featuresTitles} currentPage={true} title={title} isNew={isNew} posts={posts} featuresData={featuresData}
                                    topVisited={topVisited} topSale={topSale} hasInventory={hasInventory} productCategoryId={productCategoryId} brandId={brandId} isDetail={false} />
                            </div>
                        }

                        {
                            posts.length > 0 ?
                                <>
                                    <div class="col-xl-9 col-lg-8">

                                        {
                                            !mobileDevice ?
                                                <div className='sort-order text-center ' >
                                                    <div class="" style={{ display: "contents" }}>
                                                        <span class="sort-order-item font-weight-bold" onClick={() => sortOrder("")}><img  height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی: </span> &nbsp; &nbsp;
                                                        <span style={{ color: `${colorActiveTopVisited}` }} class="sort-order-item "><a onClick={() => sortOrder("topVisited")}>پر‌‌بازدید ترین </a></span>&nbsp; &nbsp;

                                                        <span style={{ color: `${colorActiveTopSale}` }} class="sort-order-item "><a onClick={() => sortOrder("topSale")}>پر‌‌فروش ترین </a></span>&nbsp; &nbsp;

                                                        <span style={{ color: `${colorActiveIsNew}` }} class="sort-order-item "><a onClick={() => sortOrder("isNew")}>جدید ترین</a></span>&nbsp; &nbsp;


                                                    </div>
                                                </div>

                                                :

                                                posts.length > 0 &&
                                                <div className='d-flex justify-content-center'>

                                                    <div className='filter '  >

                                                        <span onClick={() => handleShow("filter")} class="sort-order-item font-weight-bold "> <img height={"20px"} width={"20px"} src={'/images/filter.png'} /> فیلترها </span> &nbsp; &nbsp;
                                                    </div>

                                                    <div className='sort-order '  >
                                                        <span onClick={() => handleShow('sort')} class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی </span> &nbsp; &nbsp;
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
                                    </div>
                                </> :
                                <div className="col-xl-9 col-lg-8" >
                                    <div className="error-inner text-center">
                                        <img width={"60%"} height={"60%"} className="img-center" src='/images/no-products-found.png' alt="محصولی یافت نشد" />

                                    </div>
                                </div>
                        }

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

                        <Modal.Body >
                            <SortOrderFilter isNew={isNew} topVisited={topVisited} topSale={topSale} changeSortOrder={sortOrder} />
                        </Modal.Body> :
                        <Modal.Body style={{height:"500px" , overflowY:"scroll"}}>
                            <ProductsFilterSidebar featuresIds={featuresIds}
                                featuresValues={featuresValues}
                                featuresTitles={featuresTitles} currentPage={true} title={title} isNew={isNew} featuresData={featuresData}
                                topVisited={topVisited} topSale={topSale} hasInventory={hasInventory} productCategoryId={productCategoryId} brandId={brandId} isDetail={false} posts={posts} />
                        </Modal.Body>
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
    model.page = context?.query["PageNumber"];
    model.sorted = [];
    // console.log(context.query)

    model.filtered = [
        // { "column": "productCategoryId", "value": context?.query["ProductCategoryId"] },
        // { "column": "brandId", "value": context?.query["BrandId"] },
        // { "column": "hasInventory", "value": context?.query["HasInventory"] },
        { "column": "topSale", "value": context?.query["TopSale"] },
        { "column": "topVisited", "value": context?.query["TopVisited"] },
        { "column": "isNew", "value": context?.query["IsNew"] },
        { "column": "title", "value": context?.query["Title"] },
        { "column": "brand", "value": context?.query["Brand"] },
        { "column": "category", "value": context?.query["Category"] },
        { "column": "productCategory", "value": context?.query["ProductCategory"] },
        { "column": "isSpecialOffer", "value": context?.query["IsSpecialOffer"] }

        // { "column": "featuresIds", "value": context?.query["FeaturesId"] },
        // { "column": "featuresValues", "value": context?.query["FeaturesValue"] },
        // { "column": "featuresTitles", "value": context?.query["FeaturesTitle"] },


    ];




    let result = await productServices.getAll(model);

    let allCategories = await productCategoryServices.getUserAllList();
    let featuresData = [];
    // if (context?.query["ProductCategoryId"]) {
    //     let features = await productCategoryServices.getFeaturesForSearch(context?.query["ProductCategoryId"]);
    //     featuresData = features.data;
    // }

    var categories = await productCategoryServices.getUserList(10000000); // count=10

    return {
        props: {
            posts: result?.data,
            total: result?.total ?? null,
            brand: context.query["Brand"] ?? null,
            productCategory: context.query["ProductCategory"] ?? null,
            category: context.query["category"] ?? null,
            hasInventory: context.query["HasInventory"] ?? null,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,
            title: context.query["Title"] ?? null,
            // featuresIds: context.query["FeaturesId"] ?? null,
            // featuresValues: context.query["FeaturesValue"] ?? null,
            // featuresTitles: context.query["FeaturesTitle"] ?? null,
            allCategories: allCategories.data,
            featuresData: featuresData,
            categories: categories.data
        }
    }




}


