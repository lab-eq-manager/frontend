import { EquipmentForm } from '@/components/EquipmentForm';
import { useParams } from 'react-router-dom';

export const EditEquipmentView = () => {
  const { eqId } = useParams<{ eqId: string }>();

  return <EquipmentForm eqId={eqId} />;
};
