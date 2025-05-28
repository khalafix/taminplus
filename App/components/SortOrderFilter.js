import { comboServices } from 'services/base-Info/comboService';
import React from 'react'
import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

const SortOrderFilter = ({isNew ,topSale, topVisited , changeSortOrder}) => {

    useEffect(() => {

    }, []);

    const changeFilter=(type)=>{
        changeSortOrder(type)
    }
    return (
        <>
            <Form>
       
                    <ListGroup variant="flush">

                     
                        <ListGroup.Item>
                        <Form.Check defaultChecked={ topSale== "true" ? true : false} onChange={(e) => changeFilter("topSale")} type="checkbox" name=' topSale' label='  پر‌‌فروش ترین ' id='20' />
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Form.Check defaultChecked={topVisited == "true" ? true : false} onChange={(e) => changeFilter("topVisited")} type="checkbox" name='topVisited' label=' پر‌‌بازدید ترین ' id='30' />
                        </ListGroup.Item>

                        <ListGroup.Item >
                        <Form.Check defaultChecked={isNew == "true" ? true : false} onChange={(e) => changeFilter("isNew")} type="checkbox" name='isNew' label=' جدید ترین  ' id='25' />
                        </ListGroup.Item>
                    </ListGroup>
            
            </Form>
        </>
    );
}

export default SortOrderFilter
