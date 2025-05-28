import Link from "next/link";
import { useState } from "react";
import {isMobile} from 'react-device-detect';

const Faq = (props) => {
    let [activebar, setActiveBar] = useState(props.isMobile ?  null : 0);
    return (
        <section className="request-a-call-back pdt-30 pdb-50" style={{ backgroundImage: 'url(/images/freelancerBack2.webp)' }} >
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <h5 className="sub-title-side-line text-primary-color mrt-0 mrb-15">چگونه سفارش خود را ثبت کنیم ؟ </h5>
                        <h2 className="faq-title mrb-30">سوالات متداول تامین پلاس</h2>
                        
                    </div>
                    <div className="col-lg-7 text-center">
                        <div className="faq-block">
                            <div className="accordion">
                                {props.faqs.map((faq, index) => {
                                    return (
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${activebar == index && "active"}`} onClick={() => {
                                                if (activebar == index) {
                                                    setActiveBar(null)
                                                } else {
                                                    setActiveBar(index)
                                                }
                                            }}>
                                                <h5 className="title">{faq.question}</h5>
                                                <span className={`flaticon-${activebar == index ? "remove" : "add"}`}  ></span>
                                            </div>
                                            <div className="accordion-body" style={{ display: activebar == index ? 'block' : 'none' }}>
                                                <p className="text-justify">{faq.answer}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {props.isMobile && <Link href="/Faq"><a  className="cs-btn-one btn-gradient-color  btn-sm mt-2">آیا سوالات بیشتری دارید ؟</a></Link>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq;