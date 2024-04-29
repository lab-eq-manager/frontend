import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { NavigationBar } from './components/NavigationBar';

import { PersonView } from './layouts/PresonView';
import { Approval } from './layouts/Approval';
import { Equipments } from './layouts/Equipments';

import { ApplyView } from './layouts/ApplyView';
import { EquipmentView } from './layouts/EquipmentView';
import { Toaster } from './components/ui/toaster';
import { LoginView } from './layouts/LoginView';
import { useSelector } from 'react-redux';
import { EditEquipmentView } from './layouts/EditEquipmentView';
import { AddEquipmentView } from './layouts/AddEquipmentView';
import { UserListView } from './layouts/UserListView';
import { EditUserInfoView } from './layouts/EditUserInfoView';
import { AddUserView } from './layouts/AddUserView';
import { LabListView } from './layouts/LabListView';
import { AddLabView } from './layouts/AddLabView';
import { AdminApprovalView } from './layouts/AdminApprovalView';
import { HistoryView } from './layouts/HistoryView';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.uid);
  const role = useSelector((state) => state.role);

  return (
    <NextUIProvider navigate={navigate}>
      <NavigationBar uid={uid} role={role} />
      <Toaster />
      {/* App */}
      <div
        className="app-wrapper min-h-screen overflow-scroll bg-gradient-to-tr from-slate-50 to-gray-100"
        style={{ padding: '6rem 0px' }}
      >
        <div className="in w-full max-w-4xl mx-auto">
          {uid ? (
            <Routes>
              <Route path="/account" element={<PersonView />} />
              <Route path="/approval" element={<Approval />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/apply/:eqId" element={<ApplyView />} />
              <Route path="/detail/:eqId" element={<EquipmentView />} />
              <Route path="/equipment/edit/:eqId" element={<EditEquipmentView />} />
              <Route path="/equipment/add" element={<AddEquipmentView />} />
              <Route path="/manage/user" element={<UserListView />} />
              <Route path="/manage/user/add" element={<AddUserView />} />
              <Route path="/manage/user/edit/:uid" element={<EditUserInfoView />} />
              <Route path="/manage/lab" element={<LabListView />} />
              <Route path="/manage/lab/add" element={<AddLabView />} />
              <Route path="/manage/lab/edit/:labId" element={<EditUserInfoView />} />
              <Route path="/manage/approval" element={<AdminApprovalView />} />
              <Route path="/manage/history-approval/:eqId" element={<HistoryView />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </div>
      </div>
      <div className="footer flex gap-8 items-center justify-center bg-primary p-20">
        <img
          src="logo.png"
          className="h-10 cursor-pointer"
          draggable={false}
          onClick={() => {
            window.open('https://qy.ustb.edu.cn/index.htm', '_blank');
          }}
        />
        <div className="qr-wrapper flex flex-col items-center justify-center gap-3">
          <img src="qr2.png" className="h-20" />
          <p className=" text-xs text-cyan-50">北京科技大学</p>
        </div>
        <div className="qr-wrapper flex flex-col items-center justify-center gap-3">
          <img src="qr1.jpg" className="h-20" />
          <p className=" text-xs text-cyan-50">北科大前沿院</p>
        </div>
      </div>
    </NextUIProvider>
  );
};
