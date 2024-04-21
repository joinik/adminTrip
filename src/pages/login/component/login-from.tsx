import { ChangeEvent, FormEvent, useState } from 'react';
import { SubmitBtn } from './submit-btn';

export type LoginEvent = (post: { user: string; pwd: string }) => void;
export const LoginForm = ({ onSubmit }: { onSubmit: LoginEvent }) => {
  const [user, setUser] = useState('');
  const [pwd, setPassword] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ user, pwd });
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
