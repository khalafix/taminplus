export default function BlogLoading(){
    return (
        <>
            <Head>
                <title>مقالات آموزشی تامین پلاس</title>
                <meta name="description" content="مقالات آموزشی تامین پلاس" />
                <link rel="canonical" href="/article"></link>
            </Head>
            <div class="service-details-page pdt-120 pdb-90">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 sidebar-right">
                            {initialData && <ArticleSidebar isDetail={false} categoryChangeHandler={categoryChangeHandler} />}
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
                                
                                
                            </div>
                            <div class="row">
                                <div class="col-xl-12">
                                    <nav class="pagination-nav pdt-30">
                                        {posts && <Pagination page={pageIndex} onChange={setPageIndex} pageCount={articleCategoryId ? posts.totalCount / 12 : pageCount} />}
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