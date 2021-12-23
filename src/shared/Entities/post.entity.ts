import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('Post')
export class Post {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  likes: number;
}
