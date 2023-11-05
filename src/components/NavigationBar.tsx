import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const NavigationBar: React.FC = () => {
  return (
    <Navbar position="static" className="select-none">
      <NavbarContent className="">
        <NavbarBrand className=" text-xl font-semibold">实验器材预约系统</NavbarBrand>
        <NavbarItem>
          <Link to="/">首页</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/equipments">器材列表</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/approval">申请列表</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/account">个人中心</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
