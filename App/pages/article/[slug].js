
import { getPostByTitle, getPostsSlugs } from "lib/api";
import ArticleSidebar from "components/article/ArticleSidebar";
import Head from "next/head";
import { useEffect } from "react";
import { browserVersion, isMobileSafari } from 'react-device-detect';
import { webpConverter } from 'helpers/Helpers';
import { articleServices } from "services/blog/articleServices";
import UserCommentsForArticles from "components/product/UserCommentsForArticles";
var moment = require('jalali-moment');


export default function BlogDetail({ post }) {

    if (!post) {
        return null
    }


    // post.content = transformHref(post.content || "") ;

    return (
        <>
            <Head>
                <title>{post.seoTitle}</title>
                <meta name="description" content={post.seoDescription} />
                <link rel="canonical" href={`/article/${post.seoUrl}`}></link>
            </Head>
            <section className="blog-single-news mt-4 ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 sidebar-right">
                            <ArticleSidebar isDetail={true} />
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="single-news-details news-wrapper mrb-30">
                                {/* <div className="news-thumb">
                                    <img className="img-full" src={post.thumbnail} alt="" />
                                    <div className="news-top-meta">
                                        <span className="entry-category">{post.articleCategoryTitle}</span>
                                    </div>
                                </div> */}
                                <div className="single-news-content">
                                    {/* <div className="news-bottom-meta mrt-20 mrb-30 d-flex justify-content-between">
                                        <span className="entry-category mrl-20">{post.articleCategoryTitle}</span>
                                        <span className="entry-date"><span className="webexflaticon flaticon-calendar mr-2"></span>{post.publishDate}</span>
                                    </div> */}
                                    <div className="new-top-infos-container mrb-20">

                                        <div className="mb-2"><small>دسته بندی : {post.articleCategoryTitle}  |  منتشر شده در تاریخ : {moment(post.createDate).locale('fa').format('YYYY/MM/DD')}</small></div>
                                        <h1 className="entry-title text-capitalize">{post.title}</h1>
                                    </div>
                                    <div className="entry-content">
                                        <div dangerouslySetInnerHTML={{ __html: post.remark }} className=""></div>
                                    </div>

                                    <UserCommentsForArticles data={post} />

                                    {/* {post.tags && <div className="single-news-tag-social-area clearfix w-100">
                                        <div className="single-news-tags f-right f-right-none mrb-lg-30">
                                            <h5 className="mrb-15">تگ های مرتبط :</h5>
                                            <ul className="list">
                                                {post.tags && post.tags.split(',').map(q => {
                                                    return (
                                                        <li><a href="#">{q}</a></li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}


export async function getStaticProps({ params }) {
    // var post = await getPostByTitle(params.slug);
    var post = await articleServices.getById(params.slug);

    return {
        props: {
            post: post.data,
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {

    var paths = await articleServices.getAllId();
    paths = paths.data.map(q => ({ params: { slug: `${q}` } }))
    return {
        paths: paths,
        fallback: true,

    };
}