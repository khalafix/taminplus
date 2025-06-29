import NextScriptCustom from "hack";
import Document, { Html, Head, Main } from "next/document";

export default class CustomDocument extends Document {
  render = () => {
    return (
      <Html lang="fa">
        <Head>
          <meta name="samandehi" content="946160032" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
          <meta name="theme-color" content="#2b3fa8" />
          <meta name="enamad" content="18152236" />
          <link rel="stylesheet" href="/css/index.css" />
          <link rel="stylesheet" href="/css/megaMenu.css" />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-264158044-1"
          ></script>
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

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PT549B88');
              `,
            }}
          />
        </Head>

        <body>
          {/* GTM noscript fallback */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PT549B88"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          <Main />
          <NextScriptCustom />
        </body>
      </Html>
    );
  };
}
