import Image from "next/image";
import Link from "next/link";



const ArticleThumbPlaceHolder = () => {
    return (
        <div  className={`col-md-4 col-lg-4 col-xl-4`}>
            <div className="news-wrapper place-holder mrb-30 mrb-sm-40">
                <div className="news-thumb ">
                    <div className="news-top-meta">
                        <span className="entry-category">place holder</span>
                    </div>
                </div>
                <div className="news-details">
                    <div className="news-description mb-20">
                        <h4 className="the-title mrb-30">
                            Placeholder Title
                        </h4>
                        <div className="news-bottom-meta">
                            <span className="entry-date mrr-20"><span className="webexflaticon flaticon-calendar"></span>PlaceHolderDate</span>
                            <span className="entry-author"><span className="webexflaticon flaticon-user"></span>Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ArticleThumbPlaceHolder;