import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobileOnly, isMobile, isDesktop } from "react-device-detect";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ServerFileIdentifier } from "constants/configs";
import { getUrl } from "helpers/Helpers";

const MobileTestimonial = (props) => {
  const [count, setCount] = useState();
  useEffect(() => {
    if (isMobile) {
      setCount(1);
    } else {
      setCount(props?.categories?.length >= 6 ? 6 : props?.categories.length);
    }
  }, []);

  return (
    props?.categories?.length > 0 &&
    <div className="container">
      <CarouselProvider
        naturalSlideWidth={75}
        naturalSlideHeight={100}
        totalSlides={props?.categories?.length}
        step={1}
        visibleSlides={count}
        isPlaying={props?.categories?.length > 6 ? true : false}
        infinite={true}
        interval={5000}
        playDirection="backward"
      >
        <div dir="ltr">
          <Slider style={{ height: "120px" }}>
            {props?.categories?.map((q, indexx) => {
              return (
                <>
                  <Link href={`/category/${getUrl(q.enName ? q.enName : q.categoryName)}`}>
                    <Slide
                      className="product-slide-box"
                      index={indexx}
                      title={q.categoryName}
                    >
                      <span style={{ position: "relative" }}>
                        <img
                          style={{ height: "80px" }}
                          src={`${ServerFileIdentifier()}${q.file}`}
                        />
                      </span>
                      <p
                        className="product-slider-title"
                        style={{
                          position: "relative",
                          fontWeight: "bold",
                          bottom: "1.5%",
                          top: "15px",
                        }}
                      >

                        {props.showTitle == true && q.categoryName}
                      </p>
                    </Slide>
                  </Link>
                </>
              );
            })}
          </Slider>
        </div>
        <ButtonNext className="custom-next-button">
          <span className="flaticon-down-arrow flip-90-right "></span>
        </ButtonNext>
        <ButtonBack className="custom-back-button">
          <span className="flaticon-down-arrow flip-90-left"></span>
        </ButtonBack>
      </CarouselProvider>
    </div>
  );
};

const ProductCategoriesForProducts = (props) => {
  let [activeSlide, setActiveSlide] = useState(1);
  useEffect(() => {
    setActiveSlide(2);
  });

  return (
    <section className={`${props.hideTitle == true ? "section-border-page" : " section-border "}  request-a-call-back ${props.hideTitle == true ? null : "pdt-15"}`}>
      {
        props.hideTitle == true ? null :

          <div
            className="section-title text-center wow fadeInUp"
            data-wow-delay="0ms"
            data-wow-duration="1500ms"
          >
            <div className="container">

              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="title-box-center">
                    <h2 className="sub-title-center section-main-title">
                      دسته بندی های تامین پلاس
                    </h2>
                  </div>

                </div>
              </div>
            </div>
          </div>
      }



      <div className="section-content">
        <MobileTestimonial showTitle={props.showTitle} categories={props.categories} category={props.category} />
      </div>
    </section>
  );
};

export default ProductCategoriesForProducts;
