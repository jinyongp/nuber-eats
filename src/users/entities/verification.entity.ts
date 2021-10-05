import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '@src/common/entities/core.entity';
import { IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  code!: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @BeforeInsert()
  createCode(): void {
    this.code = Math.random().toString(36).slice(-5).toUpperCase();
  }
}
