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
