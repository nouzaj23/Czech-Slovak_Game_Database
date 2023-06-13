import { MigrationInterface, QueryRunner } from "typeorm"

export class Seed1686602541147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query("INSERT INTO \"user\" (username, email, hash, \"isAdmin\") VALUES ('admin', 'admin@localhost', '$2b$10$xHzA7oF6BSAFhctUi8ZQf.Svs73dp7B3nPy/9nQTSTEKz.73W3Tru', TRUE)")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query('DELETE FROM "user" WHERE username = "admin"')
    }
}
