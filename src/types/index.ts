export enum EquipmentStatus {
  AVAILABLE = 0,
  APPLYING = 1,
  BORROWED = 2,
  TEACHER_USING = 3,
  REPAIRING = 4,
  TO_BORKEN = 5,
  BROKEN = 6,
}

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
  SUPER_ADMIN = 0,
  ADMIN = 1,
  STUDENT = 2,
  OUTSIDER = 3,
}

export const userRoleMap = {
  [UserRole.SUPER_ADMIN]: '超级管理员',
  [UserRole.ADMIN]: '管理员',
  [UserRole.STUDENT]: '学生',
  [UserRole.OUTSIDER]: '外来人员',
};
