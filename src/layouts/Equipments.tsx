import { useEffect } from 'react';
import { EquipmentCard } from '../components/EquipmentCard';
import { Equipment, EquipmentStatus } from '../types';
import { mockEquipments } from '../utils/mockData';
import { store } from '@/utils/store';

const EquipmentList: React.FC<{ equipments: Equipment[] }> = (props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {props.equipments.map((equipment) => (
        <EquipmentCard key={equipment.eqId} equipment={equipment} />
      ))}
    </div>
  );
};

export const Equipments: React.FC = () => {
  const { dispatch } = store;

  return (
    <div className="w-full">
      <EquipmentList equipments={mockEquipments} />
    </div>
  );
};
