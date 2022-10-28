import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestAccountsMerchant } from 'shared/api/merchant.api';
import Button from 'shared/components/Button/Button';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';
import { UpdateMerchantModal } from './UpdateMerchantModal';

export const MemberMerchant: React.FC = () => {
  const params = useParams();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [expandFilter, setExpandFilter] = useState({ merchantId: params.id });
  const { dataSource, loading, paging, setPaging, fetchDataSource } = useTableData({
    expandFilter,
    fetchList: requestAccountsMerchant
  });

  const columns = [
    {
      title: 'User ID',
      keyData: 'userId',
      render: (value: any) => (
        <div className="font-semibold cursor-pointer text-primary-color">{value}</div>
      )
    },
    {
      title: 'Merchant ID',
      keyData: 'merchantId',
      render: (value: any) => (
        <div className="font-semibold cursor-pointer text-primary-color">{value}</div>
      )
    },
    {
      title: 'Identifier',
      keyData: 'identifier'
    },
    {
      title: 'Created At',
      keyData: 'createdAt',
      render: (value: any) => <div>{moment(value).format('DD/MM/YYYY')}</div>
    }
  ];
  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded mb-4">
        <div className="flex justify-between">
          <div className="text-lg font-bold">Member merchant</div>
          <Button
            onClick={() => {
              setVisibleModal(!visibleModal);
            }}>
            Create Member
          </Button>
        </div>
        <div className="gird gap-4 grid-cols-12 mt-4">
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

          {visibleModal && (
            <UpdateMerchantModal
              visible={visibleModal}
              onCancel={() => {
                setVisibleModal(!visibleModal);
              }}
              merchantId={params.id || ''}
              fetchDataSource={fetchDataSource}
            />
          )}
        </div>
      </div>
    </div>
  );
};
