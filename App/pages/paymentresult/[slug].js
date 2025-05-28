import React, { useState, useEffect } from "react";
//API
import { userPaymentServices } from "services/payment/userPaymentServices";
import Head from "next/head";

const PaymentResult = () => {
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [data, setData] = useState({});
  const [fetchDataFlag, setFetchDataFlag] = useState(false);

  const getData = async () => {
    setLoading(true);
    let refId = window.location.pathname.replace("/paymentresult/", "");

    const result = await userPaymentServices.getBankResult(refId);
    setFetchDataFlag(true);
    if (result.isSuccess) {
      setLoading(false);
      setData(result?.data);
      setIsConfirm(true);
      localStorage.removeItem("shopping-card");
    } else {
      setLoading(false);
      setIsConfirm(false);
      setData(result?.data);
    }
  };

  useEffect(() => {
    // getTblData();
    getData();
  }, []);
  var loadingStyleButton = {
    width: "53px",
    borderRadius: "50%",
    padding: "0px",
    lineHeight: "0",
  };

  return (
    <>
      <Head>
        <title>نتیجه پرداخت</title>
        <meta name="description" content="نتیجه پرداخت" />
      </Head>
      <section className="price-section">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
              <div className="price-table text-center">
                <div className="table-header">
                  <div className="card-body mt-5">
                    {loading ? (
                      <button
                        style={{
                          backgroundColo: "red",
                          ransition: "all 0.3s",
                          loadingStyleButton,
                        }}
                        className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block"
                      >
                        {
                          <div
                            class="lds-ring"
                            style={{ width: "40px", height: "23px" }}
                          >
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        }
                      </button>) : null}
                    {fetchDataFlag == false ? null : isConfirm == true && data.status == 1 ? (
                      <>
                        <div class="p-3 mb-2 bg-success text-white">
                          پرداخت شما با موفقیت انجام شد.
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          کد پیگیری : {data?.token}
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          شماره سفارش : {data?.orderNumber}
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          مبلغ : {data?.amount?.toLocaleString()} ریال
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="p-3 mb-2 bg-danger text-white">
                          پرداخت شما با مشکل مواجه شد. در صورتی که مبلغی از شما
                          کسر شده است، به صورت خودکار به حساب شما بازگردانده
                          خواهد شد.
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          کد پیگیری : {data?.token}
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          شماره سفارش : {data?.orderNumber}
                        </div>
                        <div class="p-3 mb-2 bg-light ">
                          مبلغ : {data?.amount?.toLocaleString()} ریال
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentResult;
