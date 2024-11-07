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
