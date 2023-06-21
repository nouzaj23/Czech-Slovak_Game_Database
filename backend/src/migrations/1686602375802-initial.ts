import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1686602375802 implements MigrationInterface {
    name = 'Initial1686602375802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `);
        await queryRunner.query(`CREATE TABLE "developer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "avatar" text, "description" character varying NOT NULL, "isStudio" boolean NOT NULL, CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "text" character varying NOT NULL, "rating" integer NOT NULL, "gameId" uuid, "userId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "gameId" uuid, "userId" uuid, CONSTRAINT "UQ_b40c423e9991a101d4a3b056751" UNIQUE ("gameId", "userId"), CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "avatar" text, "bio" text, "isAdmin" boolean NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "content" character varying NOT NULL, "gameId" uuid, "commenterId" uuid, "replyToId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "releaseDate" date NOT NULL, "cover" character varying NOT NULL, "photos" text NOT NULL, "videos" text NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "developer_developed_game" ("developerId" uuid NOT NULL, "gameId" uuid NOT NULL, CONSTRAINT "PK_b923290865470d7367a2cfb15a3" PRIMARY KEY ("developerId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9748b087851abdf703ddf02a2" ON "developer_developed_game" ("developerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bdb89080de0e681c4e1e1bd44" ON "developer_developed_game" ("gameId") `);
        await queryRunner.query(`CREATE TABLE "genre_games_game" ("genreId" uuid NOT NULL, "gameId" uuid NOT NULL, CONSTRAINT "PK_b73ddc2ac36900be940be48f594" PRIMARY KEY ("genreId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c3eb2b3e8587d2f5b4311569e" ON "genre_games_game" ("genreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3f8cb3379452d10a0a4abc7a7" ON "genre_games_game" ("gameId") `);
        await queryRunner.query(`CREATE TABLE "comment_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_39195b1bd8eac2b5087e226824c" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbfcbcc9274de7f5608b8ae23d" ON "comment_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa8fb74dcdb101a8d80cb2256d" ON "comment_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ef6fa2aeb98fd27d0a8d71735b6" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_c68b2568add41ea2a4137300e25" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_92dc6db3632b3d1f2ba760c9a1f" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_60a8d223d76a792e1800218d714" FOREIGN KEY ("commenterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_cfc14dc2cafa339954de748ebf3" FOREIGN KEY ("replyToId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer_developed_game" ADD CONSTRAINT "FK_a9748b087851abdf703ddf02a25" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "developer_developed_game" ADD CONSTRAINT "FK_9bdb89080de0e681c4e1e1bd44e" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genre_games_game" ADD CONSTRAINT "FK_2c3eb2b3e8587d2f5b4311569e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genre_games_game" ADD CONSTRAINT "FK_d3f8cb3379452d10a0a4abc7a79" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_closure" ADD CONSTRAINT "FK_cbfcbcc9274de7f5608b8ae23d9" FOREIGN KEY ("id_ancestor") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_closure" ADD CONSTRAINT "FK_aa8fb74dcdb101a8d80cb2256de" FOREIGN KEY ("id_descendant") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_closure" DROP CONSTRAINT "FK_aa8fb74dcdb101a8d80cb2256de"`);
        await queryRunner.query(`ALTER TABLE "comment_closure" DROP CONSTRAINT "FK_cbfcbcc9274de7f5608b8ae23d9"`);
        await queryRunner.query(`ALTER TABLE "genre_games_game" DROP CONSTRAINT "FK_d3f8cb3379452d10a0a4abc7a79"`);
        await queryRunner.query(`ALTER TABLE "genre_games_game" DROP CONSTRAINT "FK_2c3eb2b3e8587d2f5b4311569e5"`);
        await queryRunner.query(`ALTER TABLE "developer_developed_game" DROP CONSTRAINT "FK_9bdb89080de0e681c4e1e1bd44e"`);
        await queryRunner.query(`ALTER TABLE "developer_developed_game" DROP CONSTRAINT "FK_a9748b087851abdf703ddf02a25"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_cfc14dc2cafa339954de748ebf3"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_60a8d223d76a792e1800218d714"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_92dc6db3632b3d1f2ba760c9a1f"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_c68b2568add41ea2a4137300e25"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ef6fa2aeb98fd27d0a8d71735b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa8fb74dcdb101a8d80cb2256d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbfcbcc9274de7f5608b8ae23d"`);
        await queryRunner.query(`DROP TABLE "comment_closure"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3f8cb3379452d10a0a4abc7a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c3eb2b3e8587d2f5b4311569e"`);
        await queryRunner.query(`DROP TABLE "genre_games_game"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bdb89080de0e681c4e1e1bd44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9748b087851abdf703ddf02a2"`);
        await queryRunner.query(`DROP TABLE "developer_developed_game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "developer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28c5d1d16da7908c97c9bc2f74"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
