import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Prime Properties',
  keywords: 'rental, property, real estate'
}

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{ children }</main>
      </body>
    </html>
  );
};

export default MainLayout