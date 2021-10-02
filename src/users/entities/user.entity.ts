import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from '@src/common/entities/core.entity';
import bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
export class UserWithoutPassword extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role!: UserRole;
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends UserWithoutPassword {
  @Column()
  @Field(() => String)
  @IsString()
  password!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
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
