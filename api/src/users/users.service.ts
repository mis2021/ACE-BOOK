import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordInput,
  ForgetPasswordInput,
  LoginInput,
  PasswordChangeResponse,
  RegisterInput,
  ResetPasswordInput,
  UserRegResponse,
  VerifyForgetPasswordTokenInput,
} from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserEntAB } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import usersJson from './users.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { GetAccArgs, GetUsersArgs, UserPaginator } from './dto/get-users.args';
import { MakeOrRevokeAdminInput } from './dto/make-revoke-admin.input';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import MUser from '../../models/User';
import { PaginationArgs } from 'src/common/dto/pagination.args';

const users = plainToClass(User, usersJson);
const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
const fuse = new Fuse(users, options);

@Injectable()
export class UsersService {
  private users: User[] = users;

  async register(cui: RegisterInput): Promise<UserRegResponse> {
    // const user: User = {
    //   ...users[0],
    //   id: uuidv4(),
    //   ...createUserInput,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };

    // this.users.push(user);

    const newUser = new MUser({
      username: cui.username,
      suffix: cui.suffix,
      email: cui.email,
      password: await bcrypt.hash(cui.password, 10),
      firstName: cui.firstName,
      middleName: cui.middleName,
      lastName: cui.lastName,
      position: cui.position,
      isActive: cui.isActive,
      isApprover: cui.isApprover,
      contact: cui.contact,
      departmentOnDuty: cui.departmentOnDuty,
      department: cui.department,
    });
    await newUser.save();

    return {
      _id: newUser._id,
      username: newUser.username,
    };
  }

  async updateMUser(cui: RegisterInput): Promise<UserRegResponse> {
    let savedData;

    console.log(cui);
    if (cui.password) {
      cui.password = await bcrypt.hash(cui.password, 10)
    }

    savedData = await MUser.findOneAndUpdate(
      { _id: cui._id },
      { $set: cui },
      { new: true },
    );

    // if (upsertInput._id) {
    //   savedData = await Department.findOneAndUpdate(
    //     { _id: upsertInput._id },
    //     { $set: upsertInput },
    //     { new: true },
    //   );
    // } else {
    //   savedData = new Department({
    //     name: upsertInput.name,
    //     description: upsertInput.description,
    //   });
    //   await savedData.save();
    // }

    return savedData;
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await MUser.findOne({ username: loginInput.username });
    if (user && (await bcrypt.compare(loginInput.password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username: loginInput.username },
        'ACEMCACEBOOK11',
        {
          expiresIn: '2h',
        },
      );

      return {
        token: token,
        permissions: ['super_admin', 'store_owner', 'customer'],
        // permissions: ['super_admin', 'store_owner', 'customer'],
      };
    } else {
      return {
        token: '',
        permissions: [''],
      };
    }
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async forgetPassword(
    forgetPasswordInput: ForgetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordTokenInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: User[] = this.users;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === Number(getUserArgs.id));
  }

  me(): User {
    return this.users[0];
  }

  updateUser(id: number, updateUserInput: UpdateUserInput) {
    return this.users[0];
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async makeOrRevokeAdmin({ user_id }: MakeOrRevokeAdminInput) {
    return true;
  }

  async subscribeToNewsletter(email: string) {
    return true;
  }

  // CUSTOM //
  async findAll({ page, first, id }: GetAccArgs) {
    const data: UserEntAB[] = await MUser.find(id ? { _id: id } : {})
      // const data: UserEntAB[] = await MUser.find({id: "628f3358a8f49813a48c7df3"})
      .populate('departmentOnDuty')
      .populate('department');

    console.log('id', id);
    return {
      data: data,
      paginatorInfo: paginate(data.length, page, first, data.length),
    };
  }
}
