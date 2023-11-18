import axios from 'axios';
import { Equipment, EquipmentStatus, UserRole } from '../types';

axios.defaults.withCredentials = true;

export interface UniversalResponse<T> {
  error_code: number;
  message: string;
  data: T;
}

export interface LoginRequest {
  uid: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await axios.post('/api/login', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export interface UpdateUserRequest {
  uid: string;
  name: string;
  leader: string;
  phoneNumber: string;
  role?: number;
  password?: string;
}

export const updateUser = async (data: UpdateUserRequest) => {
  const response = await axios.post('/api/user/update', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export interface getUserInfoRequest {
  uid: string;
}

export interface getUserInfoResponse {
  uid: string;
  name: string;
  leader: string;
  phoneNum: string;
  role: UserRole;
}

export const getUserInfo = async (data: getUserInfoRequest) => {
  const response = await axios.post('/api/user/info', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export interface UpdateUerPasswordRequest {
  uid: string;
  oldPassword: string;
  newPassword: string;
}

export const updateUserPassword = async (data: UpdateUerPasswordRequest) => {
  const response = await axios.post('/api/user/password/update', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export interface UpdateEquipmentRequest {
  eqId: string;
  labId: string;
  name: string;
  info: string;
  priceInfo: string;
  imgUrl: string;
  status: EquipmentStatus;
}

export const addEquipment = async (data: UpdateEquipmentRequest) => {
  const response = await axios.post('/api/manage/equipment/add', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export const updateEquipment = async (data: UpdateEquipmentRequest) => {
  const response = await axios.post('/api/manage/equipment/update', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data;
};

export type GetEquipmentListResponse = Equipment[];

export const getEquipmentList = async (): Promise<GetEquipmentListResponse> => {
  const response = await axios.get('/api/equipment/list');
  return response.data.data;
};

export interface GetEquipmentDetailRequest {
  eqId: string;
}

export const getEquipmentDetail = async (data: GetEquipmentDetailRequest) => {
  const response = await axios.post('/api/equipment/info', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data.data;
};

export interface ApplyEquipmentRequest {
  uid: string;
  eqId: string;
  applyDate: string;
  timeIndex: number;
  applyReason: string;
}

export const applyEquipment = async (data: ApplyEquipmentRequest) => {
  const response = await axios.post('/api/apply/create', data).catch((error) => {
    throw error.response.data;
  });
  if (response?.data?.error_code) {
    throw response.data;
  }
  return response.data.data;
};

export const logout = async () => {
  const response = await axios.get('/api/user/logout').catch((error) => {
    throw error.response.data;
  });
  return response.data;
};
