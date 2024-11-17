import Button from '../../../components/common/Button/Button';
import LoadingImage from '../../../components/common/LoadingImage';
import secondSectionImage from '../../../assets/images/secondsectionlanding.png';

const ServiceOverview = () => {
  return (
    <section className="w-full px-8 md:px-16 py-20 bg-gradient-to-br from-background/25 to-primary/5">
      <div className="max-w-[1440px] mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="flex flex-col gap-2">
              <span className="text-secondary-DEFAULT text-3xl md:text-5xl font-bold font-roboto leading-tight">
                Caring for Your Child's
                <span className="text-primary-DEFAULT block mt-2">
                  Health & Happiness
                </span>
              </span>
            </h2>

            <p className="text-secondary-DEFAULT/80 text-lg font-normal leading-relaxed max-w-xl">
              Our team of expert pediatricians provides specialized care in a warm, 
              child-friendly environment. From routine checkups to specialized treatments, 
              we're here for your family every step of the way.
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              to="/services" 
              variant="primary" 
              className="px-8 py-3 text-lg !text-white"
            >
              Our Services
            </Button>
            <Button 
              to="/about" 
              variant="outline-secondary"
              className="px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <LoadingImage
            src={secondSectionImage}
            alt="Pediatric Care at Kids' Care"
            className="rounded-3xl shadow-xl h-auto md:h-[540px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
