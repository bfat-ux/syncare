import PropTypes from 'prop-types';
import AppointmentButton from './AppointmentButton';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const CTASection = ({ serviceType = "" }) => {
  return (
    <section className="w-full px-8 md:px-16 py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-DEFAULT">
              Schedule Your Child's Visit <span className="text-primary-DEFAULT">Today</span>
            </h2>
            
            <p className="text-secondary-DEFAULT/70 text-lg">
              Don't wait to give your child the care they deserve. Our team of pediatric specialists 
              is ready to provide the best medical attention for your little ones.
            </p>
            <div className="flex justify-center pt-4">
              <AppointmentButton 
                variant="secondary"
                className="px-8 py-3 text-lg"
              />
            </div>

            <div className="pt-6 text-sm text-secondary-DEFAULT/60">
              <p>For emergencies, please call our 24/7 hotline: 0814 751 2930</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CTASection.propTypes = {
  serviceType: PropTypes.string
};

export default CTASection;