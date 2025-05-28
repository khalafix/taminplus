import Image from "next/image";
import Link from "next/link";
import { ServerFileIdentifier } from "constants/configs";

var moment = require('jalali-moment');


const ArticleThumb = ({ post, isBlog }) => {
    const ad = ServerFileIdentifier();

    return (
        <div key={post.id} className={`col-md-6 col-lg-6 col-xl-${isBlog ? "4" : "4"} mb-3`}>
            <Link href={`article/[slug]`} as={`/article/${post.id}`}>
                <a className="w-100 h-100 d-inline-block">
                    <div className="news-wrapper mrb-10 mrb-sm-10">
                        <div className="news-thumb w-100" style={{height : isBlog ? "auto" : "auto" , maxHeight:"450px"}} > 
                            {post.file  && <img loading="lazy"  className="img-full" src={`${ad}${post.file}`} alt={post.title} />}
                            {/* <div className="news-top-meta">
                                <span className="entry-category">{post.articleCategoryTitle}</span>
                            </div> */}
                        </div>
                        <div className="news-details">
                            <div className="news-description mb-20">
                                {/* <div className="news-bottom-meta mb-3">
                                    <span className="entry-date ">{moment(post.publishedDate).locale('fa').format('YYYY/MM/DD')}<span className="webexflaticon flaticon-calendar ml-2"></span></span>
                                </div> */}
                                <h4 className="the-title mrb-10">
                                    <Link href={`article/[slug]`} as={`/article/${post.id}`}>
                                        <a>{post.title}</a>
                                    </Link>
                                </h4>
                                <p className="news-abstract text-justify">{post.shortDescription}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>

        </div>
    )
}


export default ArticleThumb;