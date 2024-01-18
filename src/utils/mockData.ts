import { Equipment, EquipmentStatus, ApplyEquipmentRequest } from '../types';
import { TimeIndexDetail } from './requests';

export const mockEquipments: Equipment[] = [
  {
    eqId: '20153300',
    name: '原子力显微镜',
    imgUrl: '/eq.png',
    status: EquipmentStatus.AVAILABLE,
    labId: '301',
    info: '\n \n设备负责人：赵航\nAFM可以对样品表面形态、纳米结构、链构象等方面进行研究，获得纳米颗粒尺寸，孔径，材料表面粗糙度，材料表面缺陷等信息;作为轻敲模式的一项重要的扩展技术，相位模式是通过检测驱动微悬臂探针振动的信号源的相位角与微悬臂探针实际振动的相位角之差（即两者的相移）的变化来成像。',
    priceInfo: '146.6万元',
  },
  {
    eqId: 'DZXWJ1002304',
    name: '电子显微镜 (开发测试用数据)',
    imgUrl: undefined,
    status: EquipmentStatus.TEACHER_USING,
    labId: '302',
    info: '电子显微镜，用于观察微观结构、组织的一种显微镜。\n-\n其原理是用电子束代替光束，用电磁透镜代替光学透镜，用荧光屏或摄影机代替目镜和目镜成像，从而使分辨率大大提高，达到亚微米甚至纳米级。电子显微镜的分辨率是光学显微镜的100倍以上，最高可达到0.1纳米。电子显微镜的放大倍数可达到100万倍以上，而光学显微镜的放大倍数最高只有2000倍左右。',
    priceInfo: '3000元/小时',
  },
];

export const mockApplyEquipmentRequests: ApplyEquipmentRequest[] = [
  {
    uid: '42024200',
    eqId: '#TPSJK-SDKFJ',
    applyDate: '2023-11-01',
    timeIndex: 8,
    applyReason: '实验使用',
    status: EquipmentStatus.APPLYING,
    applyTime: '2023-11-01 08:00:00',
  },
  {
    uid: '42024202',
    eqId: '#TPSJK-SDKFJ',
    applyDate: '2023-11-01',
    timeIndex: 9,
    applyReason: '实验使用',
    status: EquipmentStatus.APPLYING,
    applyTime: '2023-11-01 21:03:00',
  },
];

export const mockTimeIndex: TimeIndexDetail[] = [
  { timeIndex: 11, uid: '41114222', name: '张三' },
  { timeIndex: 12, uid: '41114222', name: '张三' },
  { timeIndex: 13, uid: '', name: '' },
  { timeIndex: 14, uid: '', name: '' },
  { timeIndex: 15, uid: '', name: '' },
  { timeIndex: 16, uid: '41114333', name: '李四' },
  { timeIndex: 17, uid: '41114333', name: '李四' },
];
