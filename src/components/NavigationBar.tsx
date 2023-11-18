import React, { useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Chip, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { UserRole, userRoleMap } from '@/types';

export interface NavagationBarProps {
  uid?: string;
  role: UserRole;
}

export const NavigationBar: React.FC<NavagationBarProps> = (props) => {
  const { uid, role } = props;

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
              <Link to="/account">
                <Chip color="primary">
                  {userRoleMap[role]} {uid}
                </Chip>
              </Link>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Link to="/login">
              <Button>登录</Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
