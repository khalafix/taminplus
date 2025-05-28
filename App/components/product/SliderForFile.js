import { ServerFileIdentifier } from "constants/configs";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, DotGroup } from 'pure-react-carousel';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Zoom from "components/Zoom";
import { Alert, Button, Col, Modal, Row } from "react-bootstrap";


const SliderForFile = ({ files, productName, name, data }) => {
    const [count, setCount] = useState();
    const [show, setShow] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [hasCurrentImage, setHasCurrentImage] = useState(false);
    const [filesList, setFilesList] = useState([]);

    useEffect(() => {
        if (isMobile) {
            setCount(1)
        } else {
            setCount(files?.length >= 8 ? 8 : files?.length)
        }
        
        setFilesList([])
        setTimeout(() => {
            setFilesList(files)
        }, 100);

    }, [productName])


    const getFilePath = (file) => {
        
        let path = ServerFileIdentifier();
        if (file.includes("\\")) {
            let img = path + file?.replace(/\\/g, '/');
            return img;
        }
        else {
            let img = path + file;
            return img;
        }
    }
    const handleClose = () => setShow(false);

    const showImage = (item) => {
        setCurrentImage(item);
        setShow(true)
        setHasCurrentImage(true);
    };


    const showImageItem = (el) => {

        setHasCurrentImage(false);

        setCurrentImage("");
        setCurrentImage(el);
        setTimeout(() => {
            setHasCurrentImage(true);
        }, 100);
        setShow(true)

    };

    return (
        filesList.length > 0 &&
        <div className={`container ${name}`}>
            <CarouselProvider

                //  naturalSlideWidth={1}
                //  naturalSlideHeight={2}
                // totalSlides={files?.length}
                // step={1}
                // visibleSlides={1}
                // isPlaying={true}
                // infinite={true}
                // interval={5000}
                // playDirection="backward"
                // isIntrinsicHeight={true}
                visibleSlides={1}
                totalSlides={files?.length}
                step={1}
                naturalSlideWidth={400}
                naturalSlideHeight={500}
            // hasMasterSpinner={files?.length? fa}

            >

                <div dir="ltr">


                    <Slider >
                        {filesList?.map((q, indexx) => {
                            return (
                                <>
                                    <Slide index={indexx}>
                                        {/* <img src={`${ServerFileIdentifier()}${q}`}/> */}
                                        {/* <div id={`img-container-${indexx}`} onMouseOver={()=>zoom(indexx)}>
                                            <img src={`${ServerFileIdentifier()}${q}`} />
                                        </div> */}
                                        {
                                            !isMobile ?
                                                <Zoom
                                                    img={
                                                        getFilePath(q)
                                                    }
                                                    // img={`https://api.taminplus.com/Files/Catalog/ProductAttachments/ProductCoverAttachments/IRG6324W1A0_67297.jpg`}
                                                    zoomScale={3}
                                                    width={"500"}
                                                    height={"400"}

                                                />
                                                :
                                                <img src={`${ServerFileIdentifier()}${q}`} />
                                        }

                                    </Slide >
                                </>
                            )
                        })}
                    </Slider>

                </div>

                <div style={{ display: "inline-block", width: files.length > 8 ? "500px" : "auto", overflowX: files.length > 8 ? "scroll" : "auto" }}>

                    {filesList?.map((q, indexx) => {
                        return (
                            <img onClick={() => showImage(getFilePath(q))} src={getFilePath(q)} width="80px" height="80px" />
                        )
                    })}
                </div>

            </CarouselProvider>


            <Modal
                size="lg"
                show={show} onHide={handleClose}
                closeButton
            >
                <Modal.Header closeButton >
                    <h5 >   {data.productName} </h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {
                            !isMobile ?
                                <>
                                    <Col xs={8} md={8}>
                                        {
                                            currentImage && hasCurrentImage ?
                                                <Zoom
                                                    img={currentImage ? currentImage : ""}
                                                    zoomScale={3}
                                                    width={"500"}
                                                    height={"500"}
                                                /> : null

                                        }
                                    </Col>
                                    <Col className="text-center" style={{ borderRight: "1px solid #E9ECEF", height: files.length > 4 ? "400px" : "auto", overflowY: files.length > 4 ? "scroll" : "auto" }} xs={4} md={4}>
                                        {filesList?.map((k, indexx) => {
                                            return (
                                                <div>
                                                    <img onClick={() => showImageItem(getFilePath(k))} src={getFilePath(k)} width="130px" height="130px" />
                                                </div>
                                            )
                                        })}
                                    </Col>

                                </> :

                                <>
                                    <Col xs={12} md={12}>
                                        {
                                            currentImage && hasCurrentImage ?
                                            <img src={currentImage} width={"350"}
                                            height={"350"} /> : null
                                                // <Zoom
                                                //     img={currentImage ? currentImage : ""}
                                                //     zoomScale={2}
                                                    
                                                // /> : null

                                        }
                                    </Col>


                                </>


                        }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={() => handleClose()} class="btn btn-secondary">بازگشت</button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default SliderForFile;