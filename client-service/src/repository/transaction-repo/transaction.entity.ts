import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from '../user-repo/user.entity';

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  isSuccess: boolean;

  @Column()
  amount: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  tradingDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true
    // cascade: true
  })
  @JoinColumn({ name: 'userIdFrom' })
  userFrom: UserEntity;

  @Column()
  userIdFrom: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true
    // cascade: true
  })
  @JoinColumn({ name: 'userIdTo' })
  userTo: UserEntity;

  @Column()
  userIdTo: string;
}
