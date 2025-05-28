import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { videoCategoryServices } from 'services/media/videoCategoryServices';
import { videoServices } from 'services/media/videoServices';
import { ServerFileIdentifier } from "constants/configs";

var moment = require('jalali-moment');

const VideoSidebarCategory = ({ categories, categoryChangeHandler, isDetail }) => {
    return (
        <div class="widget sidebar-widget widget-categories bg-light">
            <h4 class="mrb-30 single-blog-widget-title">گروه بندی ویدیوها</h4>
            {!isDetail ?
                <ul class="list">
                    <li><Link href={{ pathname: '/video' }}><a>همه ویدیوها</a></Link></li>
                    {categories.map(q => {
                        return (
                            <li><a onClick={() => categoryChangeHandler(q.id)} href="#">{q.title}</a></li>
                        )
                    })}
                </ul>
                :
                <ul class="list">
                    <li><Link href={{ pathname: '/video' }}><a>همه ویدیوها</a></Link></li>
                    {categories.map(q => {
                        return (
                            <li><Link href={{ pathname: '/video' }}><a href="#">{q.title}</a></Link></li>
                        )
                    })}
                </ul>
            }
        </div>
    );
};



const PopularVideos = ({ latestPost }) => {
    const ad = ServerFileIdentifier();

    return (
        <div class="widget sidebar-widget widget-popular-posts bg-light">
            <h4 class="mrb-30 single-blog-widget-title">جدیدترین ویدیوها</h4>
            {latestPost.map(post => {
                return (
                    <div class="single-post media mrb-10">
                        <div class="post-image mrl-20">
                            <img alt={post.title} className="img-full" src={`${ad}${post.cover}`} />
                        </div>
                        <div class="post-content media-body align-self-center">
                            <h5 class="mrb-5"><Link href={`/video/[slug]`} as={`/video/${post.id}`}><a >{post.title}</a></Link></h5>
                            <span class="post-date"><i class="fa fa-clock-o mrr-5"></i>{moment(post.createDate).locale('fa').format('YYYY/MM/DD')}</span>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}


const VideoSidebar = (props) => {
    const [dataVideoCategory, setDataVideoCategory] = useState([]);
    const [dataLastVideo, setDataLastVideo] = useState([]);

    useEffect(() => {


        (async () => {
    
            let resultVideoCategory = await videoCategoryServices.getAll();
            setDataVideoCategory(resultVideoCategory.data);
    
            let resultLastVideo = await videoServices.getLastVideo();
            setDataLastVideo(resultLastVideo.data);
    
        })()
    
      }, []);

    // let { data: categories } = useGetArticleCategories();
    // let { data: latestPost } = useGetArticles();

    if (!dataVideoCategory || !dataLastVideo) {
        return null;
    }

    return <aside class="news-sidebar-widget">
        <VideoSidebarCategory isDetail={props.isDetail} categoryChangeHandler={props.categoryChangeHandler} categories={dataVideoCategory} />
        <PopularVideos latestPost={dataLastVideo} />
        {/* <ArticleTags /> */}
    </aside>


}




export default VideoSidebar;