import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1696479840371 implements MigrationInterface {
    name = 'CreateEntities1696479840371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(20) NOT NULL, "street" character varying(45) NOT NULL, "number" character varying(7) NOT NULL, "complement" character varying(25), "userId" uuid, CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying(280) NOT NULL, "announcementId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(15) NOT NULL, "model" character varying(20) NOT NULL, "year" character varying NOT NULL, "fuel" character varying(15) NOT NULL, "km" integer NOT NULL, "color" character varying(15) NOT NULL, "table_price" numeric(9,2) NOT NULL DEFAULT '0', "price" numeric(9,2) NOT NULL DEFAULT '0', "description" text, "announcement_is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_type_enum" AS ENUM('buyer', 'seller')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(45) NOT NULL, "cpf" character varying(11) NOT NULL, "phone_number" character varying(12) NOT NULL, "birth_date" date NOT NULL, "description" text, "account_type" "public"."users_account_type_enum" NOT NULL DEFAULT 'buyer', "password" character varying(120) NOT NULL, "reset_password" character varying, "code_expire" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "announcementId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_type_enum"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
