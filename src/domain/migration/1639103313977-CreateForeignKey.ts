import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateForeignKey1639103313977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'todos',
            new TableColumn({
                name: 'userId',
                type: 'int',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey(
            'todos',
            new TableForeignKey({
                name:'user_id_fk',
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('todos', 'user_id_fk')
        await queryRunner.dropColumn('todos', 'userId')
    }

}
