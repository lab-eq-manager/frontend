import { UserTable } from '@/components/UserTable';
import { getManageUserList } from '@/utils/requests';
import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/utils/useLoading';

export const UserListView = () => {
  const [tableData, setTableData] = useState();
  const navigate = useNavigate();
  const { isLoading, Loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    getManageUserList()
      .then((res) => {
        setTableData(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">用户管理</div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full">
          {tableData && tableData?.length !== 0 ? (
            <UserTable tableData={tableData} canCustomColumn />
          ) : (
            <Button
              color="primary"
              onClick={() => {
                navigate(`/manage/user/add`);
              }}
            >
              添加用户
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
