import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComSupllier from 'src/components/systems/customer/ComCustomer'

const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Customer',
    },
  ];

const ComSupplier = () => {
    return (
        <PageContainer title="Customer" description="This is customer ">
            <Breadcrumb title="CUSTOMER CATALOGUE" items={BCrumb} />
            <ComSupllier/>
        </PageContainer>
    );
};

export default ComSupplier; 