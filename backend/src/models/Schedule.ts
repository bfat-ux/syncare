import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Practitioner } from "./Practitioner";

// Define interfaces for complex types
interface TimeSlot {
    start_time: string;      // Format: "HH:mm"
    end_time: string;        // Format: "HH:mm"
    is_available: boolean;
    slot_type?: string;      // regular, emergency, walk-in
}

interface DaySchedule {
    day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    is_working_day: boolean;
    time_slots: TimeSlot[];
}

interface ScheduleException {
    date: Date;
    reason: string;
    is_working_day: boolean;
    time_slots?: TimeSlot[];
}

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    schedule_id!: string;

    @Column('uuid')
    provider_id!: string;

    @ManyToOne(() => Practitioner)
    @JoinColumn({ name: 'provider_id' })
    practitioner!: Practitioner;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive', 'temporary'],
        default: 'active'
    })
    status!: string;

    @Column('jsonb', { nullable: true })
    regular_schedule!: DaySchedule[];

    @Column('jsonb', { nullable: true })
    exceptions!: ScheduleException[];

    @Column({ type: 'int', default: 30 })
    default_slot_duration!: number;  // in minutes

    @Column({ type: 'int', default: 0 })
    break_between_slots!: number;    // in minutes

    @Column('jsonb', { nullable: true })
    service_types!: {
        code: string;
        name: string;
        duration: number;    // in minutes
    }[];

    constructor() {
        // Initialize status
        this.status = 'active';
        this.default_slot_duration = 30;
        this.break_between_slots = 0;

        // Initialize regular schedule with empty arrays for each day
        this.regular_schedule = [
            'monday', 'tuesday', 'wednesday', 'thursday', 
            'friday', 'saturday', 'sunday'
        ].map(day => ({
            day_of_week: day as DaySchedule['day_of_week'],
            is_working_day: day !== 'sunday',  // Default Sunday as non-working
            time_slots: []
        }));

        // Initialize other arrays
        this.exceptions = [];
        this.service_types = [];
    }

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column('uuid', { nullable: true })
    created_by?: string;

    @Column('uuid', { nullable: true })
    updated_by?: string;
}
