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
import { smsServices } from "services/sms/smsServices";
import VerificationInput from "./VerificationInput";


const Signup = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [captchaKey, setCaptchaKey] = useState("sign-up-captcha");
    const [codeValidate, setCodeValidate] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [userName, setUserName] = useState("");

    const resetCaptcha = () => {
        var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
        setCaptchaKey(randomKey);
        setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
        // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
    }

    const onSubmit = async (data) => {
        data.captchaKey = captchaKey;
        debugger
        setLoading(true);
        var redirectUrl = new URLSearchParams(window.location.search);

        if (validUserName) {
            if (codeValidate && userName) {
                let res = await smsServices.checkCodeSmSForRegisterUser(codeValidate, userName)

                if (res.isSuccess) {
                    props.toast.success(res.message);
                    if (redirectUrl.get("redirectUrl") != null) {
                        window.location.href = `/${redirectUrl.get("redirectUrl")}`;
                    } else {
                        window.location.href = `/auth`
                    }
                }
                else {
                    props.toast.error(res.message)
                }
                setLoading(false);

            }
        }
        else {
            data.confirmPassword = data.password_repeat;
            let result = await authenticationServices.register(data);
            debugger
            if (result.isSuccess == true) {
                // var token = getCookie("token");

                // if (token) {
                //     deleteCoockie("token", token);
                // }
                props.hideHeaderCard(true);
                setValidUserName(true)
                setUserName(data.userName)
                // setCoockie("token", result.data.token);
                // setCoockie("refreshToken", result.data.refreshToken);
                // setLoading(false);

                // if (redirectUrl.get("redirectUrl") != null) {
                //     window.location.href = `/${redirectUrl.get("redirectUrl")}`;
                // } else {
                //     window.location.href = `/`;
                // }
                setLoading(false);
                resetCaptcha();

                props.toast.success(result.message);
            }
            else {
                setLoading(false);
                resetCaptcha();
                props.toast.error(result.message)
            }
        }



    };
    useEffect(() => {

        setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));

    }, []);
    const onCompleteVerificationInput = (e) => {
        setCodeValidate(e)
    }


    var passwordCurrent = watch("password", "");
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                validUserName ?
                    <>
                        <h6 className="mb-3"> کد پیامک شده را وارد نمایید </h6>
                        <div className="form-group font-weight-bold">

                            <VerificationInput onComplete={onCompleteVerificationInput} />
                        </div>
                        <div className="form-group font-weight-bold mt-2">

                            <LoadingButton loading={loading} text=" ثبت" />
                        </div>


                    </>
                    :
                    <>
                        <div className="form-group font-weight-bold">
                            <label for="email">نام کاربری</label>
                            <input ref={register({
                                required: true,
                                validate: {
                                    // mobileOrEmail: (value) => {
                                    //     if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || /^[0][9][0-3][0-9]{8,8}$/.test(value))) {
                                    //         return (true)
                                    //     }
                                    //     return false;
                                    // }
                                    mobileOrEmail: (value) => {
                                        if ((/^[0][9][0-3][0-9]{8,8}$/.test(value))) {
                                            return (true)
                                        }
                                        return false;
                                    }
                                }
                            })} maxLength={"11"} type="text" className="form-control font-weight-bold" name="userName" placeholder="تلفن همراه" />
                            {errors.userName?.type === "mobileOrEmail" && <div className="form-text">فرمت شماره تلفن همراه وارد شده صحیح نمی باشد.</div>}
                            {errors.userName?.type === "required" && <div className="form-text">نام کاربری الزامی می باشد.</div>}
                        </div>
                        <br />
                        <div className="form-group font-weight-bold">
                            <label for="pwd">رمز عبور</label>
                            <input ref={register({
                                required: true,
                                minLength: 8,
                                validate: {
                                    captalAndSmall: (value) => {
                                        if (!(/[a-z]/.test(value)) || !(/[A-Z]/.test(value))) {
                                            return false;
                                        }
                                    }
                                }
                            })} type="password" className="form-control font-weight-bold" name="password" />
                            {errors.password?.type === "required" && <div className="form-text">رمز عبور الزامی می باشد.</div>}
                            {errors.password?.type === "captalAndSmall" && <div className="form-text">رمز عبور باید شامل حروف کوچک و بزرگ لاتین باشد.</div>}
                            {errors.password?.type === "minLength" && <div className="form-text">رمز عبور باید حداقل 8 کاراکتر باشد.</div>}

                        </div>
                        <br />
                        <div className="form-group font-weight-bold">
                            <label for="pwd">تکرار رمز عبور</label>
                            <input ref={register({
                                validate: {
                                    checkPass: (value) => value === passwordCurrent || false
                                }
                            })} type="password" className="form-control font-weight-bold" name="password_repeat" />
                            {errors.password_repeat?.type === "checkPass" && <div className="form-text">رمز عبور با تکرار آن همخوانی ندارد.</div>}

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
                        <LoadingButton loading={loading} text="ثبت نام" />
                        <hr />
                        <div className="d-flex justify-content-between">
                            <div>
                                <label className="text-dark font-weight-bold" onClick={() => props.setActiveTab(4)}>
                                    قبلا ثبت نام کرده ام.                    </label>
                            </div>

                        </div>
                    </>
            }

        </form>

    )
}


export default Signup;