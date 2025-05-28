import ProductFilterSidebar from "components/product/ProductFilterSidebar";
import ProductThumb from "components/product/ProductThumb";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { productServices } from 'services/catalog/productServices';
import { brandServices } from 'services/catalog/brandServices';

import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { Button, Modal } from 'react-bootstrap';
import { isMobile, isMobileSafari } from 'react-device-detect';

import Link from 'next/link';
import { Col, Row, Container, Card } from "react-bootstrap";
import { ServerFileIdentifier } from "constants/configs";
import { getUrl } from "helpers/Helpers";




export default function Blog(props) {
    const [mobileDevice, setMobileDevice] = useState(false);

    useEffect(() => {
        setMobileDevice(isMobile)
    }, []);


    return (
        <>
            <Head>
                <title> برندها  </title>
                <meta name="description" content="برندها " />
                <link rel="canonical" href="/product"></link>
            </Head>


            <div class="service-details-page ">
                <div class="container mt-4 mb-2">
                    <div class="row">
                        {/* <div class="col-xl-4 col-lg-5 sidebar-right"> */}
                        {/* {posts && <ArticleSidebar isDetail={false} categoryChangeHandler={categoryChangeHandler} />} */}
                        {/* </div> */}

                        {props?.posts?.map((q, indexx) => {
                            return (
                                <>

                                    {
                                        <Link href={`/brand/${getUrl(q.enTitle ? q.enTitle : q.title)}`}>

                                            <Card className="brand-slide-box   col-md-2 col-lg-2 col-xs-12 col-sm-12" style={{ borderRadius: "0" }}>
                                                <Card.Img variant="top" alt={q.title} className="rounded mx-auto d-block" style={{ height: '150px', width: '180px' }} src={`${ServerFileIdentifier()}${q.file}`}>
                                                </Card.Img>
                                                <Card.Body className="custom-card-body" >
                                                    {/* <Card.Text className="product-slider-title" style={{ marginBottom: "0%", fontWeight: "bold", textAlign: "center" }}>
                                                        <span style={{ fontWeight: "bold" }}> {q.title} </span>
                                                    </Card.Text> */}



                                                </Card.Body>
                                                <Card.Footer className="text-center product-card-footer" style={{ border: "none", background: "none" }}>
                                                    <Link href={`/brand/${getUrl(q.enTitle ? q.enTitle : q.title)}`}>

                                                        <Button variant="primary" size="sm" className="ml-2">مشاهده محصولات </Button>
                                                    </Link>

                                                </Card.Footer>
                                            </Card>
                                        </Link>


                                    }

                                </>
                            )
                        })}


                    </div>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    var brands = await brandServices.getUserList(1000000); // count=10

    return {
        props: {
            posts: brands.data,

        }
    }


}


