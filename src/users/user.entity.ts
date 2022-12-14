import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // 主列表
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  phone: string;
  
  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;
}
