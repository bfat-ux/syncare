import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn 
} from "typeorm";
import type { Referral } from "./Referral";

interface DocumentMetadata {
    title: string;
    description?: string;
    document_type: 'lab_result' | 'imaging' | 'prescription' | 'clinical_note' | 'other';
    mime_type: string;
    language?: string;
    size_bytes?: number;
    hash?: string;  // For integrity checking
}

@Entity('document_references')
export class DocumentReference {
    @PrimaryGeneratedColumn('uuid')
    document_id!: string;

    @Column('uuid')
    referral_id!: string;

    @ManyToOne('Referral', 'documents')
    @JoinColumn({ name: 'referral_id' })
    referral!: Referral;

    @Column('jsonb')
    metadata!: DocumentMetadata;

    @Column()
    storage_path!: string;  // Path to file in storage system

    @Column({
        type: 'enum',
        enum: ['current', 'superseded', 'entered-in-error'],
        default: 'current'
    })
    status!: string;

    @Column({ type: 'timestamp' })
    document_date!: Date;

    @Column({ nullable: true })
    period_start?: Date;  // For documents valid for a period

    @Column({ nullable: true })
    period_end?: Date;

    @Column({ nullable: true })
    security_context?: string;  // For access control

    constructor() {
        this.document_date = new Date();
        this.status = 'current';
        this.metadata = {
            title: '',
            document_type: 'other',
            mime_type: ''
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
