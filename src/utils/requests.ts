import axios from 'axios';
import { Equipment, UserRole } from '../types';

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

export type GetEquipmentListResponse = Equipment[];

export const getEquipmentList = async (): Promise<GetEquipmentListResponse> => {
  const response = await axios.get('/api/equipment/list');
  return response.data;
};

export interface updateUserRequest {
  uid: string;
  name: string;
  password: string;
  leader: string;
  phoneNum: string;
}

export const updateUser = async (data: updateUserRequest) => {
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
