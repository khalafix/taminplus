import React from 'react'
import { useEffect, useState, useCallback, useRef } from "react";
import { Col, Form, Modal, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { ServerFileIdentifier } from "constants/configs";
import { toast } from 'react-toastify';
import { productServices } from 'services/catalog/productServices';
import { useRouter } from 'next/router';
import { getUrl } from 'helpers/Helpers';
import LetMeKnow from 'components/LetMeKnow';


const ProductDetail = ({ data, selectProduct, hideImage = false }) => {
  const [y, setY] = useState(typeof window != 'undefined' && window.scrollY);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedBookMark, setSelectedBookMark] = useState(false);

  const cardRef = useRef();

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (y > 500) {
        cardRef.current.style.display = 'block';
      } else if (y < 500 && cardRef.current.className.includes('sticky')) {
        cardRef.current.style.display = 'none';
      }
      setY(window.scrollY);
    }, [y]
  );

  const [showLetMeKnow, setShowLetMeKnow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseLetMeKnow = () => setShowLetMeKnow(false);
  const handleShowLetMeKnow = () => setShowLetMeKnow(true);
  const handleShowAlert = () => setShowAlert(true);
  const handleCloseAlert = () => setShowAlert(false);

  // useEffect(() => {
  //   debugger
  //   if (typeof window != 'undefined') {
  //     setY(window.scrollY);
  //     window.addEventListener("scroll", handleNavigation);
  //   }

  //   return () => {
  //     typeof window != 'undefined' && window.removeEventListener("scroll", handleNavigation);
  //   };

  // }, [handleNavigation]);

  useEffect(() => {

    getByIdFavoriteProduct();
  }, [data?.id]);

  const addItem = (x) => {
    selectProduct(x);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getByIdFavoriteProduct = async () => {
    if (data?.id) {
      let result = await productServices.getByIdFavoriteProduct(data.id);
      if (result.isSuccess == true) {
        setSelectedBookMark(result.data)
      }
      else {
        setSelectedBookMark(false)

      }
    }

  }


  const getByIdFavoriteProductById = async (productId) => {

    let result = await productServices.getByIdFavoriteProduct(productId);
    if (result.isSuccess == true) {
      setSelectedBookMark(result.data)
    }
    else {
      setSelectedBookMark(false)

    }
  }


  const addFavoriteProduct = async (select) => {
    let model = {};
    model.productId = data.id;
    model.isSelected = select;
    let result = await productServices.addFavoriteProduct(model);
    const currentPath = router.asPath;


    if (result.isSuccess == true) {

      if (select == true) {
        toast.success(result.message);
      }
      else {
        toast.error(result.message);
      }

      await getByIdFavoriteProductById(model.productId)
      handleClose();

    }
    else {
      router.push(`/auth?redirectUrl=${currentPath.substring(1)}`)
    }
  }

  return (
    <div>
      <div ref={cardRef} className={`bg-light product-detail-card ${!hideImage ? "sticky" : ""}`}>
        <div className="product-item-actions" onClick={() => addFavoriteProduct(!selectedBookMark)} >
          <span className="" >
            <span style={{ marginBottom: "0%" }} className><img src={`${selectedBookMark == true ? `/images/bookmarkselected.png` : `/images/bookmark.png`}`} /></span>
          </span>
        </div>
        <Card.Body style={{ height: "502px" }}>
          {
            !hideImage &&
            <Card.Img src={`${ServerFileIdentifier()}${data.coverFile}`}></Card.Img>
          }
          {
            hideImage ? <h1 className='font-weight-bold'>{data.productName}</h1> : <h4 className='font-weight-bold'>{data.productName}</h4>
          }
          <h2 className='font-weight-bold'> <Form.Label className='font-weight-bold'>برند: </Form.Label><a href={`/brand/${getUrl(data.brandName)}`}>  {data.brandName} </a></h2>
          <h2 className='font-weight-bold'> <Form.Label className='font-weight-bold'> گروه محصول: </Form.Label> <a href={`/brand/category/${getUrl(data.categoryName)}/${getUrl(data.brandName)}`}>  {data.categoryName} </a> </h2>

          {
            hideImage &&
            <div className='product-abstract'>

              {
                data.shortDescription && data.shortDescription != null && data.shortDescription != "null" &&
                <p className='text-justify'>{data.shortDescription}</p>
              }

            </div>
          }



          {

            data.isShowAlert ?
              <Button onClick={() => handleShowAlert()} size="lg" block variant="primary"  >برای خرید با ما تماس بگیرید </Button>

              :

              data.saleStatus == 1 && data.inventory ?
                <>
                  <Card.Text className='text-left mb-0'>
                    {
                      data.discountedPrice ?
                        <>
                          <Form.Label ><strike class="text-muted font-weight-bold" > <span>{(data.price).toLocaleString()} </span> </strike>  </Form.Label>

                          <Form.Label className='font-weight-bold mr-2 lead'> <span > {(data.discountedPrice).toLocaleString()} </span> <small>ریال</small> </Form.Label>

                        </>
                        :
                        <Form.Label className='font-weight-bold mr-2 lead'> <span > {(data.price).toLocaleString()} </span> <small>ریال</small> </Form.Label>
                    }
                  </Card.Text>

                  <Card.Text className='mt-1'>
                    <Button onClick={() => addItem(data)} size="lg" block variant="danger" >اضافه کردن به سبد خرید</Button>
                  </Card.Text>

                </> :
                <Card.Text>
                  <Button size="lg" block variant="secondary" disabled >ناموجود </Button>
                  <Button onClick={() => handleShowLetMeKnow()} size="lg" block variant="primary"  >به من خبر بده ! </Button>

                </Card.Text>
          }
        </Card.Body>

        <Modal
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show} onHide={handleClose}

        >
          <Modal.Body>
            {selectedBookMark == true ? <h6 className='font-weight-bold'>آیا می خواهید این محصول را از لیست علاقه مندی ها  حذف کنید ؟</h6> : <h6>آیا می خواهید این محصول را به لیست علاقه مندی ها اضافه کنید ؟ </h6>}
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={() => handleClose()} class="btn btn-secondary ml-2">بازگشت</button>
            <button type="button" onClick={() => addFavoriteProduct(!selectedBookMark)} class={selectedBookMark == true ? "btn btn-danger" : "btn btn-success"}> {selectedBookMark == true ? 'حذف' : 'ثبت'} </button>
          </Modal.Footer>

        </Modal>



        <Modal
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showLetMeKnow} onHide={handleCloseLetMeKnow}

        >
          <Modal.Header closeButton>
            <Modal.Title > در صورت موجود شدن کالا به شما اعلام میشود</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LetMeKnow data={data} handleClose={handleCloseLetMeKnow} />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={() => handleCloseLetMeKnow()} class="btn btn-secondary ml-2">بازگشت</button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showAlert} onHide={handleCloseAlert}

        >
          <Modal.Header closeButton>
            <Modal.Title >   راهنمایی خرید و استعلام قیمت</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              برای اطلاع از قیمت با شماره 47300
              داخلی 2505 , 2506
              و خط مستقیم 47303
              و یا با شماره همراه زیر می توانید تماس بگیرید

            </p>
            <p>
              <ul style={{ listStyle: "none" }}>
                <li>09053408396</li>
                <li>09053408504</li>
              </ul>
            </p>

          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={() => handleCloseAlert()} class="btn btn-secondary ml-2">بازگشت</button>
          </Modal.Footer>
        </Modal>

      </div>

    </div>
  )
}

export default ProductDetail
