const AppointmentPage = () => {
    return (
      <div className="w-full px-4 md:px-8 py-8">
        <h1 className="text-xl font-bold text-secondary-DEFAULT mb-6">
          Manage Appointments
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          {/* Add appointment management content here */}
          <p className="text-secondary-DEFAULT/70">
            Your upcoming appointments will appear here.
          </p>
        </div>
      </div>
    );
  };
  
  export default AppointmentPage;