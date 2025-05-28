
import { ServerFileIdentifier } from "constants/configs";
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
const BannerPartOne = (props) => {
    const router = useRouter();

    const clickSlide = (e) => {
        router.push({
            pathname: e,
        })
    }

    return (
        <section className={`${props.isMobile==true ? "my-4 " : "main-slider"} `}>
            <CarouselProvider
                totalSlides={props?.banner?.list?.length}
                step={1}
                visibleSlides={1}
                currentSlide={0}
                horizontalPixelThreshold={0}
                playDirection="backward"
                naturalSlideHeight={1}
                naturalSlideWidth={2}
                isPlaying={true}
                infinite={true}
                interval={5000}
                isIntrinsicHeight={true}
            >
                <div dir="ltr">
                    <Slider   >
                        {props?.banner.list?.map((q, indexx) => {
                            return (
                                <>
                                    {
                                        q?.link && q?.link !== "undefined" ?

                                            <Slide onDoubleClickCapture={() => clickSlide(q.link)}
                                                onClickCapture={() => clickSlide(q.link)} index={indexx} >
                                                <div onClick={() => clickSlide(q.link)}>
                                                    {
                                                        q?.link && q?.link !== "undefined" ?
                                                            <a target={"_blank"} href={q?.link}>
                                                                <img src={`${ServerFileIdentifier()}${q?.fileAttachment[0]}`} style={{ width: '100%', objectFit: 'contain' }} />
                                                            </a>
                                                            :
                                                            <img src={`${ServerFileIdentifier()}${q?.fileAttachment[0]}`} style={{ width: '100%', objectFit: 'contain' }} />
                                                    }
                                                </div>
                                            </Slide>
                                            :

                                            <Slide index={indexx} >
                                                <div>
                                                    {
                                                        q?.link && q?.link !== "undefined" ?
                                                            <a target={"_blank"} href={q?.link}>
                                                                <img src={`${ServerFileIdentifier()}${q?.fileAttachment[0]}`} style={{ width: '100%', objectFit: 'contain' }} />
                                                            </a>
                                                            :
                                                            <img src={`${ServerFileIdentifier()}${q?.fileAttachment[0]}`} style={{ width: '100%', objectFit: 'contain' }} />
                                                    }
                                                </div>
                                            </Slide>
                                    }

                                </>


                            )
                        })}
                    </Slider>
                    {/* <ButtonBack>{'<'}</ButtonBack>

                    <ButtonNext>{'>'}</ButtonNext> */}
                    <DotGroup />
                </div>

            </CarouselProvider>

            {/* <Carousel>
                {props?.banner.list?.map((q, indexx) => {
                    return (
                        // <Slide index={indexx} >  <div>
                        //     <img src={`${ServerFileIdentifier()}${q.fileAttachment}`} style={{ width: '100%' }} />
                        // </div>  </Slide>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${ServerFileIdentifier()}${q.fileAttachment}`}
                                alt={indexx}
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                    )
                })}


            </Carousel> */}
        </section>
    )
}

export default BannerPartOne;