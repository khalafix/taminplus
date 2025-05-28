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

const NewsLetter = ({handleClose }) => {
    const { register, handleSubmit, reset, watch, errors } = useForm();
    let [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [captchaKey, setCaptchaKey] = useState("news-letter-captcha");

    let [isAuthenticated, setIsAuthenticated] = useState(false);

    const resetCaptcha = () => {
        var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
        setCaptchaKey(randomKey);
        setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
        // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
    }

    const onSubmit = async (values) => {

        values.captchaKey = captchaKey;
        setLoading(true);

        if (isAuthenticated) {
            let result = await newsLetterServices.registerWithToken(values);
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

            let result = await newsLetterServices.register(values);
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


    };

    useEffect(() => {
        setIsAuthenticated(getCookie("token") != "");

        setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));
    }, []);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row">


                <div className="form-group font-weight-bold col-md-6 col-xs-12">
                    <label for="email"><span className="text-danger">*</span>  ایمیل </label>
                    <input style={{ fontFamily: "SDF" }} ref={register({
                        required: true,
                        email: (value) => {
                            if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))) {
                                return (true)
                            }
                            return false;
                        }
                    })} type="email" className="form-control main-filter-input  font-weight-bold" name="email" placeholder="ایمیل" />
                    {errors.email?.type === "email" && <div className="form-text">فرمت ایمیل وارد شده صحیح نمی باشد.</div>}
                    {errors.email?.type === "required" && <div className="form-text text-danger">      ایمیل الزامی می باشد.</div>}

                </div>

                <div className="form-group font-weight-bold col-md-3 col-xs-12">
                    <label for="code"><span className="text-danger">*</span>  کد امنیتی </label>

                    <input style={{ fontFamily: "SDF" }} ref={register({
                        required: true,

                    })} maxLength={4} type="text" className="form-control  main-filter-input font-weight-bold" name="captcha" placeholder=" کد را وارد نمایید" />
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
                    <LoadingButton loading={loading} text=" ثبت نام" />
                </div>
                <div className="form-group font-weight-bold col-md-3">
                </div>
            </div>






        </form>
    )
}

export default NewsLetter
