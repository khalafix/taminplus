import Image from "next/image";
import { useEffect, useState } from "react";
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ServerFileIdentifier } from "constants/configs";
import Link from "next/link";
import { Card, Form } from "react-bootstrap";
import { getUrl } from "helpers/Helpers";

const MobileTestimonial = (props) => {
    const [count, setCount] = useState();
    useEffect(() => {
        if (isMobile) {
            setCount(1)
        } else {
            setCount(props?.products.length >= 5 ? 5 : props?.products.length)
        }
    }, [])


    return (
        <div className="container">
            <CarouselProvider
                naturalSlideWidth={1}
                naturalSlideHeight={2}
                totalSlides={props?.products?.length}
                step={1}
                visibleSlides={count}
                isPlaying={true}
                infinite={true}
                interval={5000}
                playDirection="backward"
                isIntrinsicHeight={true}
            >
                <div dir="ltr">
                    <Slider >
                        {props?.products?.map((q, indexx) => {
                            return (
                                <>

                                    <Link href={`/product/${getUrl(q.enTitle ? q.enTitle : q.productName)}`}>

                                        <Slide index={indexx} title={q.productName}>

                                            <Card
                                                className={`product-slide-box mb-1 ${!isMobile && "ml-4-1"}`}
                                                style={{ maxWidth: "285px", minHeight: "285px" }}>
                                                <Card.Img variant="top" alt={q.productName} className="rounded mx-auto d-block" style={{ height: '150px', width: '150px' }} src={`${ServerFileIdentifier()}${q.coverFile}`}>
                                                </Card.Img>
                                                <Card.Body style={{ maxHeight: "130px" }}>
                                                    <Card.Text className="product-slider-title" style={{ marginBottom: "0%", fontWeight: "bold" }}>
                                                        <span style={{ fontWeight: "bold" }}> {q.productName} </span>
                                                    </Card.Text>
                                                    <Card.Text style={{ textAlign: "left", marginTop: "3%" }}>
                                                        {
                                                            q.isShowAlert == true ? null :
                                                                q.discountedPrice ?
                                                                    <>
                                                                        <p
                                                                            className="mb-0"
                                                                            style={{ fontWeight: "bold" }}
                                                                        >
                                                                            {" "}
                                                                            <small style={{ float: "left" }}>
                                                                                ریال
                                                                            </small>{" "}
                                                                            &nbsp;{" "}
                                                                            <span>
                                                                                {" "}
                                                                                {q.discountedPrice.toLocaleString()}{" "}
                                                                            </span>{" "}
                                                                            <span class="text-muted">
                                                                                <strike> {q.price.toLocaleString()} </strike>{" "}
                                                                            </span>
                                                                        </p>
                                                                    </>
                                                                    :
                                                                    <p style={{ fontWeight: "bold" }}><small style={{ float: "left" }}>ریال</small> &nbsp;  <span > {(q.price).toLocaleString()} </span>  </p>

                                                        }
                                                    </Card.Text>


                                                </Card.Body>

                                            </Card>

                                        </Slide >
                                    </Link>
                                </>
                            )
                        })}
                    </Slider>
                </div>

                {
                    !isMobile &&
                    <>
                        <ButtonNext>
                            <span className="flaticon-down-arrow flip-90-right"></span>
                        </ButtonNext>
                        <ButtonBack>
                            <span className="flaticon-down-arrow flip-90-left"></span>
                        </ButtonBack>
                    </>
                }

            </CarouselProvider>
        </div>
    )
}


const SpecialOfferProduct = ({ products, id }) => {
    let [activeSlide, setActiveSlide] = useState(1);
    useEffect(() => {
        setActiveSlide(2);
    }, [id]);

    return (
        <section className="request-a-call-back pdt-20 pdb-40">
            <div className="section-title text-center wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="title-box-center">

                                <h2 className="sub-title-center section-main-title ">    پیشنهاد ویژه</h2>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-content">

                <MobileTestimonial products={products} />

            </div>
        </section>
    );
};


export default SpecialOfferProduct;