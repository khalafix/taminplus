import React from 'react'
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { ServerFileIdentifier } from "constants/configs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductFeatures from './ProductFeatures';
import ProductUsages from './ProductUsages';
import UserComments from './UserComments';

const ProductInformation = ({ data }) => {
  const [userOpinion, setUserOpinion] = useState(0);
  const [productFeatureValuesCount, setProductFeatureValuesCount] = useState(0);

  const GetuserOpinionCount = (x) => {
    setUserOpinion(x)
  }

  const getproductFeatureValuesCount = () => {
    let count = 0;
    
    for (let index = 0; index < data?.productFeatureValues?.length; index++) {
      const element = data?.productFeatureValues[index];
            
      if (element.controlType == 101 && element.value) {
        count +=1;
      }
      if (element.controlType == 102 && element.featureValueNumber) {
        count += 1;
      }
      if (element.controlType == 103 && element.value) {
        count += 1;
      }
      if (element.controlType == 104 && element.value) {
        count += 1;
      }
    }
    return count;
  }

  return (
    <div>
      <Tabs
        defaultActiveKey={"features"}
        id="uncontrolled-tab-example"
        className="mb-3"

      >




        {
         data?.productFeatureValues?.length > 0 ?
            <Tab eventKey="features"
              title={`مشخصات (${getproductFeatureValuesCount()})`}>

              <Card.Text>
                <ProductFeatures data={data} />
              </Card.Text>
            </Tab> : null
        }


        <Tab eventKey="info" title="نقد و بررسی">
          <div className="entry-content">
            <div dangerouslySetInnerHTML={{ __html: data.remark }} className=""></div>
          </div>
        </Tab>

        {
          data?.productUsages?.length > 0 ?
            <Tab eventKey="usages" title={`کاربردها (${data?.productUsages?.length})`}>
              <Card.Text>
                <ProductUsages data={data} />
              </Card.Text>
            </Tab> : null
        }


        {/* {
          data?.usersIdeas.length > 0 ?
            <Tab eventKey="contact" title="دیدگاه کاربران" >
              تست ...
            </Tab> : null
        } */}

        <Tab eventKey="contact" title={` دیدگاه کاربران (${userOpinion})`} >
          <UserComments data={data} userOpinionCount={GetuserOpinionCount} />
        </Tab>

      </Tabs>
    </div>
  )
}

export default ProductInformation
