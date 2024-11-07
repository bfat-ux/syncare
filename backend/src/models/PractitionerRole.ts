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

@Entity('practitioner_roles')
export class PractitionerRole {
    @PrimaryGeneratedColumn('uuid')
    role_id!: string;

    @Column('uuid')
    practitioner_id!: string;

    @ManyToOne(() => Practitioner)
    @JoinColumn({ name: 'practitioner_id' })
    practitioner!: Practitioner;

    @Column({
        type: 'enum',
        enum: ['doctor', 'nurse', 'therapist', 'specialist', 'admin', 'chew'],
        nullable: false
    })
    role!: string;

    @Column('jsonb', { nullable: true })
    specialties?: string[];

    @Column('jsonb', { nullable: true })
    locations?: string[];

    constructor() {
        this.role = 'doctor';
        this.specialties = [];
        this.locations = [];
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
