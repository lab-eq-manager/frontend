import { useParams } from 'react-router-dom';

import { EquipmentCard } from '../components/EquipmentCard';

import { mockEquipments } from '../utils/mockData';

export const ApplyView: React.FC = () => {
  const eqId = useParams<{ eqId: string }>().eqId;

  return (
    <div className="apply-wrapper flex flex-col">
      <EquipmentCard equipment={mockEquipments[1]} showButton={false} />
    </div>
  );
};
