import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsActiveToPractitioner1710864000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'practitioners',
            new TableColumn({
                name: 'isActive',
                type: 'boolean',
                default: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('practitioners', 'isActive');
    }
}