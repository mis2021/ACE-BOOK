import Input from '@admin/components/ui/input';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import TextArea from '@admin/components/ui/text-area';
import Label from '@admin/components/ui/label';
// import { useTypesQuery } from "@graphql/type.graphql";
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import * as categoriesIcon from '@/components/icons/category';
import { getIcon } from '@/utils/get-icon';
import { useRouter } from 'next/router';
// import { ROUTES } from "@utils/routes";
import { getErrorMessage } from '@/utils/form-error';
import ValidationError from '@admin/components/ui/form-validation-error';
import { toast } from 'react-toastify';
// import { tagIcons } from "./tag-icons";
import { useTranslation } from 'next-i18next';
import FileInput from '@admin/components/ui/file-input';
// import SelectInput from "@components/ui/select-input";
import { yupResolver } from '@hookform/resolvers/yup';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { getLayout } from '@/components/layouts/layout';
// import {
//   useCreateTagMutation,
//   useUpdateTagMutation,
// } from "@graphql/tags.graphql";
import { accValidationSchema, accValidationSchemaUpdate } from './formvalidations/acc-validation-schema';
// import { tagValidationSchema } from "./tag-validation-schema";
import { Tag } from '__generated__/__types__';
import { NextPageWithLayout } from '@/types';
import { gql, useMutation } from '@apollo/client';
import { UPSERT_ACCOUNT } from '@graphql/operations/accounts/accountMutations';
import cn from 'classnames';
import AccBasicInfo from './basicInfo';
import AccEmpInfo from './employeeInfo';
import BorderDashed from '@/components/ui/border';
import AccCredentials from './credentials';
import ContactInfo from './contactInfo';
import {
  AccFormSubmission,
  AccFormValues,
} from '@/types/accounts/accountTypes';
import { DepartmentGenType } from '@/types/departments/departmentTypes';
import _ from 'lodash';

type IProps = {
  initialValues?: null;
  defaultValues?: any 
};

const AccountForm = ({defaultValues} : any) => {
// const AccountForm: NextPageWithLayout = ({defaultValues} : any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccFormValues>({
    //@ts-ignore
    defaultValues: defaultValues ?? {},

    resolver: yupResolver(defaultValues ? accValidationSchemaUpdate  : accValidationSchema),
  });

 

  const [upsertAcc] = useMutation(UPSERT_ACCOUNT);

  const onSubmit = async (values: AccFormValues ) => {
    let payload: AccFormSubmission | AccFormValues;
    payload = _.cloneDeep(values);

    const orgDept = values?.department.map((item: any) => {
      return item._id;
    });

    const deptOnDuty : any = values?.departmentOnDuty?._id;

    payload.department = orgDept;
    payload.departmentOnDuty = deptOnDuty;

    if(defaultValues?._id){
      payload._id = defaultValues._id
      delete payload.updated_at
      delete payload.created_at
      delete payload.__typename
    }

    if(payload.password){
      payload.password = payload.password

      if(!payload.confPassword){
        return toast.error("Please confirm password")
      }else{
        if(payload.confPassword !== payload.password ){
          return toast.error("Password does not match")
        }
      }
    
    }else{
      delete payload.password
    }


    delete payload.confPassword

    if (confirm('Are you sure you want to save user?')) {
      upsertAcc({
        variables: {
          input: payload,
        },
      })
        .then((resp) => {
          toast.success(t('Account successfully saved'));

        })
        .catch((error) => {
          toast.error(t('Account failed to save'));
        });
    }
  };
  const column = 'auto';
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BorderDashed>
          <AccBasicInfo register={register} errors={errors} />
        </BorderDashed>
        <BorderDashed>
          <AccEmpInfo register={register} errors={errors} control={control} />
        </BorderDashed>
        <BorderDashed>
          <ContactInfo register={register} errors={errors} />
        </BorderDashed>
        <AccCredentials register={register} errors={errors} />
        <div className="text-end mb-4 ">
          <Button loading={false}>Save Details</Button>
        </div>
      </form>
    </>
  );
};

// AccountForm.getLayout = getLayout;

export default AccountForm;
