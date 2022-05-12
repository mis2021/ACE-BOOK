import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('MuserInputType', { isAbstract: true })
@ObjectType()
export class MuserEnt extends CoreEntity {
  username: string;
  email: string;
  password: string;
  role: string;
  token: string;
}
