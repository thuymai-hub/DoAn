import { Modal } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { requestCreateAccountMerchant } from 'shared/api/merchant.api';
import Button from 'shared/components/Button/Button';
import { Input } from 'shared/components/Input';

type Props = {
  visible: boolean;
  onCancel: () => void;
  merchantId: string;
  fetchDataSource: any;
};
export const UpdateMerchantModal: React.FC<Props> = ({
  visible,
  onCancel,
  merchantId,
  fetchDataSource
}) => {
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
      namespace: ''
    },
    onSubmit: async (values) => {
      try {
        await requestCreateAccountMerchant(merchantId, {
          ...values,
          namespaces: ['tralet-merchant-admins', 'tralet-merchant-members']
        });

        toast.success('Create member merchant success!');
        fetchDataSource();
      } catch (error) {
        console.error('Exception ' + error);
      } finally {
        onCancel();
      }
    },
    enableReinitialize: true
  });

  useEffect(() => {
    return;
  }, []);

  return (
    <Modal
      visible={visible}
      title="Create Member Merchant"
      onCancel={() => {
        onCancel && onCancel();
      }}
      footer={null}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <div className="text-medium-grey font-medium">Identifier</div>
          <Input
            placeholder="Press Identifier"
            id="identifier"
            name="identifier"
            onChange={formik.handleChange}
            value={formik.values.identifier}
          />
        </div>
        <div className="mb-2">
          <div className="text-medium-grey font-medium">Password</div>
          <Input
            placeholder="Press Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="mb-2">
          <div className="text-medium-grey font-medium">Namespaces</div>
          <Input
            placeholder="Press Name"
            id="namespace"
            name="namespace"
            onChange={formik.handleChange}
            value={formik.values.namespace}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="w-full p-4 bg-danger-color mr-4"
            onClick={() => {
              onCancel && onCancel();
            }}>
            Cancel
          </Button>
          <Button className="w-full p-4 bg-primary-color" htmlType="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
