import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row, } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { userOpinionServices } from 'services/support/userOpinionServices';
import { getCookie, setCoockie, deleteCoockie, getUserid } from 'helpers/Helpers';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { UserOpinionType } from 'utils/userOpinionType';

const DynamicFromForUserOpinionForArticle = ({id, handleClose}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const router = useRouter();

    const [valuesNegative, setValuesNegative] = useState({ val: [] });
    const [valuesPlus, setValuesPlus] = useState({ val: [] });
    const [countNegative, setCountNegative] = useState(1);
    const [countPlus, setCountPlus] = useState(1);

    const createInputsNegative = () => {
        return valuesNegative.val.map((el, i) =>
            <div key={i}>
                <Card style={{ border: "none" }}  >
                    <Card.Header style={{ border: "none" }} >

                        {countNegative + i} -  <Row className='mb-3'>
                            <Col md="11">
                                <Form.Control  ref={register({ required: true, })} type="text" value={el || ''} onChange={handleChangeNegative.bind(i)} ></Form.Control>
                            </Col>
                            <Col md="1">
                                <Button type='button' value='remove' name={i} onClick={removeNegativeClick.bind(i)} variant="danger" size='sm' > ×</Button>
                            </Col>
                        </Row>
                    </Card.Header>

                </Card >

            </div>
        );
    }



    const createInputsPlus = () => {

        return valuesPlus.val.map((el, i) =>
            <div key={i}>
                <Card style={{ border: "none" }}  >
                    {countPlus + i} -  <Card.Header style={{ border: "none" }}>
                        <Row className='mb-3 mt-2'>
                            <Col md="11">
                                <Form.Control type="text" value={el || ''} onChange={handleChangePlus.bind(i)} ></Form.Control>
                            </Col>
                            <Col md="1">
                                <Button type='button' value='remove' name={i} onClick={removePlusClick.bind(i)} variant="danger" size='sm' > × </Button>
                            </Col>
                        </Row>

                    </Card.Header>

                </Card >
            </div >
        );
    }

    function handleChangePlus(event) {

        let vals = [...valuesPlus.val];
        vals[this] = event.target.value;
        setValuesPlus({ val: vals });
    }

    function handleChangeNegative(event) {
        let vals = [...valuesNegative.val];
        vals[this] = event.target.value;
        setValuesNegative({ val: vals });
    }


    const addClickPlus = () => {
        setValuesPlus({ val: [...valuesPlus.val, ''] })
    }

    const addClickNegative = () => {
        setValuesNegative({ val: [...valuesNegative.val, ''] })
    }


    const removePlusClick = (event) => {
        let vals = [...valuesPlus.val];
        let index = Number(event.target.name);
        vals.splice(index, 1);
        setValuesPlus({ val: vals });
    }
    const removeNegativeClick = (event) => {
        let vals = [...valuesNegative.val];
        let index = Number(event.target.name);
        vals.splice(index, 1);
        setValuesNegative({ val: vals });
    }



    const onSubmit = async (data) => {
        
        let redirectUrl = new URLSearchParams(window.location.search);

        let model = {};
        model.negativeOpinions = [];
        model.positiveOpinions = [];
        model.userOpinionType=UserOpinionType.Articles;
        for (let index = 0; index < valuesNegative.val.length; index++) {
            const element = valuesNegative.val[index];
            model.negativeOpinions.push({ text: element, useOpinionStatus: 20 });
        }

        for (let index = 0; index < valuesPlus.val.length; index++) {
            const element = valuesPlus.val[index];
            model.positiveOpinions.push({ text: element, useOpinionStatus: 20 });
        }
        model.remark = data.remark;    
        model.articleId=id;
        let result = await userOpinionServices.addUserOpinion(model);
        

        if (result.isSuccess == true) {
            // data.toast.success(result.message);
            // if (redirectUrl.get("redirectUrl") != null) {
            //     window.location.href = `/${redirectUrl.get("redirectUrl")}`;
            // } else {
            //     window.location.href = `/`;
            // }
            toast.success("✔️دیدگاه شما برای محصول ثبت شد ");
            handleClose();
        }
        else {
            const currentPath = router.asPath;
            router.push(`/auth?redirectUrl=${currentPath.substring(1)}`)

        }
        // event.preventDefault();
    }

    return (
        <Card style={{ direction: "rtl" }} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <>

                    <Card.Body >
                        <Row className='mb-3'>
                            <Col md="12 m-2">
                                <Form.Label>دیدگاه شما :</Form.Label>
                                <textarea style={{ fontFamily: "SDF" }}
                                    ref={register({
                                        required: true
                                    })}
                                    cols={5} type="text" className="form-control" name="remark" />
                                {errors.remark?.type === "required" && <div style={{ color: "red" }} className="form-text"> دیدگاه خود را بنویسید .</div>}

                            </Col>

                        </Row>
                        <Button type='button' className='mb-2' value='add more' onClick={addClickPlus} variant="success" size='sm' >+ نکات مثبت مقاله </Button>

                        <ListGroup >{createInputsPlus()}</ListGroup>
                        <hr />
                        <Button type='button' className='mb-2' value='add more' onClick={addClickNegative} variant="danger" size='sm' > - نکات منفی مقاله </Button>

                        <ListGroup >{createInputsNegative()}</ListGroup>
                    </Card.Body>

                    <Card.Footer>
                        <Button variant="primary" type="submit" size='sm' >
                            ثبت
                        </Button>
                    </Card.Footer>
                </>
            </form>
        </Card>
    );

}

export default DynamicFromForUserOpinionForArticle;