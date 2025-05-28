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
import { brandServices } from 'services/catalog/brandServices';
import BannerOfferForBrand from 'components/banner/BannerOfferForBrand';
import BrandsProductsCategoryFilterSidebar from 'components/filters/brands/BrandsProductsCategoryFilterSidebar';
import { removeDash } from 'helpers/Helpers';
import BrandFilterSidebar from 'components/filters/brands/BrandFilterSidebar';
import Link from 'next/link';
import BrandsCategory from 'components/BrandsCategory';



const ProductList = ({ data, error }) => {

    return data.map((post) => {
        return (
            <ProductThumb post={post} isBlog={true} />
        );
    })
}



export default function Blog({ posts, total, isNew, topVisited,
    topSale, brandId, hasInventory, title, productCategoryId,
    allCategories, featuresData, featuresIds, featuresValues, featuresTitles, categories
    , banner, brandsData, brand }) {
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
            pathname: `/brand/${brand}`,
            query: { ...model },
        });

    }


    return (
        <>
            <Head>
                <title> {brand}  </title>
                <meta name="description" content={brandsData?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))} />
                <link rel="canonical" href={`/brand/${brandId}`}></link>
            </Head>
            <div class="service-details-page ">
                <div class="container">

                    <div className='breadcrumb-div' >
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href="/brand">
                                        <a >برندها</a>
                                    </Link>
                                </li>
                                {
                                    <li class="breadcrumb-item active" aria-current="page">{brandsData?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.title}</li>

                                }
                            </ol>
                        </nav>
                    </div>
                    <div className='row mb-1'>
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            <BannerOfferForBrand brand={brand} props={banner} />

                        </div>

                        <div class="col-xl-9 col-lg-8">

                            <BrandsCategory brand={brand}
                                hideTitle={true} categories={categories} />
                        </div>


                    </div>
                    <div class="row mb-3" >
                        <div class="col-xl-3 col-lg-4 sidebar-right">
                            {!mobileDevice && <BrandFilterSidebar
                                brand={brand}
                                categories={categories}
                                featuresIds={featuresIds} brandId={brandId}
                                brandsData={brandsData}
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
                                            brandsData?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description &&
                                            <a onClick={() => setOpen(!open)} >
                                                بیشتر ...
                                            </a>
                                        } */}
                                        {/* <Collapse in={open} > */}
                                        <div className='container'>
                                            {
                                                brandsData?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description &&
                                                <div class="row mb-3 box-remark">
                                                    <div className="col-xl-12 entry-content product-detail-slider">
                                                        <div dangerouslySetInnerHTML={{ __html: brandsData?.find(f => f.title == removeDash(brand) || f.enTitle == removeDash(brand))?.description }} className=""></div>
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
                            <BrandFilterSidebar
                                categories={categories}
                                brand={brand}
                                brandsData={brandsData}
                                brandId={brandId}
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
    model.brand = context.query["slug"] ?? null;
    model.filtered = [
        { "column": "brand", "value": model.brand },
        { "column": "topSale", "value": context?.query["TopSale"] },
        { "column": "topVisited", "value": context?.query["TopVisited"] },
        { "column": "isNew", "value": context?.query["IsNew"] },
    ];
    let featuresData = [];

    let result = await productServices.getAll(model);

    let allCategories = await productCategoryServices.getUserAllList();

    let resultBrands = await brandServices.getUserList(1000000);

    let banner = await bannerServices.getAll(PositionPlace.OfferForBrand);
    let categories = await brandServices.getUserProductCategoryByBrandTitle(model.brand);
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
            // brandId: model.brandId,
            brandsData: resultBrands.data,
            brand: model.brand,
            topSale: context.query["TopSale"] ?? null,
            topVisited: context.query["TopVisited"] ?? null,
            isNew: context.query["IsNew"] ?? null,

        }
    }


}


