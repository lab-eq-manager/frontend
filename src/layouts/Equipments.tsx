import { useEffect, useMemo, useState, useCallback } from 'react';
import { EquipmentCard } from '../components/EquipmentCard';
import { Equipment, EquipmentStatus } from '../types';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { getEquipmentList } from '@/utils/requests';
import { useToast } from '@/components/ui/use-toast';

const EquipmentList: React.FC<{ equipments: Equipment[] }> = (props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {props.equipments.map((equipment) => (
        <EquipmentCard key={equipment.eqId} equipment={equipment} showButton showManageButton />
      ))}
    </div>
  );
};

const useEquipmentList = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    getEquipmentList()
      .then((res) => {
        setEquipments(res);
      })
      .catch((err) => {
        toast({
          title: '获取设备列表失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  }, []);

  return { equipments };
};

export const Equipments: React.FC = () => {
  const [search, setSearch] = useState('');
  const { equipments } = useEquipmentList();
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredEquipments = useMemo(() => {
    console.log('ser', search, equipments);
    if (!equipments) return [];
    return equipments.filter((equipment) => {
      return (
        equipment.name.includes(search) ||
        equipment.eqId.includes(search) ||
        equipment.labId.includes(search)
      );
    });
  }, [equipments, search]);

  return (
    <div className="w-full flex gap-6 flex-col ">
      <div className="toolbar flex gap-2">
        <Input
          label="搜索设备"
          className="bg-slate-50"
          variant="bordered"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          color="primary"
          style={{ height: '3.4rem' }}
          onClick={() => {
            navigate('/equipment/add');
          }}
        >
          添加设备
        </Button>
      </div>

      <EquipmentList equipments={filteredEquipments} />
    </div>
  );
};
