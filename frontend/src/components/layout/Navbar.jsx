import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Button from '../common/Button/Button';
import logoIcon from '../../assets/icons/logoicon.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full h-[70px] px-4 md:px-8 py-3 bg-secondary border-b border-primary z-50 shadow-md">
      <div className="max-w-[1540px] mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
          <div className="flex items-center gap-1.5">
            <img 
              src={logoIcon} 
              alt="Kids' Care Logo" 
              className="w-7 h-[34px] object-contain"
            />
            <span className="text-primary text-xl md:text-2xl font-pacifico leading-8">k<span className="text-white">i</span>ds'Care</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              Home Page
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              Our Services
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>
          <Button>Appointment</Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-secondary border-b border-primary flex-col items-center gap-4 py-4`}>
          <nav className="flex flex-col items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home Page
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Our Services
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-white hover:text-primary text-base font-normal transition-colors duration-300 ${
                  isActive ? 'text-primary' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </nav>
          <Button className="w-[200px]" onClick={() => setIsMenuOpen(false)}>
            Appointment
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
