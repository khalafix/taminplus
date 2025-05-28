
import { getPostByTitle, getPostsSlugs } from "lib/api";
import ReactPlayer from 'react-player'

import Head from "next/head";
var moment = require('jalali-moment');
import { pageServices } from "services/base-Info/pageServices";
import WorkwithUs from "components/WorkwithUs";
import ContactUs from "components/ContactUs";


export default function BlogDetail({ post }) {

    if (!post) {
        return null
    }




    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.title} />
                {/* <link rel="canonical" href={`/page/${post.title}`}></link> */}
            </Head>
            <section className="blog-single-news mt-4 ">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-lg-12">
                            <div className="title-box-center f-right">

                                <h2 className="sub-title-center text-primary-color line-top-center ">{post.title}</h2>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">

                        <div className="col-xl-12 col-lg-12">
                            <div className="single-news-details news-wrapper mrb-30">

                                <div className="single-news-content">

                                    <div className="entry-content">
                                        <div dangerouslySetInnerHTML={{ __html: post.description }} className=""></div>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>

                    
                <div className="row">
                    <div className="col-lg-12">

                        {
                            post?.title == "همکاری با ما" &&
                            <WorkwithUs />
                        }



                        {
                            post?.title == "تماس با ما" &&
                            <ContactUs />
                        }
                    </div>

                </div>

                </div>








            </section>
        </>


    )
}


export async function getStaticProps({ params }) {
    var post = await pageServices.getByTitle(params.slug);

    return {
        props: {
            post: post.data,
        },
        revalidate: 600
    }
}

export async function getStaticPaths() {

    var paths = await pageServices.getAllLink();
    paths = paths.data.map(q => ({ params: { slug: `${q.toString()}` } }));

    return {
        paths: paths,
        fallback: true,

    };
}