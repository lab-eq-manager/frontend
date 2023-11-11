import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { NavigationBar } from './components/NavigationBar';

import { PersonView } from './layouts/PresonView';
import { Approval } from './layouts/Approval';
import { Equipments } from './layouts/Equipments';

import { ApplyView } from './layouts/ApplyView';
import { EquipmentView } from './layouts/EquipmentView';
import { Toaster } from './components/ui/toaster';
import { LoginView } from './layouts/LoginView';

export const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NavigationBar />
      <Toaster />
      {/* App */}
      <div
        className="app-wrapper h-screen overflow-scroll bg-gradient-to-tr from-slate-50 to-gray-100"
        style={{ padding: '6rem 0px' }}
      >
        <div className="in w-full max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/home" element={<LoginView />} />
            <Route path="/account" element={<PersonView />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/apply/:eqId" element={<ApplyView />} />
            <Route path="/detail/:eqId" element={<EquipmentView />} />
          </Routes>
        </div>
      </div>
    </NextUIProvider>
  );
};
