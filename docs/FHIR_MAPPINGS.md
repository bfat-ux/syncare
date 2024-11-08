# FHIR Resource Mappings

This document outlines the core FHIR resources and their database mappings for the SynCare platform, adapted for the Nigerian healthcare context.

## Core Resources

### Patient Resource
- **Table**: `patients`
- **Fields**:
  - `patient_id` (UUID, Primary Key)
  - `first_name` (String)
  - `last_name` (String)
  - `date_of_birth` (Date)
  - `gender` (Enum: male, female, other, unknown)
  - `contact_info` (JSONB)
    ```json
    {
      "phone": string,
      "email": string,
      "address": {
        "line": string[],
        "city": string,
        "state": string,
        "postal_code": string,
        "country": string
      }
    }
    ```
  - `medical_history` (JSONB)
  - `immunization_records` (JSONB)

## PractitionerRole Resource
- **Table**: `practitioner_roles`
- **FHIR Resource**: PractitionerRole
- **Fields**:
  ```typescript
  {
    role_id: string;                      // PractitionerRole.identifier
    practitioner_id: string;              // PractitionerRole.practitioner
    role: string;                         // PractitionerRole.code
    specialties?: string[];               // PractitionerRole.specialty
    locations?: string[];                 // PractitionerRole.location
  }
  ```

### Local Context Adaptations
1. **Role Expansion**:
   - Added support for `chew` (Community Health Extension Worker)
   - Includes `nurse`, `doctor`, and other local roles

2. **Specialties and Locations**:
   - Supports multiple specialties per practitioner
   - Tracks locations where practitioners can work

## ServiceRequest Resource
- **Table**: `service_requests`
- **FHIR Resource**: ServiceRequest
- **Fields**:
  ```typescript
  {
    service_request_id: string;           // ServiceRequest.identifier
    patient_id: string;                   // ServiceRequest.subject
    practitioner_id: string;              // ServiceRequest.requester
    service_details: {                    // ServiceRequest.code
      category: string;
      code: string;
      description: string;
      priority: string;                   // ServiceRequest.priority
    };
    status: string;                       // ServiceRequest.status
    requested_date: Date;                 // ServiceRequest.authoredOn
  }
  ```

### Local Context Adaptations
1. **Flexible Practitioner Assignment**:
   - Links to any practitioner type, including CHEWs and nurses
   - Supports diverse healthcare service requests

2. **Service Details**:
   - Captures detailed service information
   - Manages priority and status for various services

### Implementation Notes
- **Role and Service Flexibility**: Supports a wide range of healthcare roles and services, accommodating local healthcare structures.
- **Integration with Local Systems**: Designed to integrate with local healthcare practices and roles, ensuring relevance and usability.


### Encounter Resource
- **Table**: `encounters`
- **Fields**:
  - `encounter_id` (UUID, Primary Key)
  - `patient_id` (UUID, Foreign Key)
  - `date_of_visit` (Timestamp)
  - `provider_id` (UUID, Foreign Key)
  - `reason_for_visit` (Text)
  - `diagnosis` (JSONB)
  - `treatment_plan` (JSONB)
  - `prescription` (JSONB)
  - `laboratory_tests` (JSONB)
  - `imaging_studies` (JSONB)

### Appointment Resource
- **Table**: `appointments`
- **Fields**:
  - `appointment_id` (UUID, Primary Key)
  - `patient_id` (UUID, Foreign Key)
  - `provider_id` (UUID, Foreign Key)
  - `appointment_date` (Date)
  - `appointment_time` (Time)
  - `appointment_type` (String)
  - `appointment_status` (Enum: proposed, pending, booked, arrived, fulfilled, cancelled)

### Schedule Resource
- **Table**: `schedules`
- **Fields**:
  - `schedule_id` (UUID, Primary Key)
  - `provider_id` (UUID, Foreign Key)
  - `available_slots` (JSONB)

### Practitioner Resource
- **Table**: `practitioners`
- **Fields**:
  - `practitioner_id` (UUID, Primary Key)
  - `first_name` (String)
  - `last_name` (String)
  - `specialty` (String)
  - `contact_info` (JSONB)
  - `credentials` (JSONB)
  - `user_role` (String)
  - `user_password` (String, Hashed)

### PractitionerRole Resource
- **Table**: `practitioner_roles`
- **Fields**:
  - `practitioner_role_id` (UUID, Primary Key)
  - `practitioner_id` (UUID, Foreign Key)
  - `role_code` (String)
  - `specialty_code` (String)

### ServiceRequest Resource
- **Table**: `service_requests`
- **Fields**:
  - `service_id` (UUID, Primary Key)
  - `service_name` (String)
  - `service_description` (Text)
  - `service_category` (String)

## Referral System

### Referral (Maps to ServiceRequest + Task)
- **Table**: `referrals`
- **FHIR Resources**: 
  - Primary: ServiceRequest
  - Secondary: Task (for workflow management)
