
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
import { brandServices } from 'services/catalog/brandServices';
import Brands from 'components/Brands';
import ProductsFilterSidebar from 'components/filters/products/ProductsFilterSidebar';
import BrandsFilterSidebar from 'components/filters/brands/BrandsFilterSidebar';



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



export default function Blog({ posts, total, title, isNew, topVisited, topSale,
     hasInventory, productCategoryId, brandId, allCategories, featuresData,
      featuresIds, featuresValues, featuresTitles, categories , brands , brand , productCategory ,category}) {
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

    // const categoryChangeHandler = (categoryId) => {

    //     const currentPath = router.pathname;
    //     const currentQuery = { ...router.query };
    //     currentQuery.PageNumber = 1;
    //     currentQuery.ArticleCategoryId = categoryId;
    //     //props.onChange(data.selected);
    //     router.push({
    //         pathname: currentPath,
    //         query: currentQuery,
    //     });
    // }


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
            pathname: "/brand",
            query: { ...model },
        });

    }


    return (
        <>
            <Head>
                <title> برند ها  </title>
                <meta name="description" content=" برند ها  " />
                <link rel="canonical" href="/brands"></link>
            </Head>
            <div class="service-details-page ">



                <div class="container">



                    <div className='breadcrumb-div' >
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href={`/brand`}>
                                        <a>
                                            برند ها
                                        </a>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className='mb-2'>
                    <Brands brands={brands} hideTitle={true} />
                    </div>



                    <div class="row mb-3">
                        {!mobileDevice &&
                            <div class="col-xl-3 col-lg-4 sidebar-right">
                                <BrandsFilterSidebar featuresIds={featuresIds}
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
                                                        <span onClick={() => sortOrder("")} class="sort-order-item font-weight-bold"><img height={"20px"} width={"20px"} src={'/images/sortorder.png'} /> مرتب سازی: </span> &nbsp; &nbsp;
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

                        <Modal.Body>
                            <SortOrderFilter isNew={isNew} topVisited={topVisited} topSale={topSale} changeSortOrder={sortOrder} />
                        </Modal.Body> :
                        <Modal.Body>
                            <BrandsFilterSidebar featuresIds={featuresIds}
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
        { "column": "topSale", "value": context?.query["TopSale"] },
        { "column": "topVisited", "value": context?.query["TopVisited"] },
        { "column": "isNew", "value": context?.query["IsNew"] },
        { "column": "title", "value": context?.query["Title"] },
        { "column": "brand", "value": context?.query["Brand"] },
        { "column": "category", "value": context?.query["Category"] },
        { "column": "productCategory", "value": context?.query["ProductCategory"] },

    ];




    let result = await productServices.getAll(model);

    let allCategories = await productCategoryServices.getUserAllList();
    let featuresData = [];
    if (context?.query["ProductCategoryId"]) {
        let features = await productCategoryServices.getFeaturesForSearch(context?.query["ProductCategoryId"]);
        featuresData = features.data;
    }

    let categories = await productCategoryServices.getUserList(10000000); // count=10

    let brands = await brandServices.getUserList(1000000); // count=10

    return {
        props: {
            posts: result?.data,
            total: result?.total ?? null,
            brandId: context.query["BrandId"] ?? null,
            productCategoryId: context.query["ProductCategoryId"] ?? null,
            hasInventory: context.query["HasInventory"] ?? null,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,
            title: context.query["Title"] ?? null,
            featuresIds: context.query["FeaturesId"] ?? null,
            featuresValues: context.query["FeaturesValue"] ?? null,
            featuresTitles: context.query["FeaturesTitle"] ?? null,
            allCategories: allCategories.data,
            featuresData: featuresData,
            categories: categories.data,
            brands:brands.data,
            brand: context.query["Brand"] ?? null,
            productCategory: context.query["ProductCategory"] ?? null,
            category: context.query["category"] ?? null,
        }
    }




}



