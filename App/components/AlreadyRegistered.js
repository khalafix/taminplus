import AuthLayout from "components/AuthLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from 'axios';
import LoadingButton from "./LoadingButton";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getCookie, setCoockie, deleteCoockie } from 'helpers/Helpers';
import ResetPassword from './ResetPassword';
import { applicationService } from "services/applicationService";
import VerificationInput from "./VerificationInput";
import { smsServices } from "services/sms/smsServices";
import { authenticationServices } from "services/authenticationServices";

const AlreadyRegistered = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [userId, setuserId] = useState(false);
  const [validUserName, setValidUserName] = useState(false);
  const [codeValidate, setCodeValidate] = useState("");
  const [userName, setUserName] = useState("");

  const [step, setStep] = useState(1);
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [captchaKey, setCaptchaKey] = useState("already-register-captcha");
  const [phoneNumberData, setPhoneNumberData] = useState("");





  const onSubmit = async (data) => {
    setLoading(true);

    if (validUserName) {
      if (codeValidate && userName) {


        let res = await smsServices.checkCodeSmSForActiveUser(codeValidate, userName)

        if (res.isSuccess) {
          props.toast.success(res.message)
          setLoading(false);
          window.location.href = `/auth`;

        }
        else {
          props.toast.error(res.message)
          setLoading(false);

        }
      }
    }
    else {

      data.captchaKey = captchaKey;
      data.phoneNumber = data.userName;

      let result = await authenticationServices.checkUserIsExsitsForActive(data);
      
      if (result.isSuccess) {

        setUserName(data.userName);
        setPhoneNumberData(data.userName)
        props.toast.success(result.message);
        setValidUserName(true);
        setValidUserName(true);

      } else {
        props.toast.error(result.message)
        setLoading(false);
        resetCaptcha();
        setValidUserName(false);

      }
      setLoading(false);

    }
  }



  const resetCaptcha = () => {
    var randomKey = Math.floor(Math.random() * (9999 - 1) + 1).toString();
    setCaptchaKey(randomKey);
    setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
    // form.setFields([{ name: ["captchaKey"], value: randomKey }]);
  }




  useEffect(() => {
    setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));

  }, []);
  const onCompleteVerificationInput = (e) => {
    setCodeValidate(e)
  }
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {
        validUserName == true ?
          <>
            <h6 className="mb-3"> کد پیامک شده را وارد نمایید </h6>
            <div className="form-group font-weight-bold">

              <VerificationInput onComplete={onCompleteVerificationInput} />
            </div>
            <div className="form-group font-weight-bold mt-2">

              <LoadingButton loading={loading} text=" ثبت" />
            </div>
            {/* <div className="form-group font-weight-bold mt-2">

              <button disabled={loading} onClick={() => sendAgain()} type="button" class="btn btn-primary ">
                ارسال مجدد پیامک
              </button>
            </div> */}
          </>

          :
          <>
            <div className="form-group font-weight-bold">
              <label for="email">نام کاربری</label>
              <input ref={register({
                required: true,
                validate: {
                  mobileOrEmail: (value) => {
                    if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || /^[0][9][0-3][0-9]{8,8}$/.test(value))) {
                      return (true)
                    }
                    return false;
                  }
                }
              })} maxLength={"11"} type="text" className="form-control font-weight-bold" name="userName" placeholder="تلفن همراه" />
              {errors.userName?.type === "required" && <div className="form-text">نام کاربری الزامی می باشد.</div>}
              {errors.userName?.type === "mobileOrEmail" && <div className="form-text">فرمت نام کاربری صحیح نمی باشد.</div>}
            </div>
            <div className="form-group font-weight-bold mt-2 mb-2">
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
            <LoadingButton loading={loading} text="ارسال کد" />
          </>
      }
    </form>


  );
};

export default AlreadyRegistered;
