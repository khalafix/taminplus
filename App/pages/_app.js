
import PageLayout from 'components/PageLayout';
import { Provider } from 'react-redux';
import { useStore } from 'redux/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {

  const store = useStore();
  return (

    <Provider store={store}>
      <PageLayout toast={toast} >
        <Component   {...pageProps} toast={toast} />
  
      </PageLayout>
            <ToastContainer
                toastClassName="toast"
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                tos
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </Provider>
  )
}



export default MyApp;






