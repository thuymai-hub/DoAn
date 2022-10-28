import { Button, Input, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { useTableData } from 'shared/hooks/useTableData';
import { mookData } from 'shared/mookData/news';
import { NewsItemComp } from '../components/NewsItemComp';

const { Search } = Input;
interface TFilter {
  page?: number;
  search?: string;
}
export const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({ search: '', page: 1 });
  const searchRef: any = useRef();
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: null
  });
  const optionsTopic = [
    { label: 'Giới thiệu', value: 'Giới thiệu' },
    { label: 'Tuyển sinh', value: 'Tuyển sinh' },
    { label: 'Đào tạo', value: 'Đào tạo' },
    { label: 'Nghiên cứu', value: 'Nghiên cứu' },
    { label: 'Sinh viên', value: 'Liên hệ' }
  ];

  const tranferPage = (mode = 'add', id?: string | number) => {
    if (id) {
      navigate(`${PROTECTED_ROUTES_PATH.NEWS}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.NEWS}/${mode}`);
    }
  };

  const onSearch = (value: string) => {
    console.log('value', value);
  };

  const handleChangeSelect = (value: string) => {
    console.log('value', value);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">Quản lý bài viết</div>
        <div className="flex">
          <Button type="primary" size="large" onClick={() => tranferPage()}>
            <div className="flex items-center">
              <AiOutlinePlusCircle className="mr-2" /> Thêm bài viết
            </div>
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded mb-4 mt-4">
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 ">
          <div className="col-span-6">
            <Search placeholder="Nhập tiêu đề bài viết" ref={searchRef} onSearch={onSearch} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
          <div className="col-span-3">
            <label className="font-semibold text-gray-500"> Chủ đề</label>
            <div>
              <Select
                style={{ width: '100%' }}
                defaultValue="Giới thiệu"
                onChange={handleChangeSelect}
                options={optionsTopic}></Select>
            </div>
          </div>
        </div>
      </div>

      <div>
        {mookData.map((item) => (
          <NewsItemComp
            titlePage="bài viết"
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
