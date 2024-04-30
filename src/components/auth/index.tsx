import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { signAtom } from '@/store/auth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigete = useNavigate();
  const [sign] = useAtom(signAtom);
  if (sign == null) {
    navigete('/login');
  }
  return children;
};
