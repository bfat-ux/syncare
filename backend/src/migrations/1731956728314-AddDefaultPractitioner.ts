import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultPractitioner1731956728314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO practitioners (
                practitioner_id,
                name,
                user_role,
                specialty,
                contact_info,
                credentials,
                qualifications,
                status,
                availability,
                license_number,
                user_password
            ) VALUES (
                'default-practitioner-id',
                '[{"family": "Practitioner", "given": ["General"]}]',
                'doctor',
                'pediatrics',
                '{"email": "doctor@kidscare.com", "phone": "1234567890"}',
                '[{"degree": "MD"}]',
                '[{"certifications": ["Board Certified Pediatrician"]}]',
                'active',
                '{"days": [], "hours": [], "exceptions": []}',
                'MD12345',
                'defaultpass123'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM practitioners 
            WHERE practitioner_id = 'default-practitioner-id';
        `);
    }

}
