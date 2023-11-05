import { EquipmentCard } from '../components/EquipmentCard';
import { Equipment, EquipmentStatus } from '../types';

const mockEquipments: Equipment[] = [
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
  {
    eqId: '#TPSJK-SDKFJ',
    name: '电子显微镜',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.BORROWED,
    labId: '302',
    info: '电子显微镜，用于观察微观结构、组织的一种显微镜。其原理是用电子束代替光束，用电磁透镜代替光学透镜，用荧光屏或摄影机代替目镜和目镜成像，从而使分辨率大大提高，达到亚微米甚至纳米级。电子显微镜的分辨率是光学显微镜的100倍以上，最高可达到0.1纳米。电子显微镜的放大倍数可达到100万倍以上，而光学显微镜的放大倍数最高只有2000倍左右。',
    priceInfo: '3000元/小时',
  },
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
  {
    eqId: '1',
    name: '器材1',
    imgUrl: 'https://picsum.photos/200/200',
    status: EquipmentStatus.AVAILABLE,
    labId: '1',
    info: '器材1的详细信息',
    priceInfo: '器材1的价格信息',
  },
];

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
