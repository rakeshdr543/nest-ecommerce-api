import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Post } from './post.entity';

@Entity('User')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

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

  @OneToMany((_type) => Post, (post) => post.user, { eager: true })
  posts: Post[];
}
