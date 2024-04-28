import ApprovalFilter from '@/components/ApprovalFilter';
import { ApprovalTable } from '@/components/ApprovalTable';
import MiniTable from '@/components/MiniTable';
import { useToast } from '@/components/ui/use-toast';
import {
  AdminApprovalInfo,
  GetAdminApprovalListResponse,
  getAdminApprovalList,
  getLabList,
  getManageUserList,
} from '@/utils/requests';
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';

export const AdminApprovalView: React.FC = () => {
  const pageFromStorage = localStorage.getItem('page');
  const initPage = pageFromStorage ? parseInt(pageFromStorage) : 1;

  const [eqData, setEqData] = useState();
  const [page, setPage] = useState(initPage);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const { toast } = useToast();
  const [selectedData, setSelectedData] = useState<AdminApprovalInfo[]>([]);

  const getData = () => {
    const pageFromStorageG = localStorage.getItem('page');
    const initPageG = pageFromStorageG ? parseInt(pageFromStorageG) : 1;
    console.log('==getData', pageFromStorageG, initPageG);
    const filterVal = JSON.parse(localStorage.getItem('filterVal') || '{}');
    console.log('==filterVal', filterVal);
    getAdminApprovalList({ pageNo: initPageG, pageSize: pageSize, ...filterVal })
      .then((res: GetAdminApprovalListResponse) => {
        setEqData(res.applies);
        setPageTotal(res.length);
        if (res.length < page) {
          localStorage.setItem('page', res.length.toString());
        }
      })
      .catch((err) => {
        if (err.error_code === 40000) {
          toast({
            title: '获取申请列表失败',
            description: '选择的这一页没有数据',
            variant: 'destructive',
          });
        } else {
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
          <ApprovalTable
            eqData={eqData}
            canCustomColumn
            getData={getData}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            children={
              <ApprovalFilter
                getData={() => {
                  setSelectedData([]);
                  setPage(1);
                  getData();
                }}
              />
            }
          />
        ) : (
          <div className="text-gray-400">暂无待处理申请</div>
        )}

        <div className="buttom flex justify-between w-full">
          <div>当前选中 {selectedData.length} 条</div>
          <div className="flex gap-2">
            <MiniTable
              data={selectedData}
              label="一键拒绝"
              type="danger"
              onConfirm={() => {}}
              disabled={selectedData.length === 0}
            />
            <MiniTable
              data={selectedData}
              label="一键批准"
              type="primary"
              onConfirm={() => {}}
              disabled={selectedData.length === 0}
            />
          </div>
        </div>

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
