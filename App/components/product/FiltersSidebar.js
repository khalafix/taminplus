import React, { useState, useEffect } from "react";

import { Button, Card, Col, Row } from "react-bootstrap";

import Select from "react-select";
import { comboServices } from "services/base-Info/comboService";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LoadingButton from "components/LoadingButton";
import { productCategoryServices } from "services/catalog/productCategoryServices";
import { brandServices } from "services/catalog/brandServices";
import { getUrl } from "helpers/Helpers";

var moment = require("jalali-moment");

const FilterSidebar = ({ props, onFinish }) => {
  const router = useRouter();

  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [selectedSubCategoryTitle, setSelectedSubCategoryTitle] = useState("");
  const [dataFeaturesData, setFeaturesData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");

  const { register, handleSubmit, watch, errors, reset } = useForm();

  useEffect(() => {
    if (props.productCategoryId) {
      setChangeCategory(true);
    }
    if (props.brandId) {
      setChangeBrands(true);
    }
    (async () => {
      let brandsData = await comboServices.getBrands();
      setBrands(brandsData);
      let productCategoryData = await comboServices.getProductCategory();
      setProductCategory(productCategoryData);
    })();
  }, []);

  const selectSubCategoryHandler = async (e) => {
    if (e) {
      setSelectedSubCategory(e);
      let title = productCategory.find((f) => f.value == e).text;
      setSelectedSubCategoryTitle(title);
      const result = await productCategoryServices.getCategoryByParentId(title);
      setCategory([]);
      setCategory(result.data);
    }
  };

  const selectChangeBrandHandler = async (e) => {

    if (e) {
      let title = brands.find(f => f.value == e).text ? brands.find(f => f.value == e).text : brands.find(f => f.value == e).title;
      setSelectedBrand(title);

      if (selectedCategory) {
        let categoriesFeatures = await productCategoryServices.getFeaturesByCategoryAndBrand(selectedCategory, title); // count=10

        setFeaturesData(categoriesFeatures.data);
      }

    }
  };

  const selectChangeCategoryHandler = async (e) => {

    if (e) {
      let title = category.find(f => f.value == e).text;
      setSelectedCategory(title);

      let brandItems = await brandServices.getUserListByProductCategoryId(title);
      // setBrands([]);

      let tempBrand = [];
      for (let index = 0; index < brandItems.data.length; index++) {
        const element = brandItems.data[index];
        tempBrand.push({ value: element.id, title: element.title, key: element.id, label: element.title, text: element.title })
      }
      setBrands([...tempBrand]);


    }
  };


  const selectChangeFeaturesHandler = async (e) => {

    if (e) {

      let feature = dataFeaturesData.find(f => f.featureValue == e).enTitle ? dataFeaturesData.find(f => f.featureValue == e).enTitle : dataFeaturesData.find(f => f.featureValue == e).productName;
      setSelectedFeature(feature)

    }
  };

  const onSubmit = async (data) => {
    let model = {};
    model.Brand = selectedBrand;
    model.ProductCategory = selectedSubCategoryTitle;
    model.Category = selectedCategory;
    model.Title = data.title;
    if (selectedFeature) {
      router.push({
        pathname: `/product/${getUrl(selectedFeature)}`,
      });
    }
    else {
      router.push({
        pathname: "/product",
        query: { ...model },
      });
    }

  };

  return (
    <>
      <form className="search-container" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col xs={12} md={1} className="pb-1">
            {/* <input
              style={{ width: "100%" }}
              ref={register({
                required: false,
              })}
              
              className="form-control main-filter-input"
              name="title"
              placeholder="جستجو با نام"
            /> */}
          </Col>
          <Col xs={12} md={2} className="pb-1 ">
            <Select
              isSearchable
              placeholder=" محصول"
              className="course-select w-100 h-20"
              onChange={(e) => selectSubCategoryHandler(e.value)}
              isRtl
              options={productCategory}
            />
          </Col>
          <Col xs={12} md={2} className="pb-1">
            <Select
              isSearchable
              placeholder=" قطعه"
              className="course-select w-100"
              onChange={(x) => selectChangeCategoryHandler(x.value)}
              isRtl
              options={category.map((q) => ({
                value: q.value,
                label: q.title,
              }))}
            />
          </Col>

          <Col xs={12} md={2} className="pb-1">
            <Select
              onChange={(y) => selectChangeBrandHandler(y.value)}
              isSearchable
              placeholder=" برندها "
              className="course-select w-100"
              isRtl
              options={brands}
            />
          </Col>

          <Col xs={12} md={2} className="pb-1">
            <Select
              isSearchable
              placeholder=" ویژگی"
              className="course-select w-100"
              onChange={(y) => selectChangeFeaturesHandler(y.value)}
              isRtl
              options={dataFeaturesData.map((q) => ({
                value: q.featureValue,
                label: q.featureValue,
              }))}
            />
          </Col>
          <Col xs={12} md={2} className="pb-1">
            <LoadingButton
              width={"100%"}
              loading={false}
              text=" جستجو کن"
              color={"gray"}

            />
          </Col>
          <Col xs={12} md={1} className="pb-1">

          </Col>


        </Row>
      </form>
    </>
  );
};

const FiltersSidebar = (props) => {
  return (
    <FilterSidebar props={props} />
  );
};

export default FiltersSidebar;
