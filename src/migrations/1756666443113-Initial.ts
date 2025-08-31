import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1756666443113 implements MigrationInterface {
    name = 'Initial1756666443113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rent_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "value" integer NOT NULL, "rent_id" uuid, CONSTRAINT "PK_246b1dea737a83c3435eff7c987" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rent_item" ADD CONSTRAINT "FK_f458c6a15c8c26a675ffb87fdbf" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent_item" DROP CONSTRAINT "FK_f458c6a15c8c26a675ffb87fdbf"`);
        await queryRunner.query(`DROP TABLE "rents"`);
        await queryRunner.query(`DROP TABLE "rent_item"`);
    }

}
