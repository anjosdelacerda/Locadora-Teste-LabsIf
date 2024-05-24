import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1716578659175 implements MigrationInterface {
    name = 'InitialMigration1716578659175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rents" ("id" uuid NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "renterId" uuid, "carId" uuid, CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL, "model" character varying(256) NOT NULL, "brand" character varying(256) NOT NULL, "description" character varying(512) NOT NULL, "price" bigint NOT NULL, "category" character varying(256) NOT NULL, "ownerById" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "gender" character varying(1) NOT NULL, "cellphone" character varying(11) NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL, "password" character varying(256) NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_b7e5b91b97b5253fa7b05332257" FOREIGN KEY ("renterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_2527e8f093303c2d9630a1c6e84" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_7588b46b307b6401b439196255a" FOREIGN KEY ("ownerById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_7588b46b307b6401b439196255a"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_2527e8f093303c2d9630a1c6e84"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_b7e5b91b97b5253fa7b05332257"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "rents"`);
    }

}
