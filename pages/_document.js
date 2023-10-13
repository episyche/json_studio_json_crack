import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Link from 'next/link'

export default function Document() {
    return (
        <Html lang="en">
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-7N4VDR96VP"></script>
            <Script id="googleAnalytics-script" strategy="lazyOnload">
                {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
                {/* gtag('config', 'G-7N4VDR96VP');`} */}
            </Script>

            {/* For Share purpose */}
            <Script async defer src="https://teams.microsoft.com/share/launcher.js"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/sharer.js@latest/sharer.min.js"></Script>
            <Script src="http://cdn.jsdelivr.net/npm/share-buttons/dist/share-buttons.js"></Script>

            {/* For SEO */}
            <Head>
                <Link rel="alternate" hrefLang="en" href="https://teams.microsoft.com/share/launcher.js"></Link>
                <Link rel="alternate" hrefLang="en" href="http://cdn.jsdelivr.net/npm/share-buttons/dist/share-buttons.js"></Link>
                <Link rel="alternate" hrefLang="en" href="https://cdn.jsdelivr.net/npm/sharer.js@latest/sharer.min.js"></Link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}