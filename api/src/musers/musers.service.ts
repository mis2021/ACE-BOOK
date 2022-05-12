import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { GetMusersArgs } from './dto/get-muser.args';
import { MuserEnt } from './entities/muser.entity';
import Muser from '../../models/User';


@Injectable()
export  class  MuserService {


 async findAllMusers({ page, first }: GetMusersArgs) {
   const muser: MuserEnt[] = await Muser.find();
    return {
      data: muser,
      // data: this.muser,
      paginatorInfo: paginate(muser.length, page, first, muser.length),
      // paginatorInfo: paginate(this.muser.length, page, first, this.muser.length),
    };
  }

 

 
}
