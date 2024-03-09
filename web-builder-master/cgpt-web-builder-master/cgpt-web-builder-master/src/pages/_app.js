import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import '../styles/globals.css'; // Your global styles
export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AppProvider>
  );
}
