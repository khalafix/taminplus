import React from 'react'
import { useEffect, useState } from "react";
import { Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { ServerFileIdentifier } from "constants/configs";

const ProductFeatures = ({ data }) => {

  const [productFeature, setProductFeature] = useState([]);

  useEffect(() => {
    getproductFeatures();
  }, [data.id]);

  const getproductFeatures = () => {
    let tempgetproductFeatures = [];

    // Add MainFeature
    for (let index = 0; index < data?.productFeatureValues?.length; index++) {
      let ele = data?.productFeatureValues[index];
      if (data?.mainFeatureId != null && ele.featureId == data?.mainFeatureId) {
        tempgetproductFeatures.push(ele);
      }
    }

    // Add OtherFeature
    for (let y = 0; y < data?.productFeatureValues?.length; y++) {
      let element = data?.productFeatureValues[y];
      if (data?.mainFeatureId != null && !element.title.includes("توضیح") && element.featureId != data?.mainFeatureId) {
        tempgetproductFeatures.push(element);
      }
    }

    // Add RemarkFeature === سایر توضیحات
    for (let z = 0; z < data?.productFeatureValues?.length; z++) {
      let el = data?.productFeatureValues[z];
      if (data?.mainFeatureId != null && el.title?.includes("توضیح") && el.featureId != data?.mainFeatureId) {
        tempgetproductFeatures.push(el);
      }
    }
    // setProductFeature([]);
    setProductFeature(tempgetproductFeatures);
  }

  return (
    <div>

      <ListGroup variant="flush">
        {productFeature?.map((q, index) => (
          q.controlType == 104 && q.value ?
            <ListGroup.Item>
              <strong> {q.title}</strong>:   <span> {q.value} {q.symbolTitle && q.symbolTitle != "--" && q.symbolTitle != " " ? ` ${q.symbolTitle}` : ""}</span>

            </ListGroup.Item> :
            q.controlType == 101 && q.value ?
              <ListGroup.Item>
                <strong> {q.title}</strong>:   <span> {q.value} {q.symbolTitle && q.symbolTitle != "--" && q.symbolTitle != " " ? ` ${q.symbolTitle}` : ""}</span>
              </ListGroup.Item> :

              q.controlType == 102 && q.featureValueNumber ?
                <ListGroup.Item>
                  <strong> {q.title}</strong>:  <span> {q.featureValueNumber} {q.symbolTitle && q.symbolTitle != "--" && q.symbolTitle != " " ? ` ${q.symbolTitle}` : ""} </span>

                </ListGroup.Item> :

                q.controlType == 103 && q.value ?
                  <ListGroup.Item>
                    <strong> {q.title}</strong>:   <span> {q.value == true ? "دارد" : "ندارد"} {q.symbolTitle && q.symbolTitle != "--" && q.symbolTitle != " " ? ` ${q.symbolTitle}` : ""}</span>

                  </ListGroup.Item> : null

        ))}

      </ListGroup>

    </div>
  )
}

export default ProductFeatures
