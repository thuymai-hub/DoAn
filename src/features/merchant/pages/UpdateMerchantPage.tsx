import React from 'react';
import { Tabs } from 'shared/components/Tabs';
import { InfoMerchant } from '../components/InfoMerchant';
import { MemberMerchant } from '../components/MemberMerchant';

export const UpdateMerchantPage: React.FC = () => {
  const tabs = [
    { tabIndex: '1', label: 'Dashboard', content: <InfoMerchant /> },
    { tabIndex: '2', label: 'Account', content: <MemberMerchant /> }
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};
