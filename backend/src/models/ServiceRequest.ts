import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn 
} from "typeorm";
import { Patient } from "./Patient";
import { Practitioner } from "./Practitioner";

interface ServiceDetails {
    category: string;  // e.g., lab, imaging, procedure
    code: string;
    description: string;
    priority: 'routine' | 'urgent' | 'emergency';
}

@Entity('service_requests')
export class ServiceRequest {
    @PrimaryGeneratedColumn('uuid')
    service_request_id!: string;

    @Column('uuid')
    patient_id!: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @Column('uuid')
    practitioner_id!: string;

    @ManyToOne(() => Practitioner)
    @JoinColumn({ name: 'practitioner_id' })
    practitioner!: Practitioner;

    @Column('jsonb')
    service_details!: ServiceDetails;

    @Column({
        type: 'enum',
        enum: ['draft', 'active', 'completed', 'cancelled'],
        default: 'draft'
    })
    status!: string;

    @Column({ type: 'timestamp' })
    requested_date!: Date;

    constructor() {
        this.status = 'draft';
        this.requested_date = new Date();
        this.service_details = {
            category: '',
            code: '',
            description: '',
            priority: 'routine'
        };
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
