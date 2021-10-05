import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from '@src/common/entities/core.entity';
import bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  emailVerified!: boolean;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role!: UserRole;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) return;
    try {
      const salt = await bcrypt.genSalt(+process.env.BCRYPT_ROUNDS);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
