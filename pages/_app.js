import '@/styles/index.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { store, persistor } from "@/store";
import Script from "next/script";
import { PersistGate } from "redux-persist/integration/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3G5SHJ8E7S"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3G5SHJ8E7S', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
      }
export default MyApp;





