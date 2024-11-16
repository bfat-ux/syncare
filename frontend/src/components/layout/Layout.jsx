import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Navbar />
      <main className="flex-grow mt-[70px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;