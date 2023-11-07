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

interface EquipmentCardProps {
  equipment: Equipment;
  showButton: boolean;
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
export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, showButton = true }) => {
  return (
    <Card
      className="w-full max-w-3xl bg-background/60 dark:bg-default-100/50"
      isFooterBlurred
      isBlurred
    >
      <CardBody className="flex flex-row items-start gap-6 p-6">
        <div
          className="image-wrapper"
          style={{
            width: 200,
            flexShrink: 0,
          }}
        >
          <Image src={equipment.imgUrl} width={200} height={300} isZoomed />
        </div>
        <div className="texts-wrapper flex-grow gap-2 flex flex-col">
          <div className="title text-xl">{equipment.name}</div>
          <Divider />
          <div className="flex flex-row gap-2 item-center font-medium">
            <Chip color={statusIdtoColor[equipment.status]} variant="solid">
              {statusIdtoText[equipment.status]}
            </Chip>
            <Chip variant="flat">设备号 {equipment.eqId}</Chip>
            <Chip variant="flat">所属实验室 {equipment.labId}</Chip>
          </div>
          <div className="text-sm text-gray-600 p-1">{equipment.info}</div>
          <div className="text-sm text-gray-600 p-1">{equipment.priceInfo}</div>
        </div>
      </CardBody>
      {showButton && (
        <CardFooter className="flex flex-row justify-end gap-2 px-4 bg-background/60">
          <Button variant="flat">查看详情</Button>
          <Button
            color="primary"
            onClick={() => {
              // change route to /apply/:eqId
              window.location.href = `/apply/${encodeURIComponent(equipment.eqId)}`;
            }}
          >
            申请使用
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
