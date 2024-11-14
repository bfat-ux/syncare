import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePractitionerNameStructure1710864001000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First add the new column as nullable
        await queryRunner.query(`
            ALTER TABLE "practitioners" 
            ADD COLUMN "name" jsonb
        `);

        // Migrate existing data
        await queryRunner.query(`
            UPDATE "practitioners" 
            SET "name" = json_build_array(
                json_build_object(
                    'family', "last_name",
                    'given', ARRAY["first_name"]
                )
            )
            WHERE "first_name" IS NOT NULL OR "last_name" IS NOT NULL
        `);

        // Set default for any null values
        await queryRunner.query(`
            UPDATE "practitioners" 
            SET "name" = '[{"family": "", "given": [""]}]'::jsonb 
            WHERE "name" IS NULL
        `);

        // Make the column NOT NULL
        await queryRunner.query(`
            ALTER TABLE "practitioners" 
            ALTER COLUMN "name" SET NOT NULL
        `);

        // Drop old columns
        await queryRunner.query(`
            ALTER TABLE "practitioners" 
            DROP COLUMN "first_name",
            DROP COLUMN "last_name"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add back the old columns
        await queryRunner.query(`
            ALTER TABLE "practitioners" 
            ADD COLUMN "first_name" character varying,
            ADD COLUMN "last_name" character varying
        `);

        // Migrate data back
        await queryRunner.query(`
            UPDATE "practitioners" 
            SET 
                "first_name" = ("name"->0->>'given')::text[],
                "last_name" = "name"->0->>'family'
        `);

        // Drop the new column
        await queryRunner.query(`
            ALTER TABLE "practitioners" 
            DROP COLUMN "name"
        `);
    }
}
