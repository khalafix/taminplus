import axios from 'axios';
import ArticleSidebar from "components/article/ArticleSidebar";
import ArticleThumb from "components/article/ArticleThumb";
import ArticleThumbPlaceHolder from "components/article/ArticleThumbPlaceHolder";
import Pagination from "components/Pagination";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { articleServices } from 'services/blog/articleServices';
import { articleCategoryServices } from 'services/blog/articleCategoryServices';



const BlogList = ({ data, error }) => {


    return data.map((post) => {
        return (
            <ArticleThumb post={post} isBlog={true} />
        );
    })
}



export default function Blog({ posts, total  }) {
    // const dispatch = useDispatch();
    // dispatch({
    //     type : types.GET_INITIAL_POSTS , 
    //     payload : initialData
    // })
    const router = useRouter()
    const [pageIndex, setPageIndex] = useState(0);
    const [articleCategory, setArticleCategory] = useState([]);
    const categoryChangeHandler = (categoryId) => {

        const currentPath = router.pathname;
        const currentQuery = { ...router.query };
        currentQuery.PageNumber = 1;
        currentQuery.ArticleCategoryId = categoryId;
        //props.onChange(data.selected);
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }



    //let { data: posts, error } = useGetBlogPages(pageIndex === 0 ? initialData : null, pageIndex, articleCategoryId);


    useEffect(() => {
        // const handleRouteChange = (url, { shallow }) => {
        //     setPageIndex(0);
        //     setArticleCategory(null);
        // }
        // router.events.on('routeChangeStart', handleRouteChange)
        // // If the component is unmounted, unsubscribe
        // // from the event with the `off` method:
        // return () => {
        //     router.events.off('routeChangeStart', handleRouteChange)
        // }
        //console.log(props)
    }, []);

    if (!posts) {
        return <div></div>
    }


    return (
        <>
            <Head>
                <title>مقالات آموزشی  </title>
                <meta name="description" content="مقالات آموزشی " />
                <link rel="canonical" href="/article"></link>
            </Head>
            <div class="service-details-page mt-4">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 sidebar-right">
                            {posts && <ArticleSidebar isDetail={false} categoryChangeHandler={categoryChangeHandler} />}
                        </div>
                        <div class="col-xl-8 col-lg-7">
                            <div className="row mb-5">
                                <div className="col-lg-12 col-12 mx-auto">
                                    <div className="section-title-left-part">
                                        <h1 className="entry-title text-capitalize">مقالات آموزشی </h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <BlogList data={posts} error={false} />
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
    model.filtered = [{"column":"articleCategoryId" , "value" :context.query["ArticleCategoryId"]}];


    let resultArtcle = await articleServices.getAll(model);
    return { props: { posts: resultArtcle.data , total :resultArtcle.total} }
}


