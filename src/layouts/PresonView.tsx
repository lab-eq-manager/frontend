import { PersonCard } from '@/components/PersonCard';
import { useSelector } from 'react-redux';

export const PersonView: React.FC = () => {
  const uid = useSelector((state) => state.uid);
  return (
    <div className="login-wrapper flex flex-col items-center w-full">
      <div className="title font-semibold text-2xl mb-20">个人中心</div>
      <PersonCard uid={uid} />
    </div>
  );
};
