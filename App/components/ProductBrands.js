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

const MobileTestimonial = (props) => {
  
  const [count, setCount] = useState();
  useEffect(() => {
    if (isMobile) {
      setCount(1);
    } else {
      setCount(props?.products?.length >= 6 ? 6 : props?.products.length);
    }
  }, []);

  return (
    <div className="container">
      <CarouselProvider
        naturalSlideWidth={75}
        naturalSlideHeight={100}
        totalSlides={props?.products?.length}
        step={1}
        visibleSlides={count}
        isPlaying={true}
        infinite={true}
        interval={5000}
        playDirection="backward"
      >
        <div dir="ltr">
          <Slider style={{ height: "120px" }}>
            {props?.products?.map((q, indexx) => {
              return (
                <>
                  <Link href={"/product/" + q.id}>
                    <Slide
                      className="product-slide-box"
                      index={indexx}
                      title={q.productName}
                    >
                      <span style={{ position: "relative", bottom: "1%" }}>
                        <img
                          style={{ height: "80px" }}
                          src={`${ServerFileIdentifier()}${q.coverFile}`}
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
                        {q.productName}
                      </p>
                    </Slide>
                  </Link>
                </>
              );
            })}
          </Slider>
        </div>
        <ButtonNext>
          <span className=" flip-h flaticon-chevron-pointing-to-the-left"></span>
        </ButtonNext>
        <ButtonBack>
          <span className="flaticon-chevron-pointing-to-the-left"></span>
        </ButtonBack>
      </CarouselProvider>
    </div>
  );
};

const ProductBrands = (props) => {
  let [activeSlide, setActiveSlide] = useState(1);
  useEffect(() => {
    setActiveSlide(2);
  });

  return (
    <section className={`request-a-call-back ${props.hideTitle == true ? null : "pdt-15"}`}>
      <div
        className="section-title text-center wow fadeInUp"
        data-wow-delay="0ms"
        data-wow-duration="1500ms"
      >
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-8 mx-auto">
              {props.hideTitle == true ? null : <div className="title-box-center">
                <h2 className="sub-title-center text-primary-color">
                  دسته‌بندی محصولات
                </h2>
              </div>
              }
            </div> */}
          </div>
        </div>
      </div>
      <div className="section-content">
        <MobileTestimonial products={props.products} />
      </div>
    </section>
  );
};

export default ProductBrands;
