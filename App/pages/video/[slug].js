
import { getPostByTitle, getPostsSlugs } from "lib/api";
import ReactPlayer from 'react-player'

import Head from "next/head";
import { useEffect } from "react";
import { browserVersion, isMobileSafari } from 'react-device-detect';
import { webpConverter } from 'helpers/Helpers';
import { videoServices } from "services/media/videoServices";
import VideoSidebar from "components/video/VideoSidebar";
var moment = require('jalali-moment');
import { ServerFileIdentifier } from "constants/configs";
import { VideoSource } from "utils/videoSource";


export default function BlogDetail({ post }) {

    if (!post) {
        return null
    }
    const ad = ServerFileIdentifier();
    // post.content = transformHref(post.content || "") ;


    const PlayIcon = ({ title }) => {
        return (
            <>
                <a className="popup-video popup-youtube">
                    <i className="webexflaticon flaticon-play-button-2" aria-hidden="true"></i>
                    <span class="pulse-animation"></span>
                </a>
                {/* <h1 className="video-title mx-auto">
                    {title}
                </h1> */}
            </>
        )
    }


    return (
        <>
            <Head>
                <title>{post.seoTitle}</title>
                <meta name="description" content={post.seoDescription} />
                <link rel="canonical" href={`/video/${post.seoUrl}`}></link>
            </Head>
            <section className="blog-single-news mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 sidebar-right">
                            <VideoSidebar isDetail={true} />
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
                                    <div className="new-top-infos-container mrb-30">

                                        <div className="mb-2"><small>دسته بندی : {post.videoCategoryTitle}  |  منتشر شده در تاریخ : {moment(post.createDate).locale('fa').format('YYYY/MM/DD')}</small></div>
                                        <h1 className="entry-title text-capitalize">{post.title}</h1>
                                    </div>
                                    <div className="entry-content">
                                        <div dangerouslySetInnerHTML={{ __html: post.remark }} className=""></div>
                                    </div>
                                    {
                                        post.videoSource == VideoSource.LocalFile ?
                                            // <video width="100%" height="100%" controls poster={`${ad}${post.coverAttachment[0]}`}>
                                            //     <source src={`${ad}${post.fileAttachment[0]}`} type="video/mp4" />
                                            //     <source src={`${ad}${post.fileAttachment[0]}`} type="video/ogg" />

                                            // </video>
                                            <div style={{ width: "100%", height: "100%" }}>
                                                {/* <ReactPlayer
                                                    // light={`${ad}${`Files/Media/VideoCoverAttachments/taminplus_34662.png`}`}
                                                    light={`${ad}${post?.coverAttachment[0]?.filePath}`}

                                                    playIcon={<PlayIcon title={post.title} />}
                                                    width="100%" height="100%" controls={true}
                                                    url={`${ad}${post?.fileAttachment[0]?.filePath}`}


                                                /> */}
                                                <video width="100%" height="100%" controls poster={`${ad}${post.coverAttachment[0]?.filePath}`}>
                                                    <source src={`${ad}${post.fileAttachment[0]?.filePath}`} type="video/mp4" />
                                                    <source src={`${ad}${post.fileAttachment[0]?.filePath}`} type="video/ogg" />

                                                </video>
                                            </div>
                                            : null
                                    }


                                    {
                                        post.videoSource == VideoSource.DirectLink ?
                                            <div style={{ width: "100%", height: "100%" }}>

                                                {/* <ReactPlayer
                                                    // light={`${ad}${`Files/Media/VideoCoverAttachments/taminplus_34662.png`}`}
                                                    light={`${ad}${post?.coverAttachment[0]?.filePath}`}

                                                    playIcon={<PlayIcon title={post.title} />}
                                                    width="100%" height="100%" controls={true}
                                                    url={`${ad}${post.fileAttachment[0]?.filePath}`}


                                                /> */}
                                                <video width="1000px" height="100%" controls poster={`${ad}${post.coverAttachment[0]?.filePath}`}>
                                                    <source src={post.videoLink} type="video/mp4" />
                                                    <source src={post.videoLink} type="video/ogg" />

                                                </video>
                                            </div>
                                            : null
                                    }


                                    {
                                        post.videoSource == VideoSource.Aparat ?
                                            // <video width="100%" height="100%" controls poster={`${ad}${post.coverAttachment[0]}`}>
                                            //     <source src={`${post.videoLink}`} type="video/mp4" />
                                            //     <source src={`${post.videoLink}`} type="video/ogg" />

                                            // </video>

                                            <div dangerouslySetInnerHTML={{ __html: post.videoLink }} className=""></div>


                                            : null
                                    }


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
    var post = await videoServices.getById(params.slug);

    return {
        props: {
            post: post.data,
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {

    var paths = await videoServices.getAllId();
    paths = paths.data.map(q => ({ params: { slug: `${q}` } }))
    return {
        paths: paths,
        fallback: true,

    };
}