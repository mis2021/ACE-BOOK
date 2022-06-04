import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';
import { DepartmentEnt } from 'src/acebook/masterdata/department/entities/department.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity, CoreEntityMg } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { Profile } from './profile.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  name: string;
  email: string;
  username: string;
  password?: string;
  shop_id?: number;
  profile?: Profile;
  shops?: Shop[];
  refunds?: Refund[];
  managed_shop?: Shop;
  is_active?: boolean = true;
  address?: Address[];
  orders?: Order[];
  wallet?: Wallet;
  permissions: Permissions[];
}


@InputType('UserTypeAB', { isAbstract: true })
@ObjectType()
export class UserEntAB extends CoreEntityMg {
  // username: string;
  // email: string;
  // password: string;
  // role: string;
  // token: string;

  suffix?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  isActive?: boolean;
  isApprover?: boolean;
  contact?: string;
  email?: string;
  password?: string;
  token?: string;
  departmentOnDuty?: DepartmentEnt ;
  department?: DepartmentEnt[] ;
  restrictionCode?: string[];
}

@InputType('UserInputTypeAB', { isAbstract: true })
@ObjectType()
export class UserEntABInput extends CoreEntityMg {
  // username: string;
  // email: string;
  // password: string;
  // role: string;
  // token: string;
  suffix: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position?: string;
  isActive?: boolean;
  isApprover?: boolean;
  contact: string;
  email?: string;
  password?: string;
  token?: string;
  departmentOnDuty?: string ;
  department?: string[] ;
  restrictionCode?: string[];
}

@InputType('PermissionsInputType', { isAbstract: true })
@ObjectType()
export class Permissions {
  @Field(() => ID)
  id: number;
  name: string;
}
