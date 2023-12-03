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

export interface UserApplyListResponse {
  eqId: string;
  applyDate: string;
  timeIndex: number;
  applyTime: string;
  status: EquipmentStatus;
  applyReason: string;
}
[];

export const getUserApplyList = async () => {
  const response = await axios.get('/api/apply/list').catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface QueryAvailableTimeRequest {
  eqId: string;
  applyDate: string;
}

export interface QueryAvailableTimeResponse {
  timeIndex: number[];
}

export const queryAvailableTime = async (data: QueryAvailableTimeRequest) => {
  const response = await axios.post('/api/equipment/query', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface ManageUserList {
  uid: string;
  name: string;
  leader: string;
  phoneNum: string;
  role: UserRole;
  lab?: string[];
}

export type GetManageUserListResponse = ManageUserList[];

export const getManageUserList = async () => {
  const response = await axios.get('/api/manage/user/list').catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface ResetUserPasswordRequest {
  uid: string;
}

export const resetUserPassword = async (data: ResetUserPasswordRequest) => {
  const response = await axios.post('/api/manage/user/password/reset', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface UserInfoChangeByAdminReq {
  uid: string;
  name?: string;
  leader?: string;
  phoneNum?: string;
  role?: UserRole;
  lab?: string[];
}

export const userInfoChangeByAdmin = async (data: UserInfoChangeByAdminReq) => {
  const response = await axios.post('/api/manage/user/update', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export const addUserByAdmin = async (data: UserInfoChangeByAdminReq) => {
  const response = await axios.post('/api/manage/user/create', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface GetLabListInfo {
  labId: string;
  name: string;
}

export type GetLabListResponse = GetLabListInfo[];

export const getLabList = async () => {
  const response = await axios.get('/api/lab/list').catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface UpdateLabInfoRequest {
  labId: string;
  name: string;
}

export const updateLabInfo = async (data: UpdateLabInfoRequest) => {
  const response = await axios.post('/api/manage/lab/update', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export const addLab = async (data: UpdateLabInfoRequest) => {
  const response = await axios.post('/api/manage/lab/create', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export const deleteLab = async (data: { labId: string }) => {
  const response = await axios.post('/api/manage/lab/delete', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface GetAdminApprovalListRequest {
  pageNo: number;
  pageSize: number;
  lab?: string[];
  status?: EquipmentStatus[];
}

export interface AdminApprovalInfo {
  applyId: string;
  eqId: string;
  labId: string;
  uid: string;
  applyTime: string;
  applyDate: string;
  approvalTime: string;
  applyReason: string;
  timeIndex: number;
  status: EquipmentStatus;
}

export interface GetAdminApprovalListResponse {
  applies: AdminApprovalInfo[];
  length: number;
}

export const getAdminApprovalList = async (data: GetAdminApprovalListRequest) => {
  const response = await axios.post('/api/manage/approve/list', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface AdminApprovalRequest {
  applyId: string;
}

export const adminApproval = async (data: AdminApprovalRequest) => {
  const response = await axios.post('/api/manage/apply/approve', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface AdminRejectRequest {
  applyId: string;
}

export const adminReject = async (data: AdminRejectRequest) => {
  const response = await axios.post('/api/manage/apply/deny', data).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export interface UploadFileRequest {
  file: File;
}

export interface UploadFileResponse {
  imgUrl: string;
}

export const uploadFile = async (data: UploadFileRequest) => {
  const formData = new FormData();
  formData.append('file', data.file);
  const response = await axios.post('/file-api/upload', formData).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};

export const getExcel = async () => {
  const response = await axios.get('/api/manage/log/list').catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
};
