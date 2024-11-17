import Button from '../../../components/common/Button/Button';
import LoadingImage from '../../../components/common/LoadingImage';
import secondSectionImage from '../../../assets/images/secondsectionlanding.png';

const ServiceOverview = () => {
  return (
    <section className="w-full px-16 py-28 bg-background/25">
      <div className="max-w-[1440px] mx-auto flex flex-row items-center gap-20">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="flex flex-col gap-2">
              <span className="text-secondary-DEFAULT text-5xl font-bold font-roboto leading-[57.60px]">
                Expert{' '}
                <span className="text-primary-DEFAULT">
                  Pediatric Care
                </span>
              </span>
            </h2>

            <p className="text-secondary-DEFAULT text-lg font-normal font-roboto leading-[27px]">
              Specialized care for your child's health and happiness, delivered by our expert pediatric team.
            </p>
          </div>

          <Button 
            to="/about" 
            variant="outline" 
            className="px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>

        <div className="flex-1">
          <LoadingImage
            src={secondSectionImage}
            alt="Pediatric Services"
            className="rounded-l-3xl shadow-2xl h-[640px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
