import { useEffect, useMemo, useState, useCallback } from 'react';
import { EquipmentCard } from '../components/EquipmentCard';
import { Equipment, EquipmentStatus, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { getEquipmentList } from '@/utils/requests';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { useLoading } from '@/utils/useLoading';

const EquipmentList: React.FC<{ equipments: Equipment[]; isAdmin: boolean }> = (props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {props.equipments.map((equipment) => (
        <EquipmentCard
          key={equipment.eqId}
          equipment={equipment}
          showButton
          showManageButton={props.isAdmin}
        />
      ))}
    </div>
  );
};

export const useEquipmentList = (setLoading) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  const { toast } = useToast();
  useEffect(() => {
    setLoading && setLoading(true);
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
      })
      .finally(() => {
        setLoading && setLoading(false);
      });
  }, []);

  return { equipments };
};

export const Equipments: React.FC = () => {
  const role = useSelector((state) => state.role);
  const isAdmin = role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
  const { isLoading, Loading, setLoading } = useLoading();
  const [search, setSearch] = useState('');
  const { equipments } = useEquipmentList(setLoading);
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="toolbar flex gap-2">
            <Input
              label="搜索名称、设备号、实验室..."
              className="bg-slate-50"
              variant="bordered"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            {isAdmin && (
              <Button
                color="primary"
                style={{ height: '3.4rem' }}
                onClick={() => {
                  navigate('/equipment/add');
                }}
              >
                添加设备
              </Button>
            )}
          </div>

          <EquipmentList equipments={filteredEquipments} isAdmin={isAdmin} />
        </>
      )}
    </div>
  );
};
