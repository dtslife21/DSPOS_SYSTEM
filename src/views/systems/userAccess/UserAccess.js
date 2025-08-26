import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComSupllier from 'src/components/systems/UserAccess/comUserAccess'

const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'User Access',
    },
  ];

const UserAccess = () => {
    return (
        <PageContainer title="User Access" description="This is user access">
            <Breadcrumb title="User Access" items={BCrumb} />
            <ComSupllier />
            
        </PageContainer>
    );
};

export default UserAccess; 