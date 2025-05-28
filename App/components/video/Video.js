import Link from "next/link";
import Image from "next/image";
import ArticleThumb from "./ArticleThumb";
import { isMobile } from "react-device-detect";
import DesktopCTA from "./DesktopCTA";


const Article = ({ posts }) => {



    return (
        <section className="bg-silver-light pdt-60 pdb-60" data-background="/images/articleBack.webp" style={{ backgroundImage: "url(/images/articleBack.webp)" }}>
            <div className="section-title mrb-10 mrb-md-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-6 col-12">
                            <h5 className="mrb-15 text-primary-color sub-title-side-line">مقالات آموزشی </h5>
                            <h2 className="mrb-10">جدیدترین مقالات</h2>
                        </div>
                        {!isMobile && <div className="col-lg-4 col-xl-6 align-self-center text-left text-lg-left">
                            <Link href="/Article">
                                <a className="cs-btn-one btn-gradient-color btn-md">همه مقالات</a>
                            </Link>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="section-content">
                <div className="container">
                    <div className="row">
                        {posts.map(post => (
                            <ArticleThumb post={post} />
                        ))}
                    </div>
                    {isMobile && <div className="col-12 align-self-center text-center">
                        <Link href="/article">
                            <a className="cs-btn-one btn-gradient-color  btn-sm">همه مقالات</a>
                        </Link>
                    </div>}
                    <DesktopCTA />
                </div>
            </div>
        </section>
    );
}


export default Article;