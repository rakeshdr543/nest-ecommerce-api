import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('User')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  isActive: boolean;
}
