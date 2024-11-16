import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full pt-20">
        <div className="max-w-[1540px] mx-auto px-4 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;