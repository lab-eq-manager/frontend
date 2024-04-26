import { ApprovalTable } from '@/components/ApprovalTable';
import { useToast } from '@/components/ui/use-toast';
import { GetAdminApprovalListResponse, getAdminApprovalList } from '@/utils/requests';
import { Pagination, PaginationItem, PaginationCursor } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export const AdminApprovalView: React.FC = () => {
  const pageFromStorage = localStorage.getItem('page');
  const initPage = pageFromStorage ? parseInt(pageFromStorage) : 1;

  const [eqData, setEqData] = useState();
  const [page, setPage] = useState(initPage);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const { toast } = useToast();

  const getData = () => {
    const pageFromStorageG = localStorage.getItem('page');
    const initPageG = pageFromStorageG ? parseInt(pageFromStorageG) : 1;
    console.log('==getData', pageFromStorageG, initPageG);
    getAdminApprovalList({ pageNo: initPageG, pageSize: pageSize })
      .then((res: GetAdminApprovalListResponse) => {
        setEqData(res.applies);
        setPageTotal(res.length);
        if (res.length < page) {
          localStorage.setItem('page', res.length.toString());
        }
      })
      .catch((err) => {
        if (err.error_code !== 40000) {
          toast({
            title: '获取申请列表失败',
            description: err.message,
            variant: 'destructive',
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">待处理申请</div>
      <div className="w-full flex flex-col items-center gap-3">
        {eqData && eqData?.length !== 0 ? (
          <ApprovalTable eqData={eqData} canCustomColumn getData={getData} />
        ) : (
          <div className="text-gray-400">暂无待处理申请</div>
        )}
        <Pagination
          page={page}
          total={pageTotal}
          onChange={(page: number) => {
            setPage(page);
            localStorage.setItem('page', page.toString());
          }}
        />
      </div>
    </div>
  );
};
