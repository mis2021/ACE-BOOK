import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { FbCategoryQuestionEnt, FbCategoryQuestionInput } from '../entities/fbCategoryQuestion.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionfbcq' });
@InputType()
export class UpsertFbCategoryQuestionInput extends PickType(FbCategoryQuestionInput, [
  'category',
  'questions',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class FbCategoryQuestionId extends PickType(FbCategoryQuestionEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}