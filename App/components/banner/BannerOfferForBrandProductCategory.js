
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerOfferForBrandProductCategory = ({ props }) => {
    
    return (
        <section  >
            <Row >
                {isMobile ?

                    props?.model?.link && props?.model?.link !== "undefined" ?
                        <Col sm={12} md={12}>
                            <a target={"_blank"} href={props?.model?.link}>

                                <img className="img-banner-offer" src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                            </a>
                        </Col>
                        :
                        <Col sm={12} md={12}>
                            <img  className="img-banner-offer" src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                        </Col>
                    :
                    <>

                        {
                            props?.model?.link && props?.model?.link !== "undefined" ?
                                <Col sm={12} md={12}>
                                    <a target={"_blank"} href={props?.model?.link}>

                                        <img  className="img-banner-offer"  src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                                    </a>
                                </Col>
                                :
                                <Col sm={12} md={12}>
                                    <img  className="img-banner-offer"  src={`${ServerFileIdentifier()}${props?.model?.fileAttachment[0]}`} />
                                </Col>
                        }



                    </>

                }

            </Row>

        </section>
    )
}

export default BannerOfferForBrandProductCategory;