import React, { useEffect } from 'react';
import { LabTable } from '@/components/LabTable';
import { getLabList } from '@/utils/requests';
import { useToast } from '@/components/ui/use-toast';

import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const LabListView: React.FC = () => {
  const [tableData, setTableData] = React.useState();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getData = () => {
    getLabList()
      .then((res) => {
        setTableData(res);
      })
      .catch((err) => {
        toast({
          title: '获取实验室列表失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="lab-list-wrapper flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">实验室列表</div>
      {tableData && tableData?.length !== 0 ? (
        <LabTable tableData={tableData} canCustomColumn getData={() => getData()} />
      ) : (
        <Button
          color="primary"
          onClick={() => {
            navigate(`/manage/lab/add`);
          }}
        >
          添加实验室
        </Button>
      )}
    </div>
  );
};
