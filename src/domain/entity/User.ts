import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { Todo } from './Todo'

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @OneToMany(() => Todo, (todo) => todo.userId, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    todos: Todo[]

}
