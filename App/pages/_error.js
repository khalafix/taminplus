import Link from "next/link";

function Error({ statusCode }) {
    return (
        <div className="error-area vh d-flex" data-background="/images/404.webp" data-overlay-light="94" style={{ backgroundImage: 'url(/images/404.webp)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="error-inner text-center">
                            <h1 className="error-title">{statusCode}</h1>
                            <h2 className="error-text mb-5">مشکلی در  سمت سرور رخ داده است .</h2>
                            {/* <p>This page is temporarily unavailable due to maintenance. We will back very soon thanks for your patien</p> */}
                            <Link href="/">
                                <a className="cs-btn-one btn-md btn-primary-color" >بازگشت به صفحه اصلی</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;