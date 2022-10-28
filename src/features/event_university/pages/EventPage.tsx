import { Button, Input } from 'antd';
import { NewsItemComp } from 'features/news/components/NewsItemComp';
import React, { useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { useTableData } from 'shared/hooks/useTableData';
import { mookData } from 'shared/mookData/news';

const { Search } = Input;
interface TFilter {
  page?: number;
  search?: string;
}
export const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({ search: '', page: 1 });
  const searchRef: any = useRef();
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: null
  });

  const tranferPage = (mode = 'add', id?: string | number) => {
    if (id) {
      navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/add`);
    }
  };

  const onSearch = (value: string) => {
    console.log('value', value);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">Quản lý sự kiện</div>
        <div className="flex">
          <Button type="primary" size="large" onClick={() => tranferPage()}>
            <div className="flex items-center">
              <AiOutlinePlusCircle className="mr-2" /> Thêm sự kiện
            </div>
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded mb-4 mt-4">
        <div className="grid grid-cols-12 gap-x-2 gap-y-4">
          <div className="col-span-6">
            <Search placeholder="Nhập tên sự kiện" ref={searchRef} onSearch={onSearch} />
          </div>
        </div>
      </div>

      <div>
        {mookData.map((item) => (
          <NewsItemComp
            titlePage="sự kiện"
            key={item?.id}
            data={item}
            handleClickDetail={() => {
              tranferPage('detail', 1);
            }}
            handleClickEdit={() => {
              tranferPage('edit', 1);
            }}
            handleClickDelete={() => {
              console.log('run');
            }}
          />
        ))}
      </div>
    </div>
  );
};