- **Fields**:
  ```typescript
  {
    referral_id: string;                    // ServiceRequest.identifier
    patient_id?: string;                    // ServiceRequest.subject
    patient_details: {                      // For cases without existing patient record
        first_name: string;
        last_name: string;
        date_of_birth?: Date;
        gender?: string;
        phone?: string;
    };
    referring_provider: {                   // ServiceRequest.requester
        name: string;
        role: string;                       // Extended for Nigerian context
        facility_name: string;
        facility_type: string;              // Including patent-medicine-store
        contact_info: ContactInfo;
        license_number?: string;
    };
    clinical_information: {                 // ServiceRequest.reasonReference
        chief_complaint: string;
        presenting_problems: string[];
        vital_signs?: object;
        current_medications?: string[];
        allergies?: string[];
        provisional_diagnosis?: string;
    };
    status: string;                         // ServiceRequest.status
    referral_date: Date;                    // ServiceRequest.authoredOn
    preferred_appointment_date?: Date;       // ServiceRequest.occurrence
  }
  ```

### DocumentReference
- **Table**: `document_references`
- **FHIR Resource**: DocumentReference
- **Fields**:
  ```typescript
  {
    document_id: string;                    // DocumentReference.identifier
    referral_id: string;                    // DocumentReference.context.reference
    metadata: {                             // DocumentReference.content
        title: string;
        description?: string;
        document_type: string;              // DocumentReference.type
        mime_type: string;                  // DocumentReference.content.attachment.contentType
        language?: string;                  // DocumentReference.content.attachment.language
        size_bytes?: number;                // DocumentReference.content.attachment.size
        hash?: string;                      // DocumentReference.content.attachment.hash
    };
    storage_path: string;                   // Internal reference to stored file
    status: string;                         // DocumentReference.status
    document_date: Date;                    // DocumentReference.date
    period_start?: Date;                    // DocumentReference.context.period.start
    period_end?: Date;                      // DocumentReference.context.period.end
  }
  ```

### Core Fields
- `patient_id` (uuid) → Patient.id
- `first_name` → Patient.name.given
- `last_name` → Patient.name.family
- `date_of_birth` → Patient.birthDate
- `gender` → Patient.gender

### Extensions
- `contact_info` → Patient.contact
  - Includes Nigeria-specific address format with LGA
- `medical_history` → Patient.condition
- `immunization_records` → Patient.immunization

## Appointment Resource
Maps to FHIR Appointment resource:

### Core Fields
- `appointment_id` → Appointment.id
- `appointment_date` → Appointment.start
- `start_time` → Appointment.start
- `end_time` → Appointment.end
- `appointment_status` → Appointment.status
- `appointment_type` → Appointment.appointmentType

## Encounter Resource
Maps to FHIR Encounter resource:

### Core Fields
- `encounter_id` → Encounter.id
- `date_of_visit` → Encounter.period.start
- `reason_for_visit` → Encounter.reasonCode
- `diagnosis` → Encounter.diagnosis
- `treatment_plan` → CarePlan resource reference

## Local Context Adaptations

### Referral System Adaptations
1. **Provider Types**:
   - Added support for patent medicine vendors
   - Included community health workers
   - Accommodates informal referral sources

2. **Facility Types**:
   - Patent medicine stores
   - Community health centers
   - Traditional primary care settings

3. **Document Management**:
   - Support for scanned paper documents
   - Mobile phone photo uploads
   - Offline document storage capability

### Implementation Notes
1. **Workflow Considerations**:
   - Supports both formal and informal referrals
   - Handles varying levels of data completeness
   - Accommodates different provider capabilities

2. **Technical Adaptations**:
   - File storage optimized for limited bandwidth
   - Support for mobile device uploads
   - Offline-first document handling

### PriceComponent Resource
- **Table**: `price_components`
- **Fields**:
  - `price_id` (UUID, Primary Key)
  - `service_id` (UUID, Foreign Key)
  - `price_amount` (Decimal)
  - `price_effective_date` (Date)

### Coverage Resource
- **Table**: `coverages`
- **Fields**:
  - `coverage_id` (UUID, Primary Key)
  - `patient_id` (UUID, Foreign Key)
  - `insurance_provider` (String)
  - `insurance_plan` (String)
  - `coverage_details` (JSONB)

### Invoice Resource
- **Table**: `invoices`
- **Fields**:
  - `invoice_id` (UUID, Primary Key)
  - `patient_id` (UUID, Foreign Key)
  - `service_id` (UUID, Foreign Key)
  - `date_of_service` (Date)
  - `amount_billed` (Decimal)
  - `amount_paid` (Decimal)
  - `balance_due` (Decimal)

## Local Context Adaptations

### Address Structure
The standard FHIR address datatype has been modified to better suit the Nigerian context:

## Notes
- All tables include standard audit fields:
  - `created_at` (Timestamp)
  - `updated_at` (Timestamp)
  - `created_by` (UUID, optional)
  - `updated_by` (UUID, optional)
- JSONB fields are used for complex nested structures to maintain FHIR compliance
- All relationships are maintained through UUID foreign keys
- Enums are used where applicable to ensure data consistency
