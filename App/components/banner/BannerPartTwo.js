
import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

import { Col, Row } from "react-bootstrap";
const BannerPartTwo = (props) => {
    return (
        <section className="my-4 request-a-call-back ">
            <Row >
                <Col sm={12} md={12}>
                    {
                         props?.banner?.model?.link &&   props?.banner?.model?.link !== "undefined" ?
                            <a target={"_blank"} href={props?.banner?.model?.link}>
                                <img width={"100%"} src={`${ServerFileIdentifier()}${props?.banner?.model?.fileAttachment[0]}`} />
                            </a>
                            :
                            <img className="rounded" width={"100%"} src={`${ServerFileIdentifier()}${props?.banner?.model?.fileAttachment[0]}`} />
                    }
                </Col>
            </Row>

        </section>
    )
}

export default BannerPartTwo;