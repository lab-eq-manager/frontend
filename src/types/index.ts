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

export enum ApplyStatus {
  APPLYING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export const applyStatusMap = {
  [ApplyStatus.APPLYING]: '申请中',
  [ApplyStatus.APPROVED]: '通过',
  [ApplyStatus.REJECTED]: '拒绝',
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
  'please select',
  '0:00-1:00',
  '1:00-2:00',
  '2:00-3:00',
  '3:00-4:00',
  '4:00-5:00',
  '5:00-6:00',
  '6:00-7:00',
  '7:00-8:00',
  '8:00-9:00',
  '9:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
  '22:00-23:00',
  '23:00-24:00',
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
