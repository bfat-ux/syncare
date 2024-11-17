import { useForm } from 'react-hook-form';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

const PractitionerRegistrationForm = () => {
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
              type="email"
              label="Email Address"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={errors.email?.message}
              required
            />
            <Input
              type="tel"
              label="Phone Number"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
              required
            />
          </div>
        </div>

        {/* Professional Information - Updated for Nurses */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="select"
              label="Nursing Category"
              {...register('role', { required: 'Category is required' })}
              error={errors.role?.message}
              required
              options={[
                { value: 'registered_nurse', label: 'Registered Nurse (RN)' },
                { value: 'midwife', label: 'Midwife' },
                { value: 'pediatric_nurse', label: 'Pediatric Nurse' },
                { value: 'nurse_practitioner', label: 'Nurse Practitioner' }
              ]}
            />
            <Input
              label="Nursing License Number"
              {...register('licenseNumber', { required: 'License number is required' })}
              error={errors.licenseNumber?.message}
              required
            />
            <Input
              label="Nursing Specialization"
              {...register('specialization')}
              error={errors.specialization?.message}
              placeholder="e.g., Pediatric Nursing, Neonatal Care"
            />
            <Input
              type="date"
              label="License Expiry Date"
              {...register('licenseExpiryDate', { required: 'License expiry date is required' })}
              error={errors.licenseExpiryDate?.message}
              required
            />
            <Input
              type="select"
              label="Years of Experience"
              {...register('experience', { required: 'Experience is required' })}
              error={errors.experience?.message}
              required
              options={[
                { value: '0-2', label: '0-2 years' },
                { value: '3-5', label: '3-5 years' },
                { value: '5-10', label: '5-10 years' },
                { value: '10+', label: '10+ years' }
              ]}
            />
            <Input
              type="select"
              label="Shift Preference"
              {...register('shiftPreference')}
              error={errors.shiftPreference?.message}
              options={[
                { value: 'day', label: 'Day Shift' },
                { value: 'night', label: 'Night Shift' },
                { value: 'rotating', label: 'Rotating Shifts' }
              ]}
            />
          </div>
        </div>

        {/* Account Credentials */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-secondary-DEFAULT">Account Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="password"
              label="Password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              error={errors.password?.message}
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Passwords do not match";
                  }
                }
              })}
              error={errors.confirmPassword?.message}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="px-8 py-3">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PractitionerRegistrationForm;
