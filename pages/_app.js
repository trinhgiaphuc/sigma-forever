import Navbar from '@components/Navbar';
import UserProvider from '@libs/userContext/userContext';
import '@styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
