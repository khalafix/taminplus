
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerPartThree = (props) => {
    return (
        <section className="my-4 request-a-call-back pdt-15">


            <Row >
                {props?.banner.list?.map((q, indexx) => {
                    return (
                        <>

                            {/* <Col xs={2} sm={2} md={2}></Col> */}


                            {
                                q.link && q.link != "null" && q.link != null && q.link !== "undefined" ?
                                    <Col md={3} className="mb-2">
                                        <a target={"_blank"} href={q.link}>
                                            <img width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                        </a>
                                    </Col>
                                    :
                                    <Col md={3} className="mb-2">
                                        <img className="rounded" width={"100%"} src={`${ServerFileIdentifier()}${q.fileAttachment}`} />
                                    </Col>
                            }

                        </>
                    )
                })}
            </Row>

        </section>
    )
}

export default BannerPartThree;