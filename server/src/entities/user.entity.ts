import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Task } from './task.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  constructor(
    username: string,
    password: string,
    id?: number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    tasks?: Task[],
  ) {
    if (id) this.id = id;
    this.username = username;
    this.password = password;
    if (created_at) this.created_at = created_at;
    if (updated_at) this.updated_at = updated_at;
    if (deleted_at) this.deleted_at = deleted_at;
    if (tasks) this.tasks = tasks;
  }

  @BeforeInsert()
  setDates() {
    this.created_at = new Date();
  }
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, process.env['HASHSALT']);
    this.password = hash;
  }

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
  checkDate() {
    if (this.created_at == null)
      throw new Error('Creation date cannot be changed');
    if (this.created_at > this.deleted_at)
      throw new Error('Mismatch in creation and deleted dates');
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  created_at!: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  updated_at: Date | null;

  @DeleteDateColumn({ type: 'datetime', nullable: true, default: null })
  deleted_at: Date | null;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
