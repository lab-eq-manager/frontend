import { PersonCard } from '@/components/PersonCard';

export const PersonView: React.FC = () => {
  return (
    <div className="login-wrapper flex flex-col items-center w-full">
      <div className="title font-semibold text-2xl mb-20">个人中心</div>
      <PersonCard uid={41202034} />
    </div>
  );
};
