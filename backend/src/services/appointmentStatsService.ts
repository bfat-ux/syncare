import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';
import { Between, In } from 'typeorm';

export class AppointmentStatsService {
    private repository = AppDataSource.getRepository(Appointment);

    async getDailyStats(date: Date): Promise<any> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await this.repository.find({
            where: {
                appointment_date: Between(startOfDay, endOfDay)
            }
        });

        return {
            total: appointments.length,
            by_status: this.groupByStatus(appointments),
            by_type: this.groupByType(appointments)
        };
    }

    async getMonthlyStats(year: number, month: number): Promise<any> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const appointments = await this.repository.find({
            where: {
                appointment_date: Between(startDate, endDate)
            }
        });

        return {
            total: appointments.length,
            by_status: this.groupByStatus(appointments),
            by_type: this.groupByType(appointments),
            daily_distribution: this.groupByDay(appointments)
        };
    }

    async getProviderStats(providerId: string, startDate: Date, endDate: Date): Promise<any> {
        const appointments = await this.repository.find({
            where: {
                provider_id: providerId,
                appointment_date: Between(startDate, endDate)
            }
        });

        return {
            total_appointments: appointments.length,
            completion_rate: this.calculateCompletionRate(appointments),
            no_show_rate: this.calculateNoShowRate(appointments),
            average_duration: this.calculateAverageDuration(appointments)
        };
    }

    private groupByStatus(appointments: Appointment[]): any {
        return appointments.reduce((acc: any, curr) => {
            acc[curr.appointment_status] = (acc[curr.appointment_status] || 0) + 1;
            return acc;
        }, {});
    }

    private groupByType(appointments: Appointment[]): any {
        return appointments.reduce((acc: any, curr) => {
            acc[curr.appointment_type] = (acc[curr.appointment_type] || 0) + 1;
            return acc;
        }, {});
    }

    private groupByDay(appointments: Appointment[]): any {
        return appointments.reduce((acc: any, curr) => {
            const day = curr.appointment_date.getDate();
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});
    }

    private calculateCompletionRate(appointments: Appointment[]): number {
        const completed = appointments.filter(a => a.appointment_status === 'fulfilled').length;
        return appointments.length ? (completed / appointments.length) * 100 : 0;
    }

    private calculateNoShowRate(appointments: Appointment[]): number {
        const noShows = appointments.filter(a => a.appointment_status === 'no-show').length;
        return appointments.length ? (noShows / appointments.length) * 100 : 0;
    }

    private calculateAverageDuration(appointments: Appointment[]): number {
        const durations = appointments.map(a => {
            return (new Date(a.end_time).getTime() - new Date(a.start_time).getTime()) / (1000 * 60);
        });
        return durations.length ? 
            durations.reduce((a, b) => a + b, 0) / durations.length : 
            0;
    }
}
