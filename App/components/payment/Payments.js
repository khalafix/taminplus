import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { orderServices } from "services/catalog/orderServices";
import Table from 'react-bootstrap/Table';
import { Alert, Button, Modal } from "react-bootstrap";
import { getCookie, getUrl, getUserid } from 'helpers/Helpers';
import { ServerFileIdentifier } from "constants/configs";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { OrderStatus } from "constants/orderStatus";
import { userPaymentServices } from "services/payment/userPaymentServices";
import Pagination from "components/Pagination";
import ClientPagination from "components/ClientPagination";

const Payments = () => {
    const [data, setData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [pages, setPages] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const [show, setShow] = useState(false);
    const [dataDetails, setDataDetails] = useState([]);
    const [currentOrderNumber, setCurrentOrderNumber] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState("");
    const [currentOrderData, setCurrentOrderData] = useState({});

    const [showReturnOrderByCustomer, setShowReturnOrderByCustomer] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const { register, handleSubmit, watch, errors } = useForm();
    const [loadingGetData, setLoadingGetData] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const getDate = async () => {
        setLoadingGetData(true);

        const result = await userPaymentServices.getUserAllPaymentsForUser();
        setData(result.data);
        setTotal(result.data.length)
        setTempData(result?.data?.slice(0 , size));
        // setTempData(result?.data);

        setLoadingGetData(false);

    }
    useEffect(() => {

        // if (!getCookie('token')) {
        //     router.push("/auth?redirectUrl=profile")
        // }

        (async () => {
            await getDate();
        })()

    }, []);

    const handleClose = () => setShow(false);
    const handleReturnOrderClose = () => setShowReturnOrderByCustomer(false);

    const showDetails = (orderDetails, orderNumber, order) => {
        setDataDetails([]);
        setCurrentOrderData(order)
        setDataDetails(orderDetails);
        setCurrentOrderNumber('');
        setCurrentOrderNumber(orderNumber);
        setShow(true)
    };


    const showReturnOrderByCustomerModal = (id, orderNumber) => {
        setDataDetails([]);
        setCurrentOrderId(id)
        // setDataDetails(orderDetails);
        setCurrentOrderNumber('');
        setCurrentOrderNumber(orderNumber);
        setShowReturnOrderByCustomer(true)
    };


    const onSubmit = async (val) => {
        let model = {};
        model.remark = val.remark;
        model.id = currentOrderId;

        const result = await orderServices.returnOrderByCustomer(model);
        if (result.isSuccess) {
            toast.success(result.message)
            handleReturnOrderClose();
            await getDate();

        }
        else {
            toast.error(result.message)
            handleReturnOrderClose();

        }
    }

    const changeCheck = (e) => {

        if (e.checked == true) {
            setDisabledBtn(false);
        }
        else {
            setDisabledBtn(true);
        }
    }
    var loadingStyleButton = {
        width: "53px",
        borderRadius: "50%",
        padding: "0px",
        lineHeight: "0",
    }

    const handelPagination = (e) => {
        let currentPage = e.selected+1;
        let take = size;
        let skip = (currentPage - 1 ) * size;

        setPage(currentPage);
        let pageItem = Math.ceil(data.length / size);
        setPages(pageItem);
        setTempData(
            data.slice(skip, skip + take)
        )
    }


    return (
        <div>
            {
                loadingGetData ?

                    <button style={{ backgroundColo: 'red', ransition: "all 0.3s", loadingStyleButton }} className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block">
                        {<div class="lds-ring" style={{ width: "40px", height: "23px" }}><div></div><div></div><div></div><div></div></div>}
                    </button>
                    :
                    data.length > 0 ?
                        <>
                            <div class="row">
                                <div class="col-xl-12">
                                    <nav class="pagination-nav pdt-30">
                                        {data.length > 9 && <ClientPagination page={page}
                                            onChange={(e) => handelPagination(e)} total={data.length} data={data} pageCount={Math.ceil(data.length / size)} />}
                                    </nav>
                                </div>
                            </div>
                            <Table striped bordered hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>کد پیگیری </th>
                                        <th>کد سفارش </th>
                                        <th> وضعیت سفارش  </th>
                                        <th>تاریخ ثبت </th>
                                        <th>   مبلغ  - ریال	</th>
                                        {/* <th>     جزئیات	</th> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tempData.length > 0 ?

                                            tempData.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index = index + 1}</td>
                                                        <td>{item.token}</td>
                                                        <td>{item.orderNumber}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.orderDate}</td>
                                                        <td>{item.amount?.toLocaleString()}</td>
                                                        {/* <td>
                                                        <button className="btn  btn-sm btn-primary" onClick={() => showDetails(item.items, item.orderNumber, item)}> <span className="flaticon-planning-1"></span></button>
                                                        &nbsp;&nbsp;
                                                        {
                                                            item.orderStatus == OrderStatus.Delivered &&
                                                            <button className="btn btn-sm btn-danger" onClick={() => showReturnOrderByCustomerModal(item.id, item.orderNumber)}> <span className="flaticon-remove"></span></button>

                                                        }

                                                    </td> */}

                                                    </tr>
                                                );
                                            })
                                            :
                                            null
                                    }
                                </tbody>
                            </Table>

                        </>

                        :
                        <Alert variant={'danger'}>
                            ! پرداختی شما ثبت نکردید
                        </Alert>
            }


            <Modal
                size="lg"
                show={show} onHide={handleClose}
                closeButton
            >
                <Modal.Header closeButton >
                    <h5 >    سفارش خرید کد : {currentOrderNumber} </h5>
                </Modal.Header>
                <Modal.Body>
                    {
                        currentOrderData.orderStatus != OrderStatus.ReturnByCustomer && currentOrderData.orderStatusRemark &&
                        <Alert variant={'primary'}>
                            {currentOrderData.orderStatusRemark}
                        </Alert>
                    }

                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> نام محصول </th>
                                <th>   برند</th>
                                <th>     قیمت کالا	</th>
                                <th>     تعداد	</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataDetails.length > 0 ?

                                    dataDetails.map((val, y) => {
                                        return (
                                            <tr>
                                                <td><Link href={`/product/${getUrl(val.enTitle)}`} ><a><img height={"85px"} width={"85px"} src={`${ServerFileIdentifier()}${val.coverFile}`} /></a></Link></td>
                                                <td>{val.productName}</td>
                                                <td>{val.brandName}</td>
                                                <td>{val.price}</td>
                                                <td>{val.itemCount}</td>

                                            </tr>
                                        );
                                    })
                                    :
                                    null
                            }
                        </tbody>
                    </Table>

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={() => handleClose()} class="btn btn-secondary">بازگشت</button>

                </Modal.Footer>
            </Modal>


            <Modal
                size="lg"
                show={showReturnOrderByCustomer} onHide={handleReturnOrderClose}
                closeButton
            >
                <Modal.Header closeButton >
                    <h5 >    سفارش خرید کد : {currentOrderNumber} - مرجوع کردن درخواست </h5>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Modal.Body>
                        <p>
                            قوانین برگشت کالا(مرجوعی)
                            طبق ماده ۳۷ قانون تجارت الکترونیکی در هر معامله از راه دور مصرف‌کننده باید حداقل هفت روز کاری، وقت ‌برای انصراف (‌حق انصراف) از قبول خود بدون تحمل جریمه یا ارائه دلیل داشته باشد.‌ تنها هزینه تحمیلی بر مصرف‌کننده، هزینه بازپس فرستادن کالا خواهد بود. (هزینه باز پس فرستادن کالا تنها در صورت انصراف از خرید بدون معیوبی کالا می‌باشد در موارد غیر که متعاقباً اعلام خواهد شد هزینه آن نیز بر عهده شرکت آون خواهد بود.)

                            شروع اعمال حق انصراف به ترتیب زیر خواهد بود :

                        </p>

                        <p>


                            <label className="font-weight-bold">
                                <input
                                    type={"checkbox"}
                                    onChange={(e) => changeCheck(e.target)}
                                />
                                &nbsp;
                                قوانین را قبول دارم
                            </label>

                        </p>

                        {
                            disabledBtn == false &&
                            <>
                                <textarea style={{ fontFamily: "SDF" }}
                                    ref={register({
                                        required: true
                                    })}
                                    cols={5} type="text" className="form-control" name="remark" />
                                {errors.remark?.type === "required" && <div style={{ color: "red" }} className="form-text"> علت مرجوع کردن درخواست خود را بنویسید .</div>}

                            </>

                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={disabledBtn} variant="primary" type="submit"  >
                            ثبت مرجوعی
                        </Button>       &nbsp;
                        <Button type="button" onClick={() => handleReturnOrderClose()} variant="secondary">بازگشت</Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Payments
