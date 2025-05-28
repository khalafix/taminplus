import AuthLayout from "components/AuthLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/router';
import LoadingButton from "./LoadingButton";
import axios from 'axios';
import { getCookie, setCoockie, deleteCoockie } from 'helpers/Helpers';
import { authenticationServices } from "services/authenticationServices";

const ResetPassword = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    let [loading, setLoading] = useState(false);
    const router = useRouter();


    const onSubmit = async(data) => {
        delete data.password_repeat;
        setLoading(true);
        let result = await authenticationServices.changePassword(data);
        if (result.isSuccess == true) {
            var token = getCookie("token");

            if (token) {
                deleteCoockie("token", token);
            }
            
            setCoockie("token", result.data.token);
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
            props.toast.error(result.message)
        }





    };
    var passwordCurrent = watch("newPassword", "");
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="mb-3">فراموشی رمز عبور</h6>
            <div className="form-group">
                <label for="email">کد ارسال شده</label>
                <input ref={register({
                    required: true,
                })} type="text" className="form-control" name="code" />
                {errors.userName?.type === "required" && <div className="form-text">نام کاربری الزامی می باشد.</div>}
            </div>
            <br />
            <div className="form-group">
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
                })} type="password" className="form-control" name="newPassword" />
                {errors.newPassword?.type === "required" && <div className="form-text">رمز  کاربری الزامی می باشد.</div>}
                {errors.newPassword?.type === "captalAndSmall" && <div className="form-text">رمز عبور باید شامل حروف کوچک و بزرگ لاتین باشد.</div>}
                {errors.newPassword?.type === "minLength" && <div className="form-text">رمز عبور باید حداقل 8 کاراکتر باشد.</div>}
            </div>
            <br />
            <div className="form-group">
                <label for="pwd">تکرار رمز عبور</label>
                <input ref={register({
                    validate: {
                        checkPass: (value) => {

                            return value === passwordCurrent || false
                        }
                    }
                })} type="password" className="form-control" name="password_repeat" />
                {errors.password_repeat?.type === "checkPass" && <div className="form-text">رمز عبور با تکرار آن همخوانی ندارد.</div>}

            </div>
            <br />
            <LoadingButton loading={loading} text="تغییر رمز عبور" />
        </form>
    )
}


export default ResetPassword;