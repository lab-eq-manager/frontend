export enum EquipmentStatus {
  AVAILABLE = 1,
  APPLYING = 2,
  BORROWED = 3,
  TEACHER_USING = 4,
  REPAIRING = 5,
  TO_BORKEN = 6,
  BROKEN = 7,
}

export const equipmentStatusMap = {
  [EquipmentStatus.AVAILABLE]: '可用',
  [EquipmentStatus.APPLYING]: '申请中',
  [EquipmentStatus.BORROWED]: '已借出',
  [EquipmentStatus.TEACHER_USING]: '教学使用中',
  [EquipmentStatus.REPAIRING]: '维修中',
  [EquipmentStatus.TO_BORKEN]: '待报废',
  [EquipmentStatus.BROKEN]: '已报废',
};

export interface Equipment {
  eqId: string;
  name: string;
  labId: string;
  info: string;
  priceInfo: string;
  imgUrl: string;
  status: EquipmentStatus;
}

export interface ApplyEquipmentRequest {
  uid: string;
  eqId: string;
  applyDate: string;
  timeIndex: number;
  applyTime: string;
  status: EquipmentStatus;
  applyReason: string;
}

export const availableTime = [
  '0:00-2:00',
  '2:00-4:00',
  '4:00-6:00',
  '6:00-8:00',
  '8:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
  '22:00-24:00',
];

export enum UserRole {
  UNKONWN_USER = 0,
  SUPER_ADMIN = 1,
  ADMIN = 2,
  STUDENT = 3,
  OUTSIDER = 4,
}

export const userRoleMap = {
  [UserRole.UNKONWN_USER]: '未知用户',
  [UserRole.SUPER_ADMIN]: '超级管理员',
  [UserRole.ADMIN]: '管理员',
  [UserRole.STUDENT]: '学生',
  [UserRole.OUTSIDER]: '外来人员',
};
