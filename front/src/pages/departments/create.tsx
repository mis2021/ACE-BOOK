import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import DepartmentForm from '@/app/department/deptForm';

const breadcrumbs = [
  {
    title: "Departments",
    route: "/departments",
    isHome: true,
  },
  {
    title: "Create",
    route: "/departments/create",
    isCurrent: true,
  }
]

function CreateDeptPage() {
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
          <DepartmentForm />
      </ModClassicLayout>
    </>
  );
}

CreateDeptPage.getLayout = getLayout;
export default CreateDeptPage;
