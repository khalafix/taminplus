
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerPartFour = (props) => {
    return (
        <section className="my-4 request-a-call-back pdt-15">



            {isMobile == true ?

                <>


                    {props?.banner?.list?.map((q, indexx) => {
                        return (
                            <>
                                <Row style={{ marginTop: "2%" }} >
                                    {
                                        q.link && q?.link !== "undefined" ?
                                            <>
                                                <Col xs={12} sm={12} md={12}>
                                                    <a target={"_blank"} href={q?.link}>
                                                        <img width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                                    </a>
                                                </Col>
                                            </>
                                            :
                                            <Col xs={12} sm={12} md={12}>
                                                <img className="rounded" width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                            </Col>
                                    }

                                </Row>
                            </>
                        )
                    })}

                </> :


                <Row >


                    {props?.banner?.list?.map((q, indexx) => {
                        return (
                            <>

                                {
                                    q.link && q?.link !== "undefined" ?
                                        <>
                                            <Col sm={6} md={6} >
                                                <a target={"_blank"} href={q?.link}>
                                                    <img width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                                </a>
                                            </Col>
                                        </>
                                        :
                                        <Col sm={6} md={6} >
                                            <img width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                        </Col>
                                }

                            </>
                        )
                    })}


                </Row>
            }
        </section>
    )
}

export default BannerPartFour;