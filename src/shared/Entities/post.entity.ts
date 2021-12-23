import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Post')
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  likes: number;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  user: User;
}
