import { useParams } from 'react-router-dom';

import { EquipmentCard } from '../components/EquipmentCard';
import { ApplyForm } from '../components/ApplyForm';

import { mockEquipments } from '../utils/mockData';

export const ApplyView: React.FC = () => {
  const eqId = useParams<{ eqId: string }>().eqId;

  return (
    <div className="apply-wrapper flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">申请设备</div>
      <EquipmentCard equipment={mockEquipments[1]} showButton={false} showManageButton={false} />
      <ApplyForm eqId={eqId} />
    </div>
  );
};
