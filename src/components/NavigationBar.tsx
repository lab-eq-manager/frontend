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
    <Navbar position="static" className="select-none fixed bg-primary/10">
      <NavbarContent className="">
        <NavbarBrand className=" text-xl font-semibold flex gap-2">
          <img
            src="logo.png"
            style={{ filter: 'invert(100%)' }}
            className=" h-8 cursor-pointer"
            draggable={false}
            onClick={() => {
              window.open('https://qy.ustb.edu.cn/index.htm', '_blank');
            }}
          />
          <p>仪器设备预约系统</p>
        </NavbarBrand>
        {uid ? (
          <>
            <NavbarItem>
              <Link to="/equipments">器材列表</Link>
            </NavbarItem>
            {role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN ? (
              <NavbarItem>
                <Link to="/approval">我的申请</Link>
              </NavbarItem>
            ) : (
              <>
                <NavbarItem>
                  <Link to="/manage/user">用户管理</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/manage/approval">待处理申请</Link>
                </NavbarItem>
                {role === UserRole.SUPER_ADMIN && (
                  <NavbarItem>
                    <Link to="/manage/lab">实验室管理</Link>
                  </NavbarItem>
                )}
              </>
            )}
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
