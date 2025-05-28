import axios from 'axios';
import VideoSidebar from "components/video/VideoSidebar";
import VideoThumb from "components/video/VideoThumb";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { videoServices } from 'services/media/videoServices';
import { videoCategoryServices } from 'services/media/videoCategoryServices';



const VideoList = ({ data, error }) => {


    return data.map((post) => {
        return (
            <VideoThumb post={post} isBlog={true} />
        );
    })
}



export default function Video({ posts, total  }) {
    // const dispatch = useDispatch();
    // dispatch({
    //     type : types.GET_INITIAL_POSTS , 
    //     payload : initialData
    // })
    const router = useRouter()
    const [pageIndex, setPageIndex] = useState(0);
    const [videoListCategory, setVideoCategory] = useState([]);
    const categoryChangeHandler = (categoryId) => {

        const currentPath = router.pathname;
        const currentQuery = { ...router.query };
        currentQuery.PageNumber = 1;
        currentQuery.videoCategoryId = categoryId;
        //props.onChange(data.selected);
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }





    if (!posts) {
        return <div></div>
    }


    return (
        <>
            <Head>
                <title>ویدیوهای آموزشی </title>
                <meta name="description" content="مقالات آموزشی " />
                <link rel="canonical" href="/videos"></link>
            </Head>
            <div class="service-details-page mt-4">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 sidebar-right">
                            {posts && <VideoSidebar isDetail={false} categoryChangeHandler={categoryChangeHandler} />}
                        </div>
                        <div class="col-xl-8 col-lg-7">
                            <div className="row mb-5">
                                <div className="col-lg-12 col-12 mx-auto">
                                    <div className="section-title-left-part">
                                        <h1 className="entry-title text-capitalize">ویدیوهای آموزشی </h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <VideoList data={posts} error={false} />
                            </div>
                            <div class="row">
                                <div class="col-xl-12">
                                    <nav class="pagination-nav pdt-30">
                                        {total > 6 && <Pagination page={pageIndex} onChange={setPageIndex} pageCount={total / 6} />}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    let model = {};
    model.size = 6;
    model.page = context.query["PageNumber"];
    model.sorted = [];
    model.filtered = [{"column":"videoCategoryId" , "value" :context.query["videoCategoryId"]}];


    let result = await videoServices.getAll(model);
    return { props: { posts: result.data , total :result.total} }

}


