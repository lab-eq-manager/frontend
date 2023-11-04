import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { NavigationBar } from './components/NavigationBar';

import { PersonView } from './layouts/PresonView';
import { Approval } from './layouts/Approval';
import { Equipments } from './layouts/Equipments';

export const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NavigationBar />
      {/* App */}
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="/account" element={<PersonView />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/equipments" element={<Equipments />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
};
