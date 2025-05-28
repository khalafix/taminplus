import Image from "next/image";
import { useEffect, useState } from "react";
import { isMobileOnly, isMobile, isDesktop } from "react-device-detect";
import Link from "next/link";

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
      setCount(props?.brands?.length >= 6 ? 6 : props?.brands.length);
    }
  }, []);

  return (
    props?.brands?.length >= 0 &&
    <div className="container">
      <CarouselProvider
        naturalSlideWidth={75}
        naturalSlideHeight={100}
        totalSlides={props?.brands?.length}
        step={1}
        visibleSlides={count}
        isPlaying={props?.brands?.length > 6 ? true : false}
        infinite={true}
        interval={5000}
        playDirection="backward"
      >
        <div dir="ltr">
          <Slider style={{ height: "100px" }}>
            {props?.brands?.map((q, indexx) => {
              return (
                <Link href={`/product/categorybrand/${props.subcategory}/${props.category}/${getUrl(q.enTitle ? q.enTitle : q.title)}`}>

                  <Slide index={indexx} className="brand-slide-box">
                    <img
                      style={{ height: "100px" }}
                      src={`${ServerFileIdentifier()}${q.file}`}
                    />
                  </Slide>
                </Link>
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

const Brands = (props) => {

  let [activeSlide, setActiveSlide] = useState(1);
  useEffect(() => {
    setActiveSlide(2);
  });

  return (
    <section className={`${props.hideTitle == true ? "section-border-page" : " section-border "}  request-a-call-back ${props.hideTitle == true ? null : "pdt-15"}`}>
      {props.hideTitle == true ? null :
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
                    برندهای تامین پلاس
                  </h2>
                </div>

              </div>
            </div>
          </div>
        </div>
      }
      <div className="section-content">
        <MobileTestimonial brands={props.brands} category={props.category} subcategory={props.subcategory} />
      </div>
    </section>
  );
};

export default Brands;
