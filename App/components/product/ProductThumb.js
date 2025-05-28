import Image from "next/image";
import Link from "next/link";
import { ServerFileIdentifier } from "constants/configs";
import { Button, Card, Form } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { addItem } from 'redux/actions/shoppingCardActions';
import { toast } from 'react-toastify';
import { getUrl } from "helpers/Helpers";

var moment = require('jalali-moment');


const ProductThumb = ({ post, addItem }) => {
    const ad = ServerFileIdentifier();
    const [isSetMobile, setIsSetMobile] = useState(false);
    let [indexItem, setIndexItem] = useState([]);

    useEffect(() => {
        setIsSetMobile(isMobile)
    }, []);


    const addProductToBasket = (data) => {

        setIndexItem([...indexItem, {
            id: data.id,
            enTitle: data.enTitle,
            productName: data.productName,
            price: data.price,
            discountedPrice: data.discountedPrice,
            coverFile: data.coverFile,
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            brandName: data.brandName,
            index: data.index,
            productFeatureValues: data.productFeatureValues
        }])



        data.index = indexItem.length > 0 ? indexItem.length : 0;
        addItem(data);
        // toast.success('✔️ آیتم به سبد خرید شما اضافه شد');

    }

    return (

        <div key={post.id} className={isSetMobile ? `col-md-12 col-lg-12 col-xl-12 mb-3` : `col-md-4 col-lg-4 mt-2  mb-3`}>

            <Card className="product-slide-box" style={{ minHeight: "330px", maxHeight: "330px" }}>
                {/* <Link href={`product/[slug]`} as={`/product/${post.id}`}> */}
                <Link href={`/product/${getUrl(post.enTitle ? post.enTitle : post.productName)}`}>

                    <a >
                        <>


                            <Card.Img variant="top" alt={post.productName} className="rounded mx-auto d-block" style={{ objectFit: 'contain', height: '150px', width: '150px' }} src={`${ad}${post.coverFile}`} >
                            </Card.Img>

                            <Card.Body style={{ maxHeight: "125px", minHeight: "125px" }}>
                                <Card.Text className="text-dark font-weight-bold text-center product-slider-title">
                                    {post.productName}
                                </Card.Text>
                                <Card.Text style={{ textAlign: "center" }}>
                                    {

                                        post.isShowAlert == true ?
                                            null
                                            :

                                            post.saleStatus == 1 && post.inventory ?
                                                post.discountedPrice ?
                                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                        <div class="text-muted" ><strike> {(post.price).toLocaleString()}  </strike>  </div>

                                                        <div className="mb-0" style={{ fontWeight: "bold", color: "black" }}> <span> {(post.discountedPrice).toLocaleString()} </span> <small>ریال</small> </div>
                                                    </div>
                                                    :
                                                    <p style={{ fontWeight: "bold", color: "black" }}> <span > {(post.price).toLocaleString()} </span> <small>ریال</small> </p>
                                                : <b style={{ color: "gray" }}>ناموجود</b>

                                    }
                                </Card.Text>


                            </Card.Body>
                        </>
                    </a>

                </Link>
                <Card.Footer className="text-center product-card-footer">
                    <Link href={`/product/${getUrl(post.enTitle ? post.enTitle : post.productName)}`}>
                        <Button variant="primary" size="sm" className="ml-2">مشاهده </Button>
                    </Link>
                    {
                        post.isShowAlert == true ?
                            null
                            :
                            post.saleStatus == 1 && post.inventory ?
                                <Button onClick={() => addProductToBasket(post)} variant="danger" size="sm"><span className="flaticon-shopping-bag ml-1" />افزودن به سبد</Button> :
                                null}
                </Card.Footer>
            </Card>
        </div>
    )
}


const mapStateToProps = (state) => {

    return {
        items: state.shoppingCard.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //removeItem: (id) => dispatch(removeItem(id)),
        addItem: (item) => dispatch(addItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductThumb);