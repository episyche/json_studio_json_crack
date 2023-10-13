import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import '../styles/globals.css'
import GlobalContext from "../contextapi/context";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <Head>

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="JSON Studio is a free online tool to validate, minify, and format/beautify JSON Data. The view feature helps to visualize JSON data in Tree, Grid, and DB Schema Mode.  It also supports converting JSON to XML, YML, CSV, and vice versa. "
      />
      <meta name='keywords' content="json Studio, JSON format, JSON converter , json to xml , json to yaml , json to xl , xml to json , yaml to json, json tree view ,json db schema, json grid view" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="All in one online JSON tool to format, view ,and convert the JSON Data."
      />
      <meta property="og:site_name" content="JSON Studio" />
      <meta property="og:url" content="http://jsonstudio.io" />
      <meta
        property="og:description"
        content="JSON Studio is a free online tool to validate, minify, and format/beautify JSON Data. The view feature helps to visualize JSON data in Tree, Grid, and DB Schema Mode.  It also supports converting JSON to XML, YML, CSV, and vice versa. "
      />
      <meta property="og:image" content="/ogIMG.png" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content="All in one online JSON tool to format, view ,and convert the JSON Data."
      />
      <meta
        name="twitter:description"
        content="JSON Studio is a free online tool to validate, minify, and format/beautify JSON Data. The view feature helps to visualize JSON data in Tree, Grid, and DB Schema Mode.  It also supports converting JSON to XML, YML, CSV, and vice versa. "
      />
      <meta
        name="twitter:image"
        content="/ogIMG.png"
      />
    </Head>
    <SessionProvider session={session}>
      <GlobalContext>
        <Component {...pageProps} />
      </GlobalContext>
    </SessionProvider>
  </>
}
