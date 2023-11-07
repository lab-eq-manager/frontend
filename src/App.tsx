import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { NavigationBar } from './components/NavigationBar';

import { PersonView } from './layouts/PresonView';
import { Approval } from './layouts/Approval';
import { Equipments } from './layouts/Equipments';
import { LoginForm } from './components/LoginForm';
import { ApplyView } from './layouts/ApplyView';

export const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NavigationBar />
      {/* App */}
      <div
        className="app-wrapper h-screen overflow-scroll bg-gradient-to-tr from-slate-50 to-gray-100"
        style={{ padding: '6rem 0px' }}
      >
        <div className="in w-full max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/account" element={<PersonView />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/apply/:eqId" element={<ApplyView />} />
          </Routes>
        </div>
      </div>
    </NextUIProvider>
  );
};
