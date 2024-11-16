import { Link } from 'react-router-dom';
import logoIcon from '../../assets/icons/logoicon.png';
import { MapPinIcon } from '@heroicons/react/24/outline';
import GoogleMap from '../../components/GoogleMap';

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-white py-12 border-t border-primary">
      <div className="max-w-[1540px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5">
              <img 
                src={logoIcon} 
                alt="Kids' Care Logo" 
                className="w-7 h-[34px] object-contain"
              />
              <span className="text-primary text-xl font-pacifico">k<span className="text-white">i</span>ds'Care</span>
            </Link>
            <p className="text-sm text-gray-300">
              Kids' Care Children's Hospital - Providing comprehensive pediatric care with love and expertise for your little ones.
            </p>
          </div>

          {/* Medical Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Medical Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/newborn-care" className="text-gray-300 hover:text-primary transition-colors">Newborn Care & Immunization</Link></li>
              <li><Link to="/services/general-pediatric" className="text-gray-300 hover:text-primary transition-colors">General Pediatrics</Link></li>
              <li><Link to="/services/specialized-consultations" className="text-gray-300 hover:text-primary transition-colors">Special Consultations</Link></li>
              <li><Link to="/services/laboratory-diagnostics" className="text-gray-300 hover:text-primary transition-colors">Laboratory Services</Link></li>
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">24-hour Emergency Care</li>
              <li className="text-gray-300">Genetic Counseling</li>
              <li className="text-gray-300">School Health</li>
              <li className="text-gray-300">Follow-up Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p>No. 5, Effiong Anwanaodung Street</p>
                  <p>Off Danladi Zakare Street,</p>
                  <p>(Witty Kid's School Road)</p>
                  <p>Off Kara Road, Mararaba</p>
                </div>
              </li>
              <li className="pt-2">Phone: 0812 044 4291</li>
              <li>0814 751 2930</li>
              <li className="pt-2">Email: kidscarehospital2019@gmail.com</li>
            </ul>
          </div>
        </div>

      {/* Google Maps */}
      <div className="mt-8 max-w-4xl mx-auto">
        <GoogleMap />
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Kids' Care Children's Hospital. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
};

export default Footer;
