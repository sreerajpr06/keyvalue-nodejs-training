import {MigrationInterface, QueryRunner} from "typeorm";

export class empRole1659448111292 implements MigrationInterface {
    name = 'empRole1659448111292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
