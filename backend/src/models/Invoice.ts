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

interface PaymentDetails {
    method: 'cash' | 'bank_transfer' | 'mobile_money' | 'credit_card' | 'debit_card';
    installment_plan?: {
        total_installments: number;
        installments_paid: number;
        next_due_date?: Date;
    };
    payment_channel?: string;  // e.g., Paga, Flutterwave
}

interface SubsidyDetails {
    type: 'government' | 'NGO' | 'hospital';
    amount_covered: number;
    conditions?: string[];
}

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    invoice_id!: string;

    @Column('uuid')
    patient_id!: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @Column('uuid', { nullable: true })
    service_id?: string;

    @Column({ type: 'timestamp' })
    date_of_service!: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount_billed!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    amount_paid!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance_due!: number;

    @Column('jsonb', { nullable: true })
    payment_details?: PaymentDetails;

    @Column('jsonb', { nullable: true })
    subsidy_details?: SubsidyDetails[];

    @Column({
        type: 'enum',
        enum: ['pending', 'paid', 'partial', 'overdue', 'waived'],
        default: 'pending'
    })
    payment_status!: string;

    @Column({ nullable: true })
    sponsorship_type?: 'NHIS' | 'donor' | 'self' | 'employer';

    constructor() {
        this.date_of_service = new Date();
        this.amount_billed = 0;
        this.amount_paid = 0;
        this.balance_due = 0;
        this.payment_status = 'pending';
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
