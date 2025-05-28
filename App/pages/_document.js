import NextScriptCustom from 'hack';
import Document, { Html, Head, Main } from 'next/document';


export default class CustomDocument extends Document {
    render = () => {

        return (
            <Html lang="fa">
                <Head>
		    <meta name="samandehi" content="946160032" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
                    {/* <meta name="robots" content="noindex, nofollow"/> */}
                    <meta name="theme-color" content="#2b3fa8" />
                    <meta name="enamad" content="18152236"/>
                    <link rel="stylesheet" href="/css/index.css" />
                    <link rel="stylesheet" href="/css/megaMenu.css" />
                    
                    {/* <script src="https://cdn.jsdelivr.net/npm/js-image-zoom/js-image-zoom.min.js"></script> */}
                    {/* <link rel="stylesheet" href="/css/mmenu.css" /> */}

	
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-264158044-1"></script>
<script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-264158044-1', {
              page_path: window.location.pathname,
            });
          `,
                        }}
                    />

                </Head>

                <body>
                    <Main />
                </body>

                <NextScriptCustom />
            </Html>
        )
    }
}