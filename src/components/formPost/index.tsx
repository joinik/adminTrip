import { tailErr } from '@/utils';
import { Form, message } from 'antd';
import { FormLayout } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';

const FormPost = (ctx: {
  children: React.ReactNode;
  items: FormItem[];
  initialValues?: Store;
  layout?: FormLayout;
  autoComplete?: string;
  onSubmit: (post: any) => LikePromise<string | void>;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (value: any) => {
    messageApi.loading('正在提交');
    try {
      const msg = (await ctx.onSubmit(value)) ?? '操作成功';
      messageApi.destroy();
      messageApi.success(msg);
    } catch (err: unknown) {
      tailErr(err);
    }
  };

  const onFinishFailed = (err: any) => {
    console.log('onFinishFailed', err);
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        initialValues={ctx.initialValues}
        layout={ctx.layout ?? 'vertical'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {ctx.items.map(item => (
          <Form.Item key={item.name} {...item}>
            {item.element}
          </Form.Item>
        ))}
        {ctx.children}
      </Form>
    </>
  );
};
export default FormPost;
