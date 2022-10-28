import moment from 'moment';
import React, { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { IoLocation } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { requestGetMerchant } from 'shared/api/merchant.api';
import Button from 'shared/components/Button/Button';
import { renderStatus } from 'shared/components/HelpRender';
import { InputSearch } from 'shared/components/Input';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';

interface TFilter {
  page?: number;
  userId?: string;
}
export const MerchantPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({ userId: '', page: 1 });
  const [searchText, setSearchText] = useState<string>('');
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: requestGetMerchant
  });
  const columns = [
    {
      title: 'Merchant Code',
      keyData: 'code',
      render: (value: any, index: number, record: any) => (
        <div
          className="cursor-pointer font-semibold text-primary-color "
          onClick={() => {
            goToUpdateMerchant(record._id);
          }}>
          {value}
        </div>
      )
    },
    {
      title: 'Merchant Name',
      keyData: 'name'
    },
    {
      title: 'Status',
      keyData: 'status',
      render: (value: any, index: number, record: any) => (
        <>{renderStatus(record.adminConfig?.status)}</>
      )
    },
    { title: 'Country', keyData: 'country' },
    {
      title: 'Location',
      keyData: 'location',
      render: (value: any, index: number, record: any) => (
        <div>
          <IoLocation className="text-red-600 text-2xl cursor-pointer " />
        </div>
      )
    },
    {
      title: 'Created date',
      keyData: 'createdAt',
      render: (value: any) => <div>{moment(value).format('DD/MM/YYYY')}</div>
    }
  ];

  const goToAddMerchant = () => {
    navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/add`);
  };

  const goToUpdateMerchant = (id: string) => {
    navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/edit/${id}`);
  };

  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded mb-4 ">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Merchant</div>
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={goToAddMerchant}>
              <BiPlusCircle />
              Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
          <div className="col-span-6">
            <InputSearch
              placeholder="Search by Merchant ID"
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
