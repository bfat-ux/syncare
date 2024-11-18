# API Endpoints Documentation

## Base URL
`http://localhost:3000/api`

## Authentication
_Authentication documentation pending implementation_

## Available Endpoints

### Patient Management
- `GET /patients` - Get all patients
- `POST /patients` - Create new patient
- `GET /patients/:id` - Get patient by ID
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Deactivate patient

### Appointments
- `GET /appointments` - List all appointments
- `POST /appointments` - Create appointment
- `GET /appointments/:id` - Get appointment details
- `PUT /appointments/:id` - Update appointment
- `PUT /appointments/:id/status` - Update appointment status
- `DELETE /appointments/:id` - Cancel appointment

### Document References
- `POST /document-references` - Create document reference
- `GET /document-references` - List all documents
- `GET /document-references/:id` - Get document details
- `PUT /document-references/:id` - Update document
- `DELETE /document-references/:id` - Delete document

### Practitioners
- `GET /practitioners` - List all practitioners
- `POST /practitioners` - Register practitioner
- `GET /practitioners/:id` - Get practitioner details
- `PUT /practitioners/:id` - Update practitioner
- `DELETE /practitioners/:id` - Deactivate practitioner

### Invoicing
- `POST /invoices` - Create invoice
- `GET /invoices` - List all invoices
- `GET /invoices/:id` - Get invoice details
- `PUT /invoices/:id` - Update invoice
- `PUT /invoices/:id/status` - Update payment status

## Response Formats
All endpoints return data in JSON format with the following structure:

### Success Response
```json
{
  "status": "success",
  "data": { ... }
}
```

### Error Response
```json
{
  "status": "error",
  "error": "Error message",
  "details": "Additional error details"
}
```