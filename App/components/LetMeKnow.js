import AuthLayout from "components/AuthLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from 'axios';
import LoadingButton from "./LoadingButton";
import { useRouter } from 'next/router';
import { getCookie, setCoockie, deleteCoockie } from 'helpers/Helpers';
import { authenticationServices } from "services/authenticationServices";
import React, { useState, useEffect } from "react";
import { applicationService } from "services/applicationService";
import { comboServices } from "services/base-Info/comboService";

import Select from "react-select";
import { contactFormServices } from "services/contactForm/contactFormServices";
import { toast } from "react-toastify";
import { newsLetterServices } from "services/news-letter/newsLetterServices";
import { letMeKnowServices } from "services/let-me-know/letMeKnowServices";

const LetMeKnow = ({ handleClose, data }) => {
    const { register, handleSubmit, reset, watch, errors } = useForm();
    let [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [captchaKey, setCaptchaKey] = useState("let-me-know-captcha");

    let [isAuthenticated, setIsAuthenticated] = useState(false);

    const resetCaptcha = () => {
        var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
        setCaptchaKey(randomKey);
        setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
        // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
    }

    const onSubmit = async (values) => {

        values.captchaKey = captchaKey;
        values.productId = data.id;

        setLoading(true);

        if (isAuthenticated) {
            values.productId = data.id;
            values.captchaKey = captchaKey;
            let result = await letMeKnowServices.registerWithToken(values);
            if (result.isSuccess == true) {
                reset();
                setLoading(false);
                toast.success(result.message);
                resetCaptcha();
                handleClose();

            }
            else {
                setLoading(false);
                toast.error(result.message);
                resetCaptcha();

            }
        }
        else {
            values.productId = data.id;
            values.captchaKey = captchaKey;

            let result = await letMeKnowServices.register(values);
            if (result.isSuccess == true) {
                reset();
                setLoading(false);
                toast.success(result.message);
                resetCaptcha();
                handleClose();

            }
            else {
                setLoading(false);
                toast.error(result.message);
2587
            }
        }


    };

    useEffect(() => {
        setIsAuthenticated(getCookie("token") != "" ? true : false);

        setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));
    }, []);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {
                getCookie("token") != "" ?

                    <>
                        <div className="row">
                            <div className="form-group font-weight-bold col-md-3 col-xs-12">
                                <label for="code"><span className="text-danger">*</span>  کد امنیتی </label>

                                <input style={{ fontFamily: "SDF" }} ref={register({
                                    required: true,

                                })} maxLength={4} type="text" className="form-control font-weight-bold  main-filter-input " name="captcha" placeholder=" کد را وارد نمایید" />
                                {errors.captcha?.type === "required" && <div className="form-text text-danger">   پر کردن این فیلد الزامی می باشد.</div>}

                            </div>


                            <div className="form-group font-weight-bold col-md-3 col-xs-12" style={{ marginTop: "4.5%" }}>
                                <img src={captchaUrl} width="100" height="150" />

                                <span onClick={() => resetCaptcha()} >
                                    <img src="/images/refresh.png" width="25" height="25" />
                                </span>

                            </div>


                            <div className="form-group font-weight-bold col-md-6 col-xs-12" style={{ marginTop: "4.5%" }}>
                                <LoadingButton loading={loading} text=" به من خبر بده " />
                            </div>


                        </div>


                    </>


                    :
                    <>

                        <div className="row">


                            <div className="form-group font-weight-bold col-md-5 col-xs-12">
                                <label for="mobile"><span className="text-danger">*</span> تلفن همراه : </label>
                                <input style={{ fontFamily: "SDF" }} ref={register({
                                    required: true,
                                    validate: {

                                        mobile: (value) => {
                                            if (/^[0][9][0-3][0-9]{8,8}$/.test(value)) {
                                                return (true)
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                    }
                                })} type="text" className="form-control font-weight-bold  main-filter-input " name="mobile" placeholder="تلفن همراه" />
                                {errors.mobile?.type === "mobile" && <div className="form-text">فرمت شماره تلفن همراه وارد شده صحیح نمی باشد.</div>}
                                {errors.mobile?.type === "required" && <div className="form-text text-danger">تلفن همراه الزامی می باشد.</div>}
                            </div>

                            <div className="form-group font-weight-bold col-md-3 col-xs-12">
                                <label for="code"><span className="text-danger">*</span>  کد امنیتی </label>

                                <input style={{ fontFamily: "SDF" }} ref={register({
                                    required: true,

                                })} maxLength={4} type="text" className="form-control font-weight-bold  main-filter-input " name="captcha" placeholder=" کد را وارد نمایید" />
                                {errors.captcha?.type === "required" && <div className="form-text text-danger">   پر کردن این فیلد الزامی می باشد.</div>}

                            </div>


                            <div className="form-group font-weight-bold col-md-3 col-xs-12" style={{ marginTop: "4.5%" }}>
                                <img src={captchaUrl} width="100" height="150" />

                                <span onClick={() => resetCaptcha()} >
                                    <img src="/images/refresh.png" width="25" height="25" />
                                </span>

                            </div>


                        </div>
                        <div className="row">
                            <div className="form-group font-weight-bold col-md-3">
                            </div>
                            <div className="form-group font-weight-bold col-md-6 col-xs-12">
                                <LoadingButton loading={loading} text=" ثبت " />
                            </div>
                            <div className="form-group font-weight-bold col-md-3">
                            </div>
                        </div>

                    </>
            }

        </form>
    )
}

export default LetMeKnow
