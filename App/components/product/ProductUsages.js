import React from 'react'
import { useEffect, useState } from "react";
import { Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { ServerFileIdentifier } from "constants/configs";

const ProductUsages = ({ data }) => {
  useEffect(() => {
  }, [data.id]);
  return (
    <div>

      <ListGroup >
        {data?.productUsages?.map((q, index) => (
          <ListGroup.Item >
           {index=index+1} - <span> {q.title} </span>

          </ListGroup.Item>
        ))}
      </ListGroup>

      

    </div>
  )
}

export default ProductUsages
