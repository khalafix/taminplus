
import { getPagesSeourl, getPageBySeourl } from "lib/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingButton from "components/LoadingButton";
import { getCookie, getUserid } from 'helpers/Helpers';
import { useRouter } from 'next/router';
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import {clear} from 'redux/actions/shoppingCardActions';



const Checkout = (props) => {
    
    const router = useRouter();
    let [loading, setLoading] = useState(false);
    let [infos, setInfos] = useState(null);

    useEffect(() => {
        var searchParams = new URLSearchParams(window.location.search);
        
        setInfos(searchParams);
    }, []);

    useEffect(() => {
        if (infos?.get("result").toLowerCase() === "true") {
            props.clear();
        }
    } , [infos])

    return (
        <>
            <Head>
                <title>نتیجه پرداخت</title>
                <meta name="description" content="نتیجه پرداخت" />
            </Head>
            <section className="price-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
                            <div className="price-table mrb-30 text-center">
                                <div className="table-header">
                                    <h4 className="pricing-plan-name">نتیجه پرداخت شما</h4>
                                    {infos && <div className="p-4">
                                        {infos.get("result").toLowerCase() === "true" ?
                                            <div class="p-3 mb-2 bg-success text-white">
                                                پرداخت شما با موفقیت انجام شد.
                                            </div> : 
                                            <div class="p-3 mb-2 bg-danger text-white">
                                                 پرداخت شما با مشکل مواجه شد. در صورتی که مبلغی از شما کسر شده است، به صورت خودکار به حساب شما بازگردانده خواهد شد.
                                            </div>
                                        }
                                        {infos.get("code") &&
                                            <div class="p-3 mb-2 bg-light ">
                                                شماره پیگیری بانک : {infos.get('code')}
                                            </div>
                                        }
                                        
                                        {infos.get("result").toLowerCase() === "true" &&
                                            <div class="p-3 mb-2 bg-info text-white">
                                                 برای مشاهده <Link href="/courses"><a style={{color : "wheat"}}>دوره</a></Link> خریداری شده می توانید  به صفحه ی دوره مربوطه مراجعه نمایید.
                                            </div>
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.shoppingCard.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clear:() =>  dispatch(clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);