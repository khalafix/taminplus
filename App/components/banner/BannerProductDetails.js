
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerProductDetails = ({ banner }) => {

    return (
        <section style={{ width: "100%" }} >
            {
                banner?.fileAttachment[0] ?
                    <>
                        <Row >
                            {isMobile ?
                                <Col sm={12} md={12}>
                                    <div>
                                        {
                                            banner?.link && banner?.link !== "undefined" ?
                                                <a target={"_blank"} href={banner?.link}>
                                                    <img src={`${ServerFileIdentifier()}${banner?.fileAttachment[0]}`} />
                                                </a>
                                                :
                                                <img src={`${ServerFileIdentifier()}${banner?.fileAttachment[0]}`} />
                                        }
                                    </div>
                                </Col>
                                :
                                <>
                                    <Col sm={12} md={12}>
                                        <div>
                                            {
                                                banner?.link && banner?.link !== "undefined" ?
                                                    <a target={"_blank"} href={banner?.link}>
                                                        <img src={`${ServerFileIdentifier()}${banner?.fileAttachment[0]}`} style={{ width: "100%", height: "58px" }} />
                                                    </a>
                                                    :
                                                    <img src={`${ServerFileIdentifier()}${banner?.fileAttachment[0]}`} style={{ width: "100%", height: "58px" }} />
                                            }
                                        </div>
                                    </Col>

                                </>

                            }

                        </Row>
                    </> : null
            }


        </section>
    )
}

export default BannerProductDetails;