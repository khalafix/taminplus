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

const ContactUs = (props) => {
    const { register, handleSubmit, reset, watch, errors } = useForm();
    let [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [captchaKey, setCaptchaKey] = useState("login-captcha");
    const [jobOpportunities, setJobOpportunities] = useState([]);
    const [fileName, setFileName] = useState("");
    const [changeStateJob, setChangeStateJob] = useState(false);
    let [jobSelected, setJobSelected] = useState(0);
    let [showError, setShowError] = useState(false);

    const resetCaptcha = () => {
        var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
        setCaptchaKey(randomKey);
        setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
        // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
    }

    const changeJobOpportunities = async (el) => {
        setJobSelected(el);

        if (el) {
            setChangeStateJob(true)
        }

    };

    const getJobOpportunities = async () => {
        const res = await comboServices.getJobOpportunities();
        setJobOpportunities(res)
    }


    const removeEmptyValueObject = (obj) => {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === "object" && obj[key].length !== 0) {
                removeEmptyValueObject(obj[key]);
            }
            // recurse
            else if (
                obj[key] == null ||
                obj[key] === "" ||
                obj[key].length === 0 ||
                obj[key] === undefined ||
                obj[key] === "undefined"
            )
                delete obj[key]; // delete
        });
        return obj;
    };

    const onSubmit = async (values) => {


        setLoading(true);

        let data = removeEmptyValueObject(values);

        let bodyFormData = new FormData();


        for (let index = 0; index < data.file?.length; index++) {
            const element = data.file[index];

            bodyFormData.append("file", element);
        }

        bodyFormData.append("fullName", data.fullName);
        bodyFormData.append("email", data.email);
        bodyFormData.append("phoneNumber", data.phoneNumber);
        bodyFormData.append("remark", data.remark);
        bodyFormData.append("subject", data.subject);

        bodyFormData.append("captchaKey", captchaKey);
        bodyFormData.append("captcha", data.captcha);

        let newFormData = new FormData();
        for (var [name, value] of bodyFormData) {
            if (value !== "undefined") {
                newFormData.append(name, value);
            }
        }



        let result = await contactFormServices.add(newFormData);
        if (result.isSuccess == true) {
            reset();
            setFileName("");

            setLoading(false);
            toast.success(result.message);
            resetCaptcha();

        }
        else {
            setLoading(false);
            toast.error(result.message);
            resetCaptcha();

        }

    };
    useEffect(() => {

        setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));
        getJobOpportunities();
    }, []);

    const changeFileUploader = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let fileName = e.target.files[0];
        setFileName(fileName.name)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className=" font-weight-bold col-md-6 col-xs-12">
                    <div className="row">

                        <div className="col-md-9 col-xs-12" style={{ fontSize: "12.8px", paddingLeft: "0" }}>
                            لطفا پیش از ارسال ایمیل یا فرم و تماس تلفنی ، حتما پرسش های متداول را مشاهده کنید
                        </div>

                        <div className="col-md-1 col-xs-12">

                            <Link href={`/page/سوالات-متداول`} >
                                <button className="btn btn-outline-danger btn-sm">

                                    پرسش های متداول
                                </button>
                            </Link>


                        </div>



                    </div>


                    <div className="row mt-2">
                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <label for="firstName"><span className="text-danger">*</span>  نام و نام خانوادگی</label>
                            <input style={{ fontFamily: "SDF" }} ref={register({
                                required: true,
                                validate: {

                                    fullName: (value) => {
                                        if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                            return (true)
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                }
                            })} type="text" className="form-control main-filter-input  font-weight-bold" name="fullName" placeholder="نام" />
                            {/* {errors.fullName?.type === "fullName" && <div className="form-text text-danger"> فرمت نام صحیح نمی باشد</div>} */}
                            {errors.fullName?.type === "required" && <div className="form-text text-danger">نام و نام خانوادگی الزامی می باشد</div>}
                        </div>

                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <label for="subject"><span className="text-danger">*</span>  موضوع</label>
                            <input style={{ fontFamily: "SDF" }} ref={register({
                                required: true,
                                validate: {

                                    subject: (value) => {
                                        if (/^([^<>%\-@+$|='"0-9]*$)$/.test(value)) {
                                            return (true)
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                }
                            })} type="text" className="form-control  main-filter-input font-weight-bold" name="subject" placeholder=" موضوع" />
                            {errors.subject?.type === "required" && <div className="form-text text-danger"> موضوع الزامی می باشد</div>}



                        </div>
                    </div>


                    <div className="row ">


                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <label for="phone"><span className="text-danger">*</span> تلفن همراه</label>
                            <input style={{ fontFamily: "SDF" }} ref={register({
                                required: true,
                                mobileOrEmail: (value) => {
                                    if ((/^[0][9][0-3][0-9]{8,8}$/.test(value))) {
                                        return (true)
                                    }
                                    return false;
                                }
                            })} type="phone" className="form-control  main-filter-input font-weight-bold" name="phoneNumber" placeholder=" تلفن همراه " />
                            {errors.phoneNumber?.type === "required" && <div className="form-text text-danger"> تلفن همراه الزامی می باشد </div>}


                        </div>


                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <label for="email"> ایمیل </label>
                            <input style={{ fontFamily: "SDF" }} ref={register({
                                required: false,
                                email: (value) => {
                                    if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))) {
                                        return (true)
                                    }
                                    return false;
                                }
                            })} type="email" className="form-control main-filter-input  font-weight-bold" name="email" placeholder="ایمیل" />
                            {errors.email?.type === "email" && <div className="form-text text-danger">فرمت ایمیل وارد شده صحیح نمی باشد.</div>}

                        </div>

                    </div>

                    <div className="row">
                        <div className="form-group font-weight-bold col-md-12 col-xs-12">
                            <label for="remark"><span className="text-danger">*</span> توضیحات </label>

                            <textarea style={{ fontFamily: "SDF" }} ref={register({
                                required: true,

                            })} className="form-control main-filter-input  font-weight-bold" name="remark" placeholder="توضیحات خود را مطرح کنید" />
                            {errors.remark?.type === "required" && <div className="form-text text-danger">  توضیحات الزامی می باشد </div>}

                        </div>
                    </div>
                    <div className="row">

                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            {/* <label for="file"><span className="text-danger">*</span>  فایل </label> */}

                            <div class="custom-file ">

                                <input type="file" class="custom-file-input"
                                    ref={register({
                                        required: false,
                                    })}

                                    onChange={(e) => changeFileUploader(e)} id="customFile" name="file" />
                                {/* {errors.file?.type === "required" && <div className="form-text text-danger">  فایل  خود را آپلود کنید  </div>} */}


                                <label class="custom-file-label text-left" for="customFile">

                                    <u className="text-danger"><span className="flaticon-chevron-arrow-down text-danger"></span></u>
                                    <span> {fileName}</span>
                                </label>

                            </div>

                        </div>
                    </div>
                    <div className="row">

                        <div className="form-group font-weight-bold col-md-6 col-xs-12">

                            <input style={{ fontFamily: "SDF" }} ref={register({
                                required: true,

                            })} maxLength={4} type="text" className="form-control  main-filter-input font-weight-bold" name="captcha" placeholder=" کد را وارد نمایید" />
                            {errors.captcha?.type === "required" && <div className="form-text text-danger">   پر کردن این فیلد الزامی می باشد.</div>}

                        </div>
                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <img src={captchaUrl} width="100" height="150" />

                            <span onClick={() => resetCaptcha()} >
                                <img src="/images/refresh.png" width="25" height="25" />
                            </span>

                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group font-weight-bold col-md-6 col-xs-12">
                            <LoadingButton loading={loading} text=" ارسال فرم" />
                            {/* <button className="btn btn-danger btn-block" disabled={loading} >ارسال رزومه</button> */}


                        </div>
                    </div>

                </div>

                <div className="form-group font-weight-bold col-md-6 col-xs-12">
                    <div> راه های ارتباطی</div>
                    <div className="mt-3">
                        <span className="flaticon-phone"></span> &nbsp;
                        شماره همراه: 09053408396 (ارتباط در شبکه های اجتماعی)
                    </div>
                    <div className="mt-3">
                        <span className="flaticon-support"></span> &nbsp;
                        شماره پیامک: 300084733
                    </div>

                    <div className="mt-3">
                        <span className="flaticon-mail"></span> &nbsp;
                        آدرس ایمیل: info@taminplus.com
                    </div>

                    <div className="mt-3">
                        <img src="/images/pin.png" /> &nbsp;
                        آدرس : همت غرب ، باکری جنوب ، اولین دسترسی محلی ، خیابان مخابرات کوچه رز ، کوچه رضوان ، پلاک 1/1 ، ساختمان گلدایران ، طبقه پنجم

                    </div>

                    <div className="mt-3">
                        <img src="/images/post.png" /> &nbsp;
                        کدپستی: 1474973391
                    </div>


                    <div className="mt-3">
                        <img src="/images/capture.JPG" />
                    </div>

                </div>

            </div>



        </form>
    )
}


export default ContactUs;