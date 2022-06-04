import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from 'src/common/entities/core.entity';

@InputType('DepartmentInputType', { isAbstract: true })
@ObjectType()
export class DepartmentEnt extends CoreEntityMg {
  name: string;
  description: string;
}
