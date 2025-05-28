import About from "components/About";
import Article from "components/article/Article";
import BannerPartOne from "components/banner/BannerPartOne";
import BannerPartTwo from "components/banner/BannerPartTwo";

import Faq from "components/Faq";
import SectionBanner from "components/SectionBanner";
import Service from "components/Service";
import ProductCategories from "components/ProductCategories";

import Brands from "components/Brands";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { productCategoryServices } from "services/catalog/productCategoryServices";
import { brandServices } from "services/catalog/brandServices";
import TopVisitedProduct from "components/product/TopVisitedProduct";
import TopSaleProduct from "components/product/TopSaleProduct";

import { productServices } from "services/catalog/productServices";
import TopNewProduct from "components/product/TopNewProduct";
import { Col, Row, Container } from "react-bootstrap";
import { bannerServices } from "services/media/bannerServices";
import { PositionPlace } from "utils/positionPlace";
import BannerPartThree from "components/banner/BannerPartThree";
import BannerPartFour from "components/banner/BannerPartFour";
import ProductFilterSidebar from "components/product/ProductFilterSidebar";
import Image from "next/image";
import FiltersSidebar from "components/product/FiltersSidebar";
import ProductCategoriesForProducts from "components/ProductCategoriesForProducts";
import MobileFilter from "components/MobileFilter";

export default function Home({
  posts,
  faqs,
  about,
  services,
  categories,
  brands,
  carousels,
  socialLinks,
  structureDataList,
  structureDataRate,
  topVisitedProducts,
  topSaleProducts,
  topNewProducts,
  bannerPartOne,
  bannerPartTwo,
  bannerPartThree,
  bannerPartFour,
  bannerAboveTheMenu,
}) {
  var dispatch = useDispatch();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setIsMobileDevice(true)
    }
    else {
      setIsMobileDevice(false)
    }
  }, []);
  // if (menus) {
  // 	dispatch({
  // 		type: "GET_MENU_ITEMS",
  // 		payload: menus
  // 	})
  // 	dispatch({
  // 		type: "GET_FOOTER_ITEMS",
  // 		payload: footerLinks.items
  // 	})
  // 	dispatch({
  // 		type: "GET_SOCIAL_NETWORKS",
  // 		payload: socialLinks.items
  // 	})
  // }

  return (
    <div>
      <Head>
        <title> تامین پلاس زنجیره‌ی تامین قطعات </title>
        <meta name="description" content=" تامین پلاس زنجیره ی تامین قطعات " />

      </Head>
      {
        !isMobileDevice &&
        <>
          <div className="pt-1 mb-2 ">

            <Container fluid={true} className="filter-container">
              <FiltersSidebar currentPage={false} />
            </Container>
            {
              !isMobile &&
              <BannerPartOne banner={bannerPartOne} />

            }
          </div>

          <div className="container mt-4">
            <ProductCategoriesForProducts showTitle={true} categories={categories} />

            <BannerPartTwo banner={bannerPartTwo} />

            <Brands brands={brands} />

            <TopVisitedProduct products={topVisitedProducts} />
            <BannerPartThree banner={bannerPartThree} />

            <TopSaleProduct products={topSaleProducts} />
            <BannerPartFour banner={bannerPartFour} />

            <TopNewProduct products={topNewProducts} />
          </div>
        </>

      }

      {
        isMobileDevice &&

        <div className="container ">
          <MobileFilter />

          <ProductCategoriesForProducts showTitle={true} categories={categories} />
          <BannerPartOne isMobile={isMobileDevice} banner={bannerPartOne} />

          <BannerPartTwo banner={bannerPartTwo} />

          <Brands brands={brands} />
          <div className="col-12">
            <TopVisitedProduct products={topVisitedProducts} />
          </div>
          <BannerPartThree banner={bannerPartThree} />
          <div className="col-12">
            <TopSaleProduct products={topSaleProducts} />
          </div>

          <BannerPartFour banner={bannerPartFour} />
          <div className="col-12">
            <TopNewProduct products={topNewProducts} />
          </div>

        </div>

      }



    </div>
  );
}

export async function getStaticProps() {
  var categories = await productCategoryServices.getUserList(10000000); // count=10
  var brands = await brandServices.getUserList(1000000); // count=10

  var bannerPartOne = await bannerServices.getAll(PositionPlace.PartOne);
  var bannerPartTwo = await bannerServices.getAll(PositionPlace.PartTwo);
  var bannerPartThree = await bannerServices.getAll(PositionPlace.PartThree);
  var bannerPartFour = await bannerServices.getAll(PositionPlace.PartFour);
  // var bannerAboveTheMenu = await bannerServices.getAll(PositionPlace.AboveTheMenu);

  var topVisitedProducts = await productServices.getTopVisitedProductList(10); // count=10
  var topSaleProducts = await productServices.getTopSaleProductList(10); // count=10
  var topNewProducts = await productServices.getTopNewProductList(10); // count=10

  return {
    props: {
      // posts,
      // faqs,
      // about,
      // services,
      categories: categories.data,
      brands: brands.data,
      topVisitedProducts: topVisitedProducts.data,
      topSaleProducts: topSaleProducts.data,
      topNewProducts: topNewProducts.data,
      bannerPartOne: bannerPartOne.data,
      bannerPartTwo: bannerPartTwo.data,
      bannerPartThree: bannerPartThree.data,
      bannerPartFour: bannerPartFour.data,
      // bannerAboveTheMenu:bannerAboveTheMenu.data,
      // carousels: banner,
      // socialLinks,
      // structureDataList,
      // structureDataRate,
    },
    // revalidate: 86400
    revalidate: 30,
  };
}
