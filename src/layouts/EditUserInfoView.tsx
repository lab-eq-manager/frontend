import { useParams } from 'react-router-dom';
import { EditUserForm } from '@/components/EditUserForm';

export const EditUserInfoView: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  return <EditUserForm uid={uid} />;
};
