import axios from 'axios';
import { Equipment } from '../types';

export interface LoginRequest {
  uid: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await axios.post('/api/login', data);
  return response.data;
};

export type GetEquipmentListResponse = Equipment[];

export const getEquipmentList = async (): Promise<GetEquipmentListResponse> => {
  const response = await axios.get('/api/equipment/list');
  return response.data;
};
