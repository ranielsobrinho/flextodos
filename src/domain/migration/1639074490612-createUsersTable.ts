import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1639074490612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar(100)',
                    isNullable: false
                },
                {
                    name: 'username',
                    type: 'varchar(50)',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar(100)',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar(50)',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
