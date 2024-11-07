import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn 
} from "typeorm";
import { Invoice } from "./Invoice";

interface CostBreakdown {
    item: string;
    base_cost: number;
    discount?: number;
    surcharge?: number;
    tax?: number;
    total_cost: number;
}

@Entity('price_components')
export class PriceComponent {
    @PrimaryGeneratedColumn('uuid')
    price_id!: string;

    @Column('uuid')
    invoice_id!: string;

    @ManyToOne(() => Invoice)
    @JoinColumn({ name: 'invoice_id' })
    invoice!: Invoice;

    @Column('jsonb')
    cost_breakdown!: CostBreakdown[];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount!: number;

    @Column({
        type: 'enum',
        enum: ['naira', 'usd'],
        default: 'naira'
    })
    currency!: string;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
    exchange_rate?: number;

    constructor() {
        this.total_amount = 0;
        this.currency = 'naira';
        this.cost_breakdown = [];
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
