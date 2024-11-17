import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

const PatientRegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // TODO: API integration
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message}
              required
            />
            <Input
              label="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message}
              required
            />
            <Input
              type="date"
              label="Date of Birth"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              error={errors.dateOfBirth?.message}
              required
            />
            <Input
              type="select"
              label="Gender"
              {...register('gender', { required: 'Gender is required' })}
              error={errors.gender?.message}
              required
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
              ]}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="email"
              label="Email Address"
              {...register('email', { 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={errors.email?.message}
            />
            <Input
              type="tel"
              label="Phone Number"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
              required
            />
          </div>
          <div className="space-y-4">
            <Input
              label="Street Address"
              {...register('address.street', { required: 'Street address is required' })}
              error={errors.address?.street?.message}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="State"
                {...register('address.state', { required: 'State is required' })}
                error={errors.address?.state?.message}
                required
              />
              <Input
                label="LGA"
                {...register('address.lga')}
                error={errors.address?.lga?.message}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              {...register('emergencyContact.name', { required: 'Emergency contact name is required' })}
              error={errors.emergencyContact?.name?.message}
              required
            />
            <Input
              label="Relationship"
              {...register('emergencyContact.relationship', { required: 'Relationship is required' })}
              error={errors.emergencyContact?.relationship?.message}
              required
            />
            <Input
              type="tel"
              label="Contact Phone"
              {...register('emergencyContact.phone', { required: 'Emergency contact phone is required' })}
              error={errors.emergencyContact?.phone?.message}
              required
            />
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Medical History</h3>
          <div className="space-y-4">
            <Input
              type="textarea"
              label="Known Allergies"
              {...register('medicalHistory.allergies')}
              error={errors.medicalHistory?.allergies?.message}
              placeholder="List any known allergies..."
            />
            <Input
              type="textarea"
              label="Current Medications"
              {...register('medicalHistory.medications')}
              error={errors.medicalHistory?.medications?.message}
              placeholder="List current medications..."
            />
            <Input
              type="textarea"
              label="Past Medical Conditions"
              {...register('medicalHistory.conditions')}
              error={errors.medicalHistory?.conditions?.message}
              placeholder="List any past medical conditions..."
            />
          </div>
        </div>

        {/* Insurance Information - Now Optional */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">
            Insurance Information <span className="text-sm font-normal text-gray-500">(Optional)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Insurance Provider"
              {...register('insurance.provider')}
              error={errors.insurance?.provider?.message}
              placeholder="Enter insurance provider if any"
            />
            <Input
              label="Policy Number"
              {...register('insurance.policyNumber')}
              error={errors.insurance?.policyNumber?.message}
              placeholder="Enter policy number if any"
            />
            <Input
              label="Group Number"
              {...register('insurance.groupNumber')}
              error={errors.insurance?.groupNumber?.message}
              placeholder="Enter group number if any"
            />
            <Input
              label="Primary Subscriber Name"
              {...register('insurance.subscriberName')}
              error={errors.insurance?.subscriberName?.message}
              placeholder="Enter subscriber name if any"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="px-8 py-3">
            Register Patient
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PatientRegistrationForm;