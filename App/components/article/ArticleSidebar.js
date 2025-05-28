import Link from 'next/link';
import React, { useState, useEffect } from "react";
// import { useGetArticleCategories, useGetArticles } from 'actions/index';
import { articleCategoryServices } from 'services/blog/articleCategoryServices';
import { articleServices } from 'services/blog/articleServices';
import { ServerFileIdentifier } from "constants/configs";

var moment = require('jalali-moment');

const ArticleSidebarCategory = ({ categories, categoryChangeHandler, isDetail }) => {
    return (
        <div class="widget sidebar-widget widget-categories bg-light">
            <h4 class="mrb-30 single-blog-widget-title">دسته بندی مقالات</h4>
            {!isDetail ?
                <ul class="list">
                    <li><Link href={{ pathname: '/article' }}><a>همه دسته بندی ها</a></Link></li>
                    {categories.map(q => {
                        return (
                            <li><a onClick={() => categoryChangeHandler(q.id)} href="#">{q.title}</a></li>
                        )
                    })}
                </ul>
                :
                <ul class="list">
                    <li><Link href={{ pathname: '/article' }}><a>همه دسته بندی ها</a></Link></li>
                    {categories.map(q => {
                        return (
                            <li><Link href={{ pathname: '/article' }}><a href="#">{q.title}</a></Link></li>
                        )
                    })}
                </ul>
            }
        </div>
    );
};



const PopularArticles = ({ latestPost }) => {
    const ad=ServerFileIdentifier();
    return (
        <div class="widget sidebar-widget widget-popular-posts bg-light">
            <h4 class="mrb-30 single-blog-widget-title">جدیدترین مقالات </h4>
            {latestPost.map(post => {
                return (
                    <div class="single-post media mrb-10">
                        <div class="post-image mrl-20">
                            <img alt={post.title} className="img-full" src={`${ad}${post.file}`} />
                        </div>
                        <div class="post-content media-body align-self-center">
                            <h5 class="mrb-5"><Link href={`/article/[slug]`} as={`/article/${post.id}`}><a >{post.title}</a></Link></h5>
                            <span class="post-date"><i class="fa fa-clock-o mrr-5"></i>{moment(post.createDate).locale('fa').format('YYYY/MM/DD')}</span>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

const ArticleTags = () => {
    return (
        <div class="widget sidebar-widget widget-tags">
            <h4 class="mrb-30 single-blog-widget-title">تگ ها</h4>
            <ul class="list">
                <li><a href="#">Consulting</a></li>
                <li><a href="#">Finance</a></li>
                <li><a href="#">Law</a></li>
                <li><a href="#">Corporate</a></li>
                <li><a href="#">Taxes</a></li>
                <li><a href="#">Meeting</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Investment</a></li>
            </ul>
        </div>
    );
}


const ArticleSidebar = (props) => {
    const [dataArticleCategory, setDataArticleCategory] = useState([]);
    const [dataLastArticle, setDataLastArticle] = useState([]);
    const ad = ServerFileIdentifier();

    useEffect(() => {


        (async () => {
    
            let resultArticleCategory = await articleCategoryServices.getAll();
            setDataArticleCategory(resultArticleCategory.data);
    
            let resultLastArticle = await articleServices.getLastArticle();
            setDataLastArticle(resultLastArticle.data);
    
        })()
    
      }, []);

    // let { data: categories } = useGetArticleCategories();
    // let { data: latestPost } = useGetArticles();

    if (!dataArticleCategory || !dataLastArticle) {
        return null;
    }

    return <aside class="news-sidebar-widget">
        <ArticleSidebarCategory isDetail={props.isDetail} categoryChangeHandler={props.categoryChangeHandler} categories={dataArticleCategory} />
        <PopularArticles latestPost={dataLastArticle} />
        {/* <ArticleTags /> */}
    </aside>


}




export default ArticleSidebar;