import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { requestCreateMerchant, requestDetailMerchant } from 'shared/api/merchant.api';
import Button from 'shared/components/Button/Button';
import { Input } from 'shared/components/Input';

export const InfoMerchant: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    status: true,
    enablePayment: true,
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  });
  const [formFieldInformation, setFormFieldInformation] = useState({
    name: '',
    code: '',
    country: ''
  });

  useEffect(() => {
    if (params.mode === 'edit' && params.id) {
      getDetailData();
    }
  }, []);

  const getDetailData = async () => {
    try {
      const res = await requestDetailMerchant(params.id);
      setFormFieldInformation(res.data);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formFieldInformation
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        avatar: dataForm.avatar,
        adminConfig: {
          status: dataForm.status ? 'Active' : 'Inactive',
          enablePayment: dataForm.enablePayment
        },
        location: {
          latitude: 0,
          longitude: 0
        }
      };
      if (params.mode === 'edit') {
        console.log('run');
      } else {
        try {
          await requestCreateMerchant(payload);
          navigate(PROTECTED_ROUTES_PATH.EVENTS);
          toast.success('Create merchant success!');
        } catch (error) {
          console.error('Exception ' + error);
        }
      }
    },
    enableReinitialize: true
  });

  const pageTitle = () => {
    if (params.mode === 'add') return 'Create';
    if (params.mode === 'edit') return 'Edit';
  };

  const onChangeEnablePayment = () => {
    setDataForm({ ...dataForm, enablePayment: !dataForm.enablePayment });
  };

  const onChangeStatus = () => {
    setDataForm({ ...dataForm, status: !dataForm.status });
  };
  return (
    <div className=" p-2">
      <form onSubmit={formik.handleSubmit}>
        <div className="relative bottom-0 bg-white p-4 flex justify-between items-center flex-1">
          <span className="text-lg font-bold">{pageTitle()} Merchant</span>
          <Button className="w-full p-4 bg-primary-color" htmlType="submit">
            Save
          </Button>
        </div>

        <div className="grid grid-rows-1 grid-cols-4 gap-4 mt-2 ">
          <div className="col-span-3">
            <div className="bg-white p-4 rounded mb-4">
              <div className="text-lg font-bold">Information</div>

              <div className="gird gap-4 grid-cols-12">
                <div className="py-2">
                  <label className="font-semibold">Name</label>
                  <div className="grid col-span-6">
                    <Input
                      placeholder="Press Name Merchant"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="font-semibold">Code</label>
                  <div className="grid col-span-6">
                    <Input
                      placeholder="Press Code Merchant"
                      id="code"
                      name="code"
                      onChange={formik.handleChange}
                      value={formik.values.code}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="font-semibold">Country</label>
                  <div className="grid col-span-6">
                    <Input
                      placeholder="Press Country Merchant"
                      id="country"
                      name="country"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded mb-4">
              <div className="flex justify-center mb-2">
                <img width={200} src={dataForm.avatar} />
              </div>
              <div className="flex justify-center">
                <Button className="w-full p-4 bg-primary-color">Change Image</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
