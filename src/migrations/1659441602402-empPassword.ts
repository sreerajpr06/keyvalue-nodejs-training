import {MigrationInterface, QueryRunner} from "typeorm";

export class empPassword1659441602402 implements MigrationInterface {
    name = 'empPassword1659441602402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
