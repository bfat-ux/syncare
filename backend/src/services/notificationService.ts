import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export class NotificationService {
    private appointmentRepo = AppDataSource.getRepository(Appointment);
    private patientRepo = AppDataSource.getRepository(Patient);

    async sendAppointmentReminder(appointment: Appointment): Promise<void> {
        const patient = await this.patientRepo.findOneBy({ patient_id: appointment.patient_id });
        if (!patient?.contact_info?.email) return;

        // For now, just console.log the notification
        // In production, you'd integrate with email/SMS service
        console.log(`
            REMINDER: Upcoming Appointment
            To: ${patient.contact_info.email}
            Subject: Appointment Reminder
            Message: You have an appointment scheduled for ${appointment.appointment_date} 
            at ${appointment.start_time}
            Location: ${appointment.details?.location || 'Main Clinic'}
        `);
    }

    async processUpcomingAppointments(): Promise<void> {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const upcomingAppointments = await this.appointmentRepo.find({
            where: {
                appointment_date: tomorrow,
                appointment_status: 'scheduled'
            }
        });

        for (const appointment of upcomingAppointments) {
            await this.sendAppointmentReminder(appointment);
        }
    }

    async sendStatusUpdateNotification(appointment: Appointment, status: string): Promise<void> {
        const patient = await this.patientRepo.findOneBy({ patient_id: appointment.patient_id });
        if (!patient?.contact_info?.email) return;

        console.log(`
            STATUS UPDATE: Appointment ${status}
            To: ${patient.contact_info.email}
            Subject: Appointment Status Update
            Message: Your appointment status has been updated to ${status}
        `);
    }
}