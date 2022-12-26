import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoilOrders {
  // 主列表
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  project_id: number;
  
  // 公司设备名称
  @Column()
  project_name: string;

  @Column()
  robot_name: string;

  @Column()
  local_id: string;

  @Column()
  food_id: number;

  @Column()
  food_name: string;
  
  // 订单日期
  @Column()
  order_date: string
  
  @Column()
  status: number;
  
  @Column()
  cook_time: number;
  
  @Column()
  soup_id: number;
  
  @Column()
  soup_name: string;
  
  // 加汤时长
  @Column()
  soup_time: number;
  
  @Column()
  start_time: Date;
  
  @Column()
  end_time: Date;
  
  @Column()
  cool_time: number;
  
  @Column()
  reboil_time: number;
  
  @Column()
  upload_time: Date;
  
  @Column()
  remarks: string;
}
