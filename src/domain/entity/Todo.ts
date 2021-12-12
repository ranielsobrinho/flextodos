import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @JoinColumn({
    name: 'userId'
  })
  @ManyToOne(() => User, (user) => user.todos)
  userId: User
}
