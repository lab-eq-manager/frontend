import { EquipmentCard } from '../components/EquipmentCard';
import { Equipment, EquipmentStatus } from '../types';
import { mockEquipments } from '../utils/mockData';

const EquipmentList: React.FC = (props: { equipments: Equipment[] }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {props.equipments.map((equipment) => (
        <EquipmentCard key={equipment.eqId} equipment={equipment} />
      ))}
    </div>
  );
};

export const Equipments: React.FC = () => {
  return (
    <div className="w-full">
      <EquipmentList equipments={mockEquipments} />
    </div>
  );
};
