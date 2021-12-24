import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../Enums/role.entity';

import { Post } from './post.entity';

@Entity('User')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: string;

  @OneToMany((_type) => Post, (post) => post.user)
  posts: Post[];
}
