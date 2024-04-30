import './index.scss';
import { upDocumentTitle } from '@/utils';
import { message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginEvent, LoginForm } from './component/login-from';
import { loginGet } from '@/api';
import { useSign } from '@/store/auth';

export const Login = () => {
  upDocumentTitle('Admin Login');

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationHolder] = notification.useNotification();

  const [, setSign] = useSign();

  const onSubmit: LoginEvent = async post => {
    messageApi.open({
      type: 'loading',
      content: 'Trying to login',
      duration: 0,
    });

    try {
      const { info } = await loginGet(post);
      const user = info.replace('用户登录成功！', '')
      setSign(user);
      await message.success('Loading finished', 2.5);
      navigate('/');
    } catch (err: unknown) {
      let description = '网络异常';
      if (err !== null && typeof err === 'object') {
        description = Reflect.get(err, 'message');
      }
      notificationApi.error({
        message: '温馨提示',
        description,
        duration: 2.5,
      });
    }
  };

  messageApi.destroy();

  return (
    <main className="login-view">
      {contextHolder} {notificationHolder}
      <i className="top"></i>
      <i className="bottom"></i>
      <LoginForm onSubmit={onSubmit} />
    </main>
  );
};

export default Login;
