import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';
import { Between, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';

export class AppointmentValidationService {
    private repository = AppDataSource.getRepository(Appointment);

    async checkForConflicts(providerId: string, startTime: Date, endTime: Date, excludeAppointmentId?: string): Promise<boolean> {
        const query = {
            where: {
                provider_id: providerId,
                appointment_status: 'scheduled',
                start_time: LessThanOrEqual(endTime),
                end_time: MoreThanOrEqual(startTime)
            }
        };

        if (excludeAppointmentId) {
            Object.assign(query.where, { appointment_id: Not(excludeAppointmentId) });
        }

        const conflictingAppointments = await this.repository.count(query);
        return conflictingAppointments > 0;
    }

    validateAppointmentTimes(startTime: Date, endTime: Date): string[] {
        const errors: string[] = [];
        const now = new Date();

        if (new Date(startTime) < now) {
            errors.push("Appointment cannot be scheduled in the past");
        }

        if (new Date(endTime) <= new Date(startTime)) {
            errors.push("End time must be after start time");
        }

        return errors;
    }
}
