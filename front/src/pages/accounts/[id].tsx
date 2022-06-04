import React from 'react';
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { useRouter } from 'next/router';
import AccountForm from '@/app/accounts/accForm';
import { useQuery } from '@apollo/client';
import { GET_DETAILED_ACC } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';


type Props = {};

const EditAccount: NextPageWithLayout = (props: Props) => {
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;

  const breadcrumbs = [
    {
      title: 'Accounts',
      route: '/accounts',
      isHome: true,
    },
    {
      title: 'Update',
      route: `/accounts/${id}`,
      isCurrent: true,
    },
  ];

  const { data: accData, refetch } = useQuery(GET_DETAILED_ACC, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables:{
      "first": 1,
      "page": 1,
      "id": id
    }
  });



  return (
    <div>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        {
          _.get(accData, "accounts.data[0]") ? <AccountForm defaultValues={_.get(accData, "accounts.data[0]")} /> :  <Spinner showText={false} />
        }
        
      </ModClassicLayout>
    </div>
  );
};
EditAccount.getLayout = getLayout;

export default EditAccount;
