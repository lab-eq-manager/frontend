import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  CardFooter,
  Chip,
  Button,
} from '@nextui-org/react';

import { Equipment, EquipmentStatus } from '../types';
import { useNavigate } from 'react-router-dom';
import { getExcel } from '@/utils/requests';
import { toast, useToast } from './ui/use-toast';

interface EquipmentCardProps {
  equipment: Equipment;
  showButton: boolean;
  showManageButton: boolean;
  fullView?: boolean;
}

const statusIdtoText: Record<EquipmentStatus, string> = {
  [EquipmentStatus.AVAILABLE]: '可用',
  [EquipmentStatus.APPLYING]: '申请中',
  [EquipmentStatus.BORROWED]: '已借出',
  [EquipmentStatus.TEACHER_USING]: '教学使用中',
  [EquipmentStatus.REPAIRING]: '维修中',
  [EquipmentStatus.TO_BORKEN]: '待报废',
  [EquipmentStatus.BROKEN]: '已报废',
};

const statusIdtoColor: Record<EquipmentStatus, string> = {
  [EquipmentStatus.AVAILABLE]: 'success',
  [EquipmentStatus.APPLYING]: 'warning',
  [EquipmentStatus.BORROWED]: 'warning',
  [EquipmentStatus.TEACHER_USING]: 'warning',
  [EquipmentStatus.REPAIRING]: 'warning',
  [EquipmentStatus.TO_BORKEN]: 'warning',
  [EquipmentStatus.BROKEN]: 'danger',
};

/**
 * 横向布局的器材卡片
 * @param equipment
 * @returns EquipmentCard
 */
export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  showButton = true,
  showManageButton = false,
  fullView,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full  bg-background/60 dark:bg-default-100/50" isFooterBlurred isBlurred>
      <CardBody
        className={`flex items-start gap-6 p-6 ${fullView && 'gap-10 p-10'}`}
        style={{ flexDirection: fullView ? 'column' : 'row' }}
      >
        <div
          className="image-wrapper"
          style={{
            width: 200,
            flexShrink: 0,
          }}
        >
          <Image src={equipment.imgUrl || '/none.png'} width={200} height={300} isZoomed />
        </div>
        <div className="texts-wrapper flex-grow gap-2 flex flex-col">
          <div className="title text-xl">{equipment.name}</div>
          <Divider />
          <div className="flex flex-row gap-2 item-center font-medium">
            <Chip color={statusIdtoColor[equipment.status]} variant="solid">
              {statusIdtoText[equipment.status]}
            </Chip>
            <Chip variant="flat">
              <span className=" text-gray-600">设备号</span> {equipment.eqId}
            </Chip>
            <Chip variant="flat">
              <span className=" text-gray-600">所属实验室</span> {equipment.labId}
            </Chip>
          </div>
          <div className="text-sm text-gray-600 p-1">
            {equipment.info.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <div className="text-sm text-gray-600 p-1">{equipment.priceInfo}</div>
        </div>
      </CardBody>
      {showButton && (
        <CardFooter className="flex flex-row justify-end gap-2 px-4 bg-background/60">
          <Button
            variant="flat"
            onClick={() => {
              navigate(`/detail/${encodeURIComponent(equipment.eqId)}`);
            }}
          >
            查看详情
          </Button>
          {showManageButton && (
            <>
              <Button
                color="primary"
                variant="flat"
                onClick={() => {
                  getExcel({ eqId: equipment.eqId })
                    .then((res) => {
                      if (res?.data) {
                        window.open(res?.data?.fileUrl, '_blank');
                        toast({
                          title: '导出成功',
                        });
                      }
                    })
                    .catch((err) => {
                      toast({
                        title: '导出失败',
                        description: err.message,
                        variant: 'destructive',
                      });
                    });
                }}
              >
                导出此设备 Excel
              </Button>
              <Button
                onClick={() => {
                  navigate(`/manage/history-approval/${encodeURIComponent(equipment.eqId)}`);
                }}
              >
                查询审批记录
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  navigate(`/equipment/edit/${encodeURIComponent(equipment.eqId)}`);
                }}
              >
                编辑设备信息
              </Button>
            </>
          )}

          {!showManageButton && (
            <Button
              color="primary"
              isDisabled={equipment.status !== EquipmentStatus.AVAILABLE}
              onClick={() => {
                navigate(`/apply/${encodeURIComponent(equipment.eqId)}`);
              }}
            >
              申请使用
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
