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



const Login = (props) => {
    const router = useRouter();
    const { register, handleSubmit, watch, errors } = useForm();
    let [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [captchaKey, setCaptchaKey] = useState("login-captcha");

    const resetCaptcha = () => {
        var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
        setCaptchaKey(randomKey);
        setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
        // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
    }


    const onSubmit = async (data) => {
        var redirectUrl = new URLSearchParams(window.location.search);
        setLoading(true);

        data.captchaKey = captchaKey;
        let result = await authenticationServices.login(data);
        if (result.isSuccess == true) {
            var token = getCookie("token");

            if (token) {
                deleteCoockie("token", token);
            }

            setCoockie("token", result.data.token);
            setCoockie("refreshToken", result.data.refreshToken);
            setCoockie("lastLoginDate", result.data.lastLoginDate);

            setLoading(false);

            if (redirectUrl.get("redirectUrl") != null) {
                window.location.href = `/${redirectUrl.get("redirectUrl")}`;
            } else {
                window.location.href = `/`;
            }

            props.toast.success(" خوش آمدید");
        }
        else {
            setLoading(false);
            resetCaptcha();
            props.toast.error(result.message)
        }





    };

    useEffect(() => {
        setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));

    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group font-weight-bold">
                <label className=" font-weight-bold" for="email">نام کاربری</label>
                <input ref={register({
                    required: true,
                    validate: {

                        userName: (value) => {
                            if (/^[0][9][0-3][0-9]{8,8}$/.test(value)) {
                                return (true)
                            }
                            else {
                                return false;
                            }
                        }
                    }
                })} maxLength={"11"} type="text" className="form-control font-weight-bold" name="userName" placeholder="تلفن همراه" />
                {errors.userName?.type === "userName" && <div className="form-text">فرمت شماره تلفن همراه وارد شده صحیح نمی باشد.</div>}
                {errors.userName?.type === "required" && <div className="form-text">نام کاربری الزامی می باشد.</div>}
            </div>
            <br />
            <div className="form-group font-weight-bold">
                <label className=" font-weight-bold" for="pwd">رمز عبور</label>
                <input ref={register({
                    required: true,
                })} type="password" className="form-control font-weight-bold" name="password" />
                {errors.password?.type === "required" && <div className="form-text"> رمز عبور الزامی می باشد.</div>}
            </div>
            <br />

            <div className="form-group font-weight-bold">
                <>

                    <>
                        <input ref={register({
                            required: true,

                        })} maxLength={4} type="text" className="form-control font-weight-bold" name="captcha" placeholder=" کد را وارد نمایید" />
                        {errors.captcha?.type === "required" && <div className="form-text">   پر کردن این فیلد الزامی می باشد.</div>}

                    </>

                    <img style={{ paddingTop: "30px" }} src={captchaUrl} width="250" height="150" />

                    <span onClick={() => resetCaptcha()} >
                        <img src="/images/refresh.png" width="25" height="25" />
                    </span>
                </>
            </div>
            <br />
            <LoadingButton loading={loading} text="ورود" />
            <hr />
            <div className="d-flex justify-content-between text-dark">
                <div>
                    <label className=" font-weight-bold text-dark" onClick={() => props.setActiveTab(2)}>
                        ثبت نام
                    </label>
                </div>
                <div>
                    <label className=" font-weight-bold text-dark mr-5" onClick={() => props.setActiveTab(4)}>
                     قبلا ثبت نام کرده ام.
                    </label>
                </div>

                <div>
                    <label className=" font-weight-bold text-dark" onClick={() => props.setActiveTab(3)}>
                        رمز عبور خود را فراموش کردم.
                    </label>
                </div>

            </div>
        </form>
    )
}


export default Login;