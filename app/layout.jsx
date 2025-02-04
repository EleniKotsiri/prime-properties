import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify css
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Prime Properties',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property'
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html className="h-full">
          <body className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{ children }</main>
            <ToastContainer /> {/* Doesn't matter where we put it, it's positioned absolute */}
            <Footer />
            <Analytics />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout