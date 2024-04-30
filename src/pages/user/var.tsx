import { Input, Select } from 'antd';

/**
 * 编辑用户数据
 * @param param0
 * @returns
 */
export const userProps = () => {
  return [
    {
      label: '用户名',
      name: 'name',
      element: <Input />,
      rules: [{ required: true }],
    },
    {
      label: '密码',
      name: 'password',
      element: <Input.Password />,
      rules: [{ required: true }],
    },
    {
      label: '角色',
      name: 'is_admin',
      element: 
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
        //   onChange={handleChange}
          options={[
            { value: '0', label: '普通用户' },
            { value: '1', label: '管理员' },
          ]}
        />
      ,
      rules: [{ required: true }],
    },
  ];
};
