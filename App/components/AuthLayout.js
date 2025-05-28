import { useState } from "react";
import Login from "./Login";
import SendVerificationCode from "./SendVerificationCode";
import Signup from "./Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlreadyRegistered from "./AlreadyRegistered";



const AuthLayout = (props) => {
    let [activeTab, setActiveTab] = useState(1);
    let [hideTab, setHideTab] = useState(false);

    const hideHeaderCard=()=>{
        setHideTab(true)
    }
    return (
        <div className="auth-layout-container ">
            <div className="auth-info-box">
                <div className="card">
                    {
                        hideTab==true ? null :
                        <div className="card-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-6 text-left ">
                                    <a onClick={() => setActiveTab(1)} className={`font-weight-bold btn  btn-sm w-100 m-0 p-2 ${activeTab == 1 && "auth-tabs-link"}`}>ورود</a>
                                </div>
                                <div className="col-lg-6 col-6 text-left">
                                    <a onClick={() => setActiveTab(2)} className={`font-weight-bold btn  btn-sm w-100 m-0 p-2 ${activeTab == 2 && "auth-tabs-link"}`}>ثبت نام</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center">
                                    {activeTab == 1 && <Login toast={toast} setActiveTab={setActiveTab} />}
                                    {activeTab == 2 && <Signup hideHeaderCard={hideHeaderCard} toast={toast} setActiveTab={setActiveTab} />}
                                    {activeTab == 3 && <SendVerificationCode toast={toast} setActiveTab={setActiveTab} />}
                                    {activeTab == 4 && <AlreadyRegistered toast={toast} setActiveTab={setActiveTab} />}

                                </div>
                            </div>
                        </div>
                    </div>
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



export default AuthLayout;