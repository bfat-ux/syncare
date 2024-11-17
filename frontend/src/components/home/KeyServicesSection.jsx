const KeyServicesSection = () => {
    const services = [
      {
        icon: "stethoscope-icon",
        title: "Regular Checkups",
        description: "Comprehensive health monitoring for growing children"
      },
      {
        icon: "vaccine-icon",
        title: "Vaccinations",
        description: "Complete immunization programs"
      },
      {
        icon: "emergency-icon",
        title: "Emergency Care",
        description: "24/7 pediatric emergency services"
      },
      {
        icon: "development-icon",
        title: "Development Tracking",
        description: "Monitoring growth and milestones"
      }
    ];
  
    return (
      <section className="w-full px-16 py-20 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-primary-DEFAULT">Services</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-primary-DEFAULT mb-4">
                  {/* Icon component would go here */}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default KeyServicesSection;