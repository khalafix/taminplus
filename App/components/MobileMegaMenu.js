import { getUrl } from 'helpers/Helpers';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Button, Card, Col, FormCheck, ListGroup, Collapse } from 'react-bootstrap';

const MobileMegaMenu = ({ type = "productcategory", data, closeModal }) => {

    const [openCollapse, setOpenCollapse] = useState([]);
    const [selectedChangeCategory, setSelectedChangeCategory] = useState(0);


    const ClickParentCategory = (key, show, e) => {

        // e?.stopPropagation();
        if (openCollapse.find(f => f.key == key)) {
            setOpenCollapse([...openCollapse.filter(f => f.key != key), { parentKey: key, key: key, show: show ? !show : true }])
        }
        else {
            let temp = [];
            temp.push({ parentKey: key, key: key, show: show ? !show : true });
            setOpenCollapse(temp);
        }


    }


    const ClickChild = (key) => {
        setSelectedChangeCategory(key);
        closeModal();
    }


    return (



        <ListGroup variant="flush" style={{ height: "350px", overflowY: "scroll", backgroundColor: "white !importent" }}>

            {
                data.length > 0 && data.map((parentItem) => {
                    return (
                        <ListGroup.Item>
                            <div className=" mt-2 mr-2 ml-2 mb-2 d-flex justify-content-between collapse-div " onClick={() => ClickParentCategory(parentItem.key, openCollapse.find(f => f.key == parentItem.key)?.show)} >

                                {
                                    type == "productcategory" ?
                                        <Link href={`/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a onClick={() => ClickChild(parentItem.key)} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>
                                        :
                                        <Link href={ parentItem.key == -1 ?
                                            '/brands'
                                            :
                                            `/brand/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a onClick={() => ClickChild(parentItem.key)} className={`${selectedChangeCategory == parentItem.key ? `text-danger` : `text-dark`} font-weight-bold collapse-div`}> {`${parentItem.title}`} </a></Link>

                                }

                                <h6 className={`flaticon-right-chevron-1 ${openCollapse.find(f => f.key == parentItem.key)?.show ? "rotate-270" : "rotate-90"}`} ></h6>


                            </div>


                            <>

                                <Collapse in={
                                    openCollapse.find(f => f.key == parentItem.key)?.show ?
                                        openCollapse.find(f => f.key == parentItem.key)?.show : false

                                } >
                                    <div className="example-collapse-text">

                                        <ListGroup variant="flush" style={{ height: "150px", overflowY: "scroll" }}>
                                            <>
                                                {

                                                    parentItem.children && parentItem.children.map((childItem) => {
                                                        return (
                                                            <div onClick={() => ClickChild(childItem.key)} className='collapse-div '>
                                                                <>
                                                                    {
                                                                        type == "productcategory" ?
                                                                            <div className='collapse-div mr-4 ml-2 mb-2 mt-2'>
                                                                                <div className='badge badge-danger ' >{'>'}</div>

                                                                                <Link href={`/product/category/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`}  collapse-div`}> {childItem.title} </a></Link>
                                                                            </div>
                                                                            :
                                                                            <div className='collapse-div mr-4 ml-2 mb-2 mt-2'>
                                                                                <div className='badge badge-danger ' >{'>'}</div>

                                                                                <Link href={`/brand/category/${getUrl(childItem.enTitle ? childItem.enTitle : childItem.title)}/${getUrl(parentItem.enTitle ? parentItem.enTitle : parentItem.title)}`}><a className={`${selectedChangeCategory == childItem.key ? `text-danger` : `text-dark`} collapse-div`}> {childItem.title} </a></Link>
                                                                            </div>
                                                                    }
                                                                </>
                                                            </div>)
                                                    })
                                                }


                                            </>
                                        </ListGroup>

                                    </div>
                                </Collapse>
                            </>
                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>



    )
}

export default MobileMegaMenu
