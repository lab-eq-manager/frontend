import { useParams } from 'react-router-dom';

import { EquipmentCard } from '../components/EquipmentCard';
import { ApplyForm } from '../components/ApplyForm';

import { useEffect, useState } from 'react';
import { getEquipmentDetail } from '@/utils/requests';
import { Equipment } from '@/types';

export const EquipmentView: React.FC = () => {
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
      <div className="title font-semibold text-2xl">设备详情</div>
      {equipment && (
        <EquipmentCard fullView equipment={equipment} showButton={false} showManageButton={false} />
      )}
    </div>
  );
};
