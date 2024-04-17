import { ChangeEvent, useState } from 'react';
import { SubmitBtn } from './submit-btn';

export type LoginEvent = (post: { user: string; password: string }) => void;
export const LoginForm = ({ onSubmit }: { onSubmit: LoginEvent }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const submit = (event: FormEvnet) => {
    event.preventDefault();
    onSubmit({ user, password });
  };

  return (
    <form className="center" onSubmit={(event: FormEvent) => submit(event)}>
      <h2>Please Sign In</h2>
      <input
        placeholder="Username"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(event.target.value)
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
      <SubmitBtn />
    </form>
  );
};
