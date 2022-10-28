import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGetAccounts } from 'shared/api/customer.api';
import { InputSearch } from 'shared/components/Input';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';

interface TFilter {
  page?: number;
  userId?: string;
}
export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({ userId: '', page: 1 });
  const [searchText, setSearchText] = useState<string>('');
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: requestGetAccounts
  });

  const columns = [
    {
      title: 'User ID',
      keyData: 'userId',
      render: (value: any, index: number, record: any) => (
        <div
          className="font-semibold cursor-pointer text-primary-color"
          onClick={() => {
            goToDetailAccount(record.userId);
          }}>
          {value}
        </div>
      )
    },
    {
      title: 'Name Account',
      keyData: 'fullName'
    },
    {
      title: 'Email',
      keyData: 'email'
    },
    { title: 'Phone Number', keyData: 'phone' },
    {
      title: 'Created At',
      keyData: 'createdAt',
      render: (value: any) => <div>{moment(value).format('DD/MM/YYYY')}</div>
    }
  ];

  const goToDetailAccount = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded mb-4 ">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Account</div>
        </div>

        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
          <div className="col-span-6">
            <InputSearch
              placeholder="Search by User ID"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onSearch={() => {
                setExpandFilter({ ...expandFilter, userId: searchText, page: 1 });
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          paging={{
            ...paging,
            onChangePage: (page: number) => {
              setPaging({ ...paging, currentPage: page });
            }
          }}
        />
      </div>
    </div>
  );
};
