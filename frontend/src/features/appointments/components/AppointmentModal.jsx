import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AppointmentModal = ({ isOpen, onClose, serviceType = "" }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-secondary-DEFAULT">
              Schedule an Appointment
              {serviceType && (
                <span className="block text-sm text-secondary-DEFAULT/70 mt-1">
                  Service: {serviceType}
                </span>
              )}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-secondary-DEFAULT/70 hover:text-secondary-DEFAULT"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Placeholder for the appointment form */}
            <p>Appointment form will go here</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppointmentModal;