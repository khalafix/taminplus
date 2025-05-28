import Link from "next/link";

export default function Custom404() {
    return (
        <div className="error-area vh d-flex" data-background="/images/404.png" data-overlay-light="94" style={{ backgroundImage: 'url(/images/404.png)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="error-inner text-center">
                            <h1 className="error-title">404</h1>
                            <h2 className="error-text mb-5">صفحه مورد نظر شما یافت نشد .</h2>
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