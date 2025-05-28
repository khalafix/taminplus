import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticationServices } from "services/authenticationServices";
import { useForm } from "react-hook-form";
import LoadingButton from "components/LoadingButton";


const ResetPassWord = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isCodeExpire, setIsCodeExpire] = useState(false);
    const [loadingGetData, setLoadingGetData] = useState(false);
    const [userId, setUserId] = useState("");

    const getConfirmation = async () => {
        setLoadingGetData(true);
        let code = window.location.pathname.replace("/resetpassword/", "");

        const result = await authenticationServices.getResetPasswordConfirmation(
            code
        );

        if (result.isSuccess) {
            setLoadingGetData(false);
            setIsCodeExpire(false);
            setUserId(result.data)
        } else {
            if (result.message) {
                props.toast.error(result.message)
            }
            setIsCodeExpire(true);

            setLoadingGetData(false);
        }
        setLoadingGetData(false);

    };


    const onSubmit = async (data) => {
        setLoading(true);
        data.confirmPassword = data.password_repeat;
        delete data.password_repeat;
        let code = window.location.pathname.replace("/resetpassword/", "");
        data.userId = userId;

        data = { ...data, resetCode: code };

        let result = await authenticationServices.changePassword(data);

        if (result.isSuccess) {
            setLoading(false);
            setIsConfirm(true);
        } else {
            props.toast.error(result.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        getConfirmation();
    }, []);

    const Login = () => {
        window.location.href = '/auth'
    }
    var loadingStyleButton = {
        width: props.width ? props.width : "53px",
        borderRadius: "50%",
        padding: "0px",
        lineHeight: "0",
    }

    var passwordCurrent = watch("password", "");

    return (
        <div className="auth-layout-container ">
            <div className="auth-info-box">
                <div className="card">
                    {
                        loadingGetData ?
                            <div className="card-body">

                                <button style={{ backgroundColo: 'red', ransition: "all 0.3s", loadingStyleButton }} className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block">
                                    {<div class="lds-ring" style={{ width: "35px", height: "23px" }}><div></div><div></div><div></div><div></div></div>}
                                </button>
                            </div> :
                            <div className="card-body font-weight-bold">
                                <div className="container">
                                    {
                                        isCodeExpire == false ?

                                            !isConfirm ?
                                                <div className="row">
                                                    <div className="col-12 text-center ">
                                                        <h4 style={{ color: "cadetblue" }}>{"رمز عبور جدید خود را مشخص کنید"}</h4>
                                                    </div>

                                                    <div className="col-12 text-center">
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            <h6 className="mb-3"></h6>
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
                                                                {errors.password?.type === "required" && <div className="form-text font-weight-bold">رمز عبور الزامی می باشد.</div>}
                                                                {errors.password?.type === "captalAndSmall" && <div className="form-text font-weight-bold">رمز عبور باید شامل حروف کوچک و بزرگ لاتین باشد.</div>}
                                                                {errors.password?.type === "minLength" && <div className="form-text font-weight-bold">رمز عبور باید حداقل 8 کاراکتر باشد.</div>}

                                                            </div>
                                                            <br />
                                                            <div className="form-group font-weight-bold">
                                                                <label for="pwd">تکرار رمز عبور</label>
                                                                <input ref={register({
                                                                    required: true,

                                                                    validate: {
                                                                        checkPass: (value) => value === passwordCurrent || false
                                                                    }
                                                                })} type="password" className="form-control font-weight-bold" name="password_repeat" />
                                                                {errors.password_repeat?.type === "checkPass" && <div className="form-text font-weight-bold">رمز عبور با تکرار آن همخوانی ندارد.</div>}

                                                            </div>
                                                            <br />

                                                            <LoadingButton loading={loading} text=" ثبت" />
                                                        </form>
                                                    </div>
                                                </div>

                                                : (



                                                    <div className="col-12 text-center">
                                                        <h4 style={{ color: "cadetblue" }}>تغییر رمز انجام شد</h4>

                                                        <a onClick={() => Login()} className={`font-weight-bold btn  btn-sm w-100 m-0 p-2 `}>ورود</a>


                                                    </div>
                                                )

                                            :
                                            <div className="col-12 text-center">
                                                <h4 className="mb-1 font-weight-bold text-center text-danger">{"خطایی رخ داده است"}</h4>

                                                <a onClick={() => Login()} className={`font-weight-bold btn  btn-sm w-100 m-0 p-2 `}>بازگشت</a>

                                            </div>
                                    }

                                </div>
                            </div>
                    }

                </div>
            </div>
            <ToastContainer
                toastClassName="toast"
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}



export default ResetPassWord;