import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EquipmentCard } from '../components/EquipmentCard';
import { ApplyForm } from '../components/ApplyForm';
import { getEquipmentDetail } from '@/utils/requests';
import { mockEquipments } from '../utils/mockData';
import { Equipment } from '@/types';

export const ApplyView: React.FC = () => {
  const eqId = useParams<{ eqId: string }>().eqId || '';
  const [equipment, setEquipment] = useState<Equipment>();

  useEffect(() => {
    getEquipmentDetail({ eqId })
      .then((res) => {
        setEquipment(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eqId]);

  return (
    <div className="apply-wrapper flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">申请设备</div>
      {<EquipmentCard equipment={mockEquipments[0]} showButton={false} showManageButton={false} />}
      <ApplyForm eqId={eqId} />
    </div>
  );
};
