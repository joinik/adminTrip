/* eslint-disable @typescript-eslint/no-explicit-any */
import FormPost from '@/components/formPost';
import { tailErr } from '@/utils';
import { Button, Form, Modal, Space } from 'antd';
import { useState } from 'react';
import { userProps } from '../var';

const WithFrom = ({
  onSubmit,
  onCancel,
  initData,
}: {
  onSubmit: (op: any) => Promise<any>;
  onCancel: () => void;
  initData?: User;
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  return (
    <FormPost
      initialValues={initData}
      items={userProps()}
      onSubmit={async data => {
        setConfirmLoading(true);
        await onSubmit({
          ...(initData ?? {}),
          ...data,
        });
        setConfirmLoading(false);
      }}
    >
      <Form.Item>
        <Space>
          <Button key="back" onClick={onCancel}>
            取消
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={confirmLoading}
          >
            提交
          </Button>
        </Space>
      </Form.Item>
    </FormPost>
  );
};

type PushUserModalProp = {
  request: (op: any) => Promise<any>;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  title: string;
  initData?: User;
};

export const PushUserModal = ({
  request,
  open,
  setOpen,
  title,
  initData,
}: PushUserModalProp) => {
  const handleSubmit = async (data: Record<string, string | number>) => {
    try {
      await request(data);
      Object.assign(initData ?? {}, data);
      setOpen(false);
    } catch (err) {
      tailErr(err);
    }
  };
  const handleCancel = () => setOpen(false);
  const form = (
    <WithFrom
      initData={initData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      {open ? form : 'loading...'}
    </Modal>
  );
};
