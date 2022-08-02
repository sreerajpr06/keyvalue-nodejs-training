import {MigrationInterface, QueryRunner} from "typeorm";

export class empExp1659421657689 implements MigrationInterface {
    name = 'empExp1659421657689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    }

}
