import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum TaskStatus {
  INCOMPLETE = 'incomplete',
  COMPLETED = 'completed',
}

@Entity('tasks')
export class Task {
  constructor(
    userId: number,
    title: string,
    description: string,
    status: TaskStatus,
    starred: boolean,
    id?: number,
    created_at?: Date,
    completed_at?: Date,
    deleted_at?: Date,
  ) {
    if (id) this.id = id;
    if (created_at) this.created_at = created_at;
    if (completed_at) this.completed_at = completed_at;
    if (deleted_at) this.deleted_at = deleted_at;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.starred = starred;
  }

  @BeforeInsert()
  seDates() {
    this.created_at = new Date();
  }

  @BeforeUpdate()
  checkDate() {
    if (this.created_at == null)
      throw new Error('Creation date cannot be changed');
    if (this.created_at > this.completed_at)
      throw new Error('Mismatch in creation and completion dates');
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  created_at!: Date;

  @Column({ type: 'datetime', default: null, nullable: true })
  completed_at: Date | null;

  @Column({ type: 'datetime', default: null, nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.INCOMPLETE })
  status: TaskStatus;

  @Column({ default: false })
  starred: boolean;
}
