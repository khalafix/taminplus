import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { ServerFileIdentifier } from "constants/configs";
import { Button, Card, Col, FormCheck, ListGroup, InputGroup } from 'react-bootstrap';
import SliderRange from "components/SliderRange";
import Collapse from 'react-bootstrap/Collapse';

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { comboServices } from 'services/base-Info/comboService';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import LoadingButton from 'components/LoadingButton';
import { productCategoryServices } from 'services/catalog/productCategoryServices';

import { isMobile } from 'react-device-detect';
import { brandServices } from 'services/catalog/brandServices';
import { getUrl } from 'helpers/Helpers';
import { productServices } from 'services/catalog/productServices';

var moment = require('jalali-moment');

const FilterSidebar = ({ props }) => {


    const router = useRouter();


    const [number, setNumber] = useState(0);


    useEffect(() => {


        (async () => {
            await getData();
        })()
    }, [props]);

    const getData = async () => {
        const result = await productServices.getSpecialOfferProductCount();
        setNumber(result.data);

    };



    const getSpecialOffer = () => {
        let model={};
        model.IsSpecialOffer = true;

        router.push({
            pathname: `/product`,
            query: { ...model },
        });

    }


    return (
        <>

            <Card className={`mt-3 mb-1 font-weight-bold  `}  >
                <Card.Header>
                    فروش
                </Card.Header>
                <Card.Body>
                    <div style={{cursor:"pointer"}} className='row' onClick={() => getSpecialOffer()}>
                        <div className='col-6 font-weight-bold'>فروش ویژه </div>
                        <div className='col-2'>  </div>
                        <div className='col-4 font-weight-bold '>{number} </div>

                    </div>
                </Card.Body>
            </Card>

        </>
    );
};







const SpecialOfferProductFilterSidebar = (props) => {


    return <aside class="news-sidebar-widget">
        <FilterSidebar props={props} />

    </aside>


}




export default SpecialOfferProductFilterSidebar;