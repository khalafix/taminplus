import Image from "next/image";
import { isDesktop, isMobile } from 'react-device-detect';


const About = ({ about }) => {


    return (
        <section className="about-section anim-object pdt-10  pdb-20">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12 col-xl-6">
                        <h2 className="title-under-line mrb-70">{about.title}</h2>
                        <h5 className="mrb-30 text-primary-color">{about.suTitr}</h5>
                        <div dangerouslySetInnerHTML={{ __html: about.description }} className="mrb-40"></div>
                    </div>
                    {!isMobile && <div className="col-md-12 col-xl-6">
                        <div className="about-image-block mrb-lg-60">

                            <img width={570} height={570} alt="تامین پلاس" src={`https://taminplus.com/${about.medias[0].mediaType}/${about.medias[0].rowId}/${about.medias[0].fileName}`} />

                        </div>
                    </div>}

                </div>
                {isMobile && <div className="row mrt-100 mrt-90">
                    <div className="col-12">
                        <div className="funfact mrb-lg-30 mrb-60">
                            <div className="icon">
                                <span className="webexflaticon flaticon-trophy"></span>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default About;