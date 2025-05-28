
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerImmediateOffer = ({ props }) => {
    return (
        <section  >
            <Row  className="mt-2">
                {isMobile ?

                    props?.model?.link && props?.model?.link !== "undefined" ?
                        <Col sm={12} md={12}>
                            <a target={"_blank"} href={props?.model?.link}>

                                <img src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                            </a>
                        </Col>
                        :
                        <Col sm={12} md={12}>
                            <img src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                        </Col>
                    :
                    <>

                        {
                            props?.model?.link && props?.model?.link !== "undefined" ?
                                <Col sm={12} md={12}>
                                    <a target={"_blank"} href={props?.model?.link}>

                                        <img src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`}  style={{ width: "100%" }}/>
                                    </a>
                                </Col>
                                :
                                <Col sm={12} md={12}>
                                    <img src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} style={{ width: "100%" }} />
                                </Col>
                        }



                    </>

                }

            </Row>

        </section>
    )
}

export default BannerImmediateOffer;