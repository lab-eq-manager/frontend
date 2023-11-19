import { UserTable } from '@/components/UserTable';
import { getManageUserList } from '@/utils/requests';
import { useEffect, useState } from 'react';

export const UserListView = () => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    getManageUserList()
      .then((res) => {
        setTableData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">用户管理</div>
      <div className="w-full">
        {tableData && tableData?.length !== 0 && (
          <UserTable tableData={tableData} canCustomColumn />
        )}
      </div>
    </div>
  );
};
