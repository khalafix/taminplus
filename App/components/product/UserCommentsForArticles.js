import React from 'react'
import { useEffect, useState } from "react";
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ServerFileIdentifier } from "constants/configs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductFeatures from './ProductFeatures';
import ProductUsages from './ProductUsages';
import DynamicFromForUserOpinionForArticle from 'components/product/DynamicFromForUserOpinionForArticle';
import Modal from 'react-bootstrap/Modal';
import { userOpinionServices } from 'services/support/userOpinionServices';
var moment = require('jalali-moment');

const UserCommentsForArticles = ({ data  }) => {
  const [dataList, setDataList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    
    if (data?.id){
      const result = await userOpinionServices.getByArticleId(data.id);
      setDataList(result.data)
      // userOpinionCount(result.data.length)
    }
 
  }
  useEffect(() => {
    getData();
  }, [data.id])


  return (
    <>

      <Card style={{ border: "none" }} >
        <Card.Header style={{ border: "none" }}>
          <Button size='sm' onClick={() => handleShow()} >
            ثبت دیدگاه شما +
          </Button>
        </Card.Header>

      </Card>
      <Modal
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose}

      >
        <Modal.Header closeButton>
          <Modal.Title >دیدگاه خود را برای این مقاله بنویسید </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DynamicFromForUserOpinionForArticle id={data.id} handleClose={handleClose} />
        </Modal.Body>

      </Modal>
      <ListGroup as="ul">


        {
          // data?.userComments && data.userComments.map((el, i) =>
          dataList?.map((el, i) =>

            <ListGroup.Item as="li" >
              <img width={'50px'} height={"50px"} src={'/images/Avatar.png'} /> <span>{el.senderUser}</span> , <span>{moment(el.createDate).locale('fa').format('YYYY/MM/DD')}</span>
              <p>
                {el.remark}
              </p>
              <ul>

                {
                   el?.positiveOpinions.map((y) => {
                   return( <>
                     <li>
                    
                      <span style={{ color: "green",fontSize:"20px" }}>+</span> <span>{y.text}</span>
                      </li>
                    </>)
                  })
                }
              </ul>

              <ul>

                {
                 el?.negativeOpinions.map((x) => {
                  return( <>
                     <li>
                     <span style={{ color: "red",fontSize:"20px" }}>-</span> <span>{x.text}</span>

                     </li>
                     </>)
                  })
                }
              </ul>

            </ListGroup.Item>
          )}

      </ListGroup>
      {/* <Collapse in={open} >
      <div id="example-collapse-text">

        <DynamicFromForUserOpinion />

        </div>

      </Collapse> */}
    </>
  )
}

export default UserCommentsForArticles
