import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify css

export const metadata = {
  title: 'Prime Properties',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property'
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{ children }</main>
          <ToastContainer /> {/* Doesn't matter where we put it, it's positioned absolute */}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout