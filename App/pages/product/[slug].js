import Head from "next/head";
import { useEffect, useState } from "react";
import { isMobileOnly, isMobile, isDesktop } from "react-device-detect";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
  DotGroup,
} from "pure-react-carousel";
import { getUrl, removeDash, webpConverter } from "helpers/Helpers";
import { productServices } from "services/catalog/productServices";
var moment = require("jalali-moment");
import { ServerFileIdentifier } from "constants/configs";
import ProductDetail from "components/product/ProductDetail";
import SimilarDetail from "components/product/SimilarDetail";
import { connect } from "react-redux";
import { addItem } from "redux/actions/shoppingCardActions";
import { toast } from "react-toastify";
import ProductInformation from "components/product/ProductInformation";
import { bannerServices } from "services/media/bannerServices";
import { productCategoryServices } from "services/catalog/productCategoryServices";

import { PositionPlace } from "utils/positionPlace";
import BannerProductDetails from "components/banner/BannerProductDetails";
import BannerImmediateOffer from "components/banner/BannerImmediateOffer";

import SimilarProduct from "components/product/SimilarProduct";
import SliderForFile from "components/product/SliderForFile";
import SpecialOfferProduct from "components/product/SpecialOfferProduct";
import { Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

const ProductItem = ({
  props,
  banner,
  similarProductItem,
  specialOfferProduct,
  addItem,
  bannerProductDetails,
  allCategories,
}) => {
  let [orderInfos, setOrderInfos] = useState();
  let [indexItem, setIndexItem] = useState([]);
  const [productData, setProductData] = useState(props);

  if (!props) {
    return null;
  }

  useEffect(() => {}, [props?.productName]);

  const addProducts = (data) => {
    setIndexItem([
      ...indexItem,
      {
        id: data.id,
        productName: data.productName,
        price: data.price,
        discountedPrice: data.discountedPrice,
        coverFile: data.coverFile,
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        brandName: data.brandName,
        index: data.index,
        productFeatureValues: data.productFeatureValues,
        enTitle: data.enTitle,
      },
    ]);

    data.index = indexItem.length > 0 ? indexItem.length : 0;
    addItem(data);
    // toast.success('✔️ آیتم به سبد خرید شما اضافه شد');
  };
  useEffect(() => {
    async function updateProduct() {
      try {
        const response = await productServices.getbyTitle(productData.enTitle);
        if (response?.data) {
          debugger;
          setProductData(response.data); // قیمت جدید اینجا میاد
        }
      } catch (err) {
        console.error("خطا در بروزرسانی قیمت محصول:", err);
      }
    }

    if (typeof window !== "undefined") {
      updateProduct();
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {props.seoTitle &&
          props.seoTitle != "null" &&
          props.seoTitle !== "undefined"
            ? props.seoTitle
            : props.productName}
        </title>
        <meta
          name="description"
          content={
            props.seoDescription && props.seoDescription !== "undefined"
              ? props.seoDescription
              : props.productName
          }
        />
        {/* <link rel="canonical" href={`/product/${props.id}`}></link> */}
      </Head>
      <section className="blog-single-news ">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link href={`/product`}>
                  <a>محصولات</a>
                </Link>
              </li>
              {props.subCategoryName ? (
                <li class="breadcrumb-item">
                  <Link href={`/category/${getUrl(props.subCategoryName)}`}>
                    <a>
                      {/* {props.subCategoryName} */}
                      {
                        allCategories?.find(
                          (f) =>
                            f.categoryName ==
                              removeDash(props.subCategoryName) ||
                            f.enName == removeDash(props.subCategoryName)
                        )?.categoryName
                      }
                    </a>
                  </Link>
                </li>
              ) : null}
              <li class="breadcrumb-item">
                <Link
                  href={`/product/category/${getUrl(
                    props.subCategoryName
                  )}/${getUrl(props.categoryName)}`}
                >
                  <a>
                    {/* {props.categoryName} */}
                    {
                      allCategories?.find(
                        (f) =>
                          f.categoryName == removeDash(props.categoryName) ||
                          f.enName == removeDash(props.categoryName)
                      )?.categoryName
                    }
                  </a>
                </Link>
              </li>

              <li class="breadcrumb-item">
                <Link
                  href={`/product/categorybrand/${getUrl(
                    props.subCategoryName
                  )}/${getUrl(props.categoryName)}/${getUrl(props.brandName)}`}
                >
                  <a>{props.brandName}</a>
                </Link>
              </li>
              <li class="breadcrumb-item  active" aria-current="page">
                {props.productName}
              </li>
            </ol>
          </nav>

          <div className="row">
            {props?.similarModel?.similarArtcle ||
            props?.similarModel?.similarVideo ? (
              <>
                <div className="col-xl-9 mb-3">
                  <Card>
                    <Row>
                      <Col xl={6}>
                        {" "}
                        <SliderForFile
                          productName={props.productName}
                          data={props}
                          files={props.orginalFileAttachments}
                          name="product-detail-slider"
                        />
                      </Col>
                      <Col xl={6}>
                        {" "}
                        <ProductDetail
                          hideImage={true}
                          data={props}
                          selectProduct={addProducts}
                        />
                      </Col>
                    </Row>
                  </Card>
                </div>
                <div className="col-xl-3 col-lg-3 ">
                  <SimilarDetail data={props} id={props.id} />
                </div>
              </>
            ) : (
              <>
                <div className="col-xl-6 col-lg-6 pr-5 pt-5 ">
                  <SliderForFile
                    productName={props.productName}
                    data={props}
                    files={props.orginalFileAttachments}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 ">
                  <ProductDetail
                    data={productData}
                    selectProduct={addProducts}
                  />
                </div>
              </>
            )}
          </div>

          <div className="row mt-5">
            <div className="col-xl-9 col-lg-9">
              <ProductInformation data={props} />
            </div>
            <div className="col-xl-3 col-lg-3  batch-buy-product-container">
              <div className="batch-buy-product-container">
                <BannerImmediateOffer props={banner} />
              </div>
            </div>
          </div>

          {similarProductItem?.similarProducts?.length > 0 ? (
            <>
              <div className=" mt-5">
                <div className="col-12">
                  <SimilarProduct props={similarProductItem} id={props.id} />
                </div>
              </div>
            </>
          ) : null}

          <div className=" mt-5">
            <BannerProductDetails banner={bannerProductDetails} />
          </div>
          {specialOfferProduct?.length > 0 ? (
            <>
              <div className=" mt-2">
                <div className="col-12">
                  <SpecialOfferProduct
                    products={specialOfferProduct}
                    id={props.id}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ params }) {
  // var props = await getpropsByTitle(params.slug);

  var props = await productServices.getbyTitle(params.slug);

  var bannerData = await bannerServices.getAll(PositionPlace.ImmediateOffer);
  var similarProduct = await productServices.getUserSimilarProductByTitle(
    params.slug
  );
  var specialOfferProduct = await productServices.getSpecialOfferProductList(
    10
  );
  let bannerProductDetails = await bannerServices.getAll(
    PositionPlace.ProductDetails
  );
  let allCategories = await productCategoryServices.getUserAllList();

  return {
    props: {
      props: props.data,
      banner: bannerData.data,
      similarProductItem: similarProduct.data,
      specialOfferProduct: specialOfferProduct.data,
      bannerProductDetails: bannerProductDetails.data.model,
      allCategories: allCategories.data,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  var paths = await productServices.getAllTitle();
  paths = paths.data.map((q) => ({
    params: { slug: `${getUrl(q).toString()}` },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

const mapStateToProps = (state) => {
  return {
    items: state.shoppingCard.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //removeItem: (id) => dispatch(removeItem(id)),
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
