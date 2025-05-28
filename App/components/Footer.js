import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
var _ = require("lodash");
// import { useGetFooterLinks, useGetSocialNetworks } from 'actions/index';
import { useEffect, useState } from "react";
import { socialMediaServices } from "services/base-Info/socialMediaServices";
import { ServerFileIdentifier } from "constants/configs";
import { pageServices } from "services/base-Info/pageServices";
import { Modal } from "react-bootstrap";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  const [dataSocialMedia, setDataSocialMedia] = useState([]);
  const [dataPages, setDataPages] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSocialMedia();
    getPagesLinks();
  }, []);
  //let { data: items } = useGetFooterLinks();
  //let { data: socialLinks } = useGetSocialNetworks();
  // if (!items || !socialLinks) {
  // 	return null;
  // }
  // if (items) {
  // 	items = _.orderBy(items, ['priority'])
  // }
  const getSocialMedia = async () => {
    const result = await socialMediaServices.getUserList(5);
    
    setDataSocialMedia(result.data);
  };

  const getPagesLinks = async () => {
    const result = await pageServices.getListUserPages();

    setDataPages(result.data);
  };

  return (
    <footer className="footer direction-l mt-1 ">
      <div className="footer-main-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="widget footer-widget text-center">
                <img
                  id="logo-image"
                  className="img-center mb-2"
                  src="/images/tamin.png"
                  alt="تامین پلاس"
                />
                <address className="mrb-20 mrt-15 d-flex justify-content-between">
                  <div></div>
                  <div className="mx-auto text-center d-flex">
                    <span onClick={() =>
                      window.open(
                        "https://logo.samandehi.ir/Verify.aspx?id=345779&p=xlaoaodsdshwjyoejyoepfvl",
                        "Popup",
                        "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=450,height=630,top=30"
                      )
                    }>
                      <img
                        referrerpolicy="origin"
                        id="rgvjwlaoapfujzpejzpesizp"
                        style={{ cursor: "pointer" }}
                        alt="logo-samandehi"
                        src="https://logo.samandehi.ir/logo.aspx?id=345779&p=qftishwlujynyndtyndtbsiy"
                      /></span>
                    <a
                      referrerpolicy="origin"
                      href="https://trustseal.enamad.ir/?id=330420&amp;Code=GQDqqbuEgXdabrKPoOC9"
                      target="_blank"
                    >
                      <figure
                        className="footer__certs__cer-img"
                        style={{ width: "105px" }}
                      >
                        <svg
                          id="GQDqqbuEgXdabrKPoOC9"
                          referrerpolicy="origin"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 29.3 23.38"
                        >
                          <g>
                            <g>
                              <g>
                                <path
                                  d="M0,22.39a52,52,0,0,1,9.54-5.67c5.21-2.31,10.17-6.09,10.17-11.09S17.65,0,16.43,0C14.75,0,9.87,2,8.32,10.46s1.89,12.72,4.79,12.89,4.07-.49,5.88-4.27c1.71-1.28,3.16-1.64,3.55-3.48a.85.85,0,0,0-.76-1L21,14.5a2.46,2.46,0,0,1,1.68-1.18c1.13-.17,1.89-2.14,1.89-2.14s-4,.79-6.39,6.51-7,2.94-7.39.63A19.88,19.88,0,0,1,12.69,4.58c2.63-4.58,8.07-1,2.63,5.46C10,15.34.46,17.31,0,22.39Z"
                                  style={{ fill: "#fff" }}
                                ></path>
                                <path
                                  d="M25.58,11.78l1,1.67a.65.65,0,0,0,1,.15l1.51-1.33a.67.67,0,0,0,.12-.83l-1-1.64a.65.65,0,0,0-1-.15L25.7,11A.66.66,0,0,0,25.58,11.78Z"
                                  style={{ fill: "#fff" }}
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </figure>
                    </a>
                    {/* <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=330420&amp;Code=GQDqqbuEgXdabrKPoOC9"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=330420&amp;Code=GQDqqbuEgXdabrKPoOC9" alt="" style={{ cursor: "pointer" }} id="GQDqqbuEgXdabrKPoOC9" /></a> */}
                  </div>
                </address>
                <div
                  className="d-flex justify-content-center"
                  referrerpolicy="origin"
                  target="_blank"
                >
                  {dataSocialMedia &&
                    dataSocialMedia.map((q) => {
                      return (
                        <figure className="mt-0 mr-2 ml-2 mb-0 footer__certs__cer-img">
                          <Link href={`${q.link}`}>
                            <a>              <img
                              className="social-media-icon"
                              title={q.title}
                              width={32}
                              height={32}
                              src={`${ServerFileIdentifier()}${q.file}`}
                            /></a>
                          </Link>

                        </figure>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-3 text-center">
              <div className="widget footer-widget">
                <h5 className="widget-title text-white mrb-30">
                  {" "}
                  تماس با تامین پلاس
                </h5>

                <ul className="footer-widget-list">
                  <div className="footer-contact-item mrb-10 text-right">
                    <a href="tel: 02147303" className="text-light-gray">
                      {" "}
                      021 47303{" "}
                      <span className="flaticon-phone-call-1 mrr-10 f-center"></span>
                    </a>
                  </div>
                </ul>
                <ul className="footer-widget-list">
                  {/* <li className=" text-white mrb-30"> : آدرس</li> */}
                  <div className="footer-contact-item mrb-10 text-right text-light-gray">
                    {/* <span className="flaticon-home-1 mrr-10 f-right"></span> */}
                    <p>
                      {/* <span className="flaticon-home-1 mrr-10 f-right "></span> &nbsp; */}
                      <span>
                        همت غرب، باکری جنوب، اولین دسترسی محلی، خیابان مخابرات
                        کوچه رز، کوچه رضوان، پلاک یک
                      </span>
                    </p>
                  </div>
                </ul>

                <ul style={{ cursor: "pointer" }} className="footer-widget-list" onClick={() => handleShow()}>
                  <div className="footer-contact-item mrb-10 text-right text-light-gray">
                    <span className="flaticon-email mrr-10 ml-1 f-right"></span>

                    <span>
                      عضویت در خبرنامه
                    </span>

                  </div>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-3 text-center">
              <div className="widget footer-widget">
                <h5 className="widget-title text-white mrb-30">دسترسی بیشتر</h5>

                <ul className="footer-widget-list">
                  {dataPages &&
                    dataPages
                      .filter((f) => f.pagesLinkType == 20)
                      .map((q) => {
                        return (
                          <li>
                            <Link href={`${q.link}`}>
                              <a> {q.title}</a>
                            </Link>
                          </li>
                        );
                      })}
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 text-center">
              <div className="widget footer-widget">
                <h5 className="widget-title text-white mrb-30">ارتباط با ما</h5>
                <ul className="footer-widget-list">
                  {/* <li><Link href={"/page/" + "قوانین"} ><a > قوانین و مقررات</a></Link></li>
									<li><Link href={"/page/" + "درباره-ما"} ><a >درباره ما</a></Link></li>
									<li><Link href={"/page/" + "تماس-با-ما"} ><a >    تماس با ما </a></Link></li>
									<li><Link href={"/page/" + "همکاری-با-ما"} ><a >   همکاری با ما</a></Link></li> */}
                  {dataPages &&
                    dataPages
                      .filter((f) => f.pagesLinkType == 10)
                      .map((q) => {
                        return (
                          <li>
                            <Link href={`${q.link}`}>
                              <a> {q.title}</a>
                            </Link>
                          </li>
                        );
                      })}
                </ul>
              </div>
            </div>


            <Modal
              size="lg"
              // aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show} onHide={handleClose}

            >
              <Modal.Header closeButton>
                <Modal.Title >   عضویت در خبرنامه </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewsLetter handleClose={handleClose} />
              </Modal.Body>

            </Modal>

            {/* {items && Object.keys(_.groupBy(items, "footerLinkCategoryTitle")).map(q => {
							return (
								<div className="col-xl-4 col-lg-6 col-md-6 text-center">
									<div className="widget footer-widget">
										<h5 className="widget-title text-white mrb-30">{q}</h5>
										<ul className="footer-widget-list">
											{_.groupBy(items, "footerLinkCategoryTitle")[q].map(se => {
												return (
													<li><Link href={se.link} ><a >{se.title}</a></Link></li>
												)
											})}
										</ul>
									</div>
								</div>
							)
						})} */}
          </div>
        </div>
      </div>
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center">
                <span
                  style={{ unicodeBidi: "plaintext" }}
                  className="text-light-gray"
                >
                  کلیه حقوق برای تامین پلاس محفوظ می باشد.{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
