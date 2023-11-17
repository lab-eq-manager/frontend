import React, { useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export interface NavagationBarProps {
  uid?: string;
}

export const NavigationBar: React.FC<NavagationBarProps> = (props) => {
  const { uid } = props;

  return (
    <Navbar position="static" className="select-none fixed">
      <NavbarContent className="">
        <NavbarBrand className=" text-xl font-semibold">实验器材预约系统</NavbarBrand>
        {uid ? (
          <>
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
              <Link to="/account">用户：{uid}</Link>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Link to="/login">登录</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
