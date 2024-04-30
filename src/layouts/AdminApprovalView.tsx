import ApprovalFilter from '@/components/ApprovalFilter';
import { ApprovalTable } from '@/components/ApprovalTable';
import MiniTable from '@/components/MiniTable';
import { useToast } from '@/components/ui/use-toast';
import {
  AdminApprovalInfo,
  GetAdminApprovalListResponse,
  batchApprove,
  batchDeny,
  getAdminApprovalList,
  getLabList,
  getManageUserList,
} from '@/utils/requests';
import { useLoading } from '@/utils/useLoading';
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
import { useSelector } from 'react-redux';

export const AdminApprovalView: React.FC = () => {
  const pageFromStorage = localStorage.getItem('page');
  const initPage = pageFromStorage ? parseInt(pageFromStorage) : 1;

  const { isLoading, Loading, setLoading } = useLoading();

  const [eqData, setEqData] = useState();
  const [page, setPage] = useState(initPage);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const { toast } = useToast();
  const [selectedData, setSelectedData] = useState<AdminApprovalInfo[]>([]);
  const filterVal = useSelector((state) => state.filterValue);

  const getData = (noLoading?: boolean) => {
    !noLoading && setLoading(true);
    const pageFromStorageG = localStorage.getItem('page');
    const initPageG = pageFromStorageG ? parseInt(pageFromStorageG) : 1;
    console.log('==getData', pageFromStorageG, initPageG);

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
        setEqData([]);
        if (err.error_code === 40000) {
          console.log('==err', err);
        } else {
          toast({
            title: '获取申请列表失败',
            description: err.message,
            variant: 'destructive',
          });
        }
      })
      .finally(() => {
        !noLoading && setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [pageSize, filterVal]);

  useEffect(() => {
    getData(true);
  }, [page]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">待处理申请</div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center gap-3">
          {eqData ? (
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
                    // getData();
                    // 创建事件
                    window.dispatchEvent(new Event('reselect'));
                  }}
                />
              }
            />
          ) : (
            <div className="text-gray-400 flex w-full items-center justify-center flex-col gap-10">
              <ApprovalFilter
                getData={() => {
                  setSelectedData([]);
                  setPage(1);
                  getData();
                  // 创建事件
                  window.dispatchEvent(new Event('reselect'));
                }}
              />
              暂无待处理申请
            </div>
          )}

          <div className="buttom flex justify-between w-full">
            <div>当前选中 {selectedData.length} 条</div>
            <div className="flex gap-2">
              <MiniTable
                data={selectedData}
                label="一键拒绝"
                type="danger"
                onConfirm={(applyIds: number[]) => {
                  batchDeny({ applyIds })
                    .then(() => {
                      setSelectedData([]);
                      getData();
                      toast({
                        title: '操作成功',
                        description: '已成功拒绝选中的申请',
                        variant: 'success',
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: '操作失败',
                        description: err.message,
                        variant: 'destructive',
                      });
                    });
                }}
                disabled={selectedData.length === 0}
              />
              <MiniTable
                data={selectedData}
                label="一键批准"
                type="primary"
                onConfirm={(applyIds: number[]) => {
                  batchApprove({ applyIds })
                    .then(() => {
                      setSelectedData([]);
                      getData();
                      toast({
                        title: '操作成功',
                        description: '已成功批准选中的申请',
                        variant: 'success',
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: '操作失败',
                        description: err.message,
                        variant: 'destructive',
                      });
                    });
                }}
                disabled={selectedData.length === 0}
              />
            </div>
          </div>

          {eqData && eqData?.length >= 0 && (
            <Pagination
              page={page}
              total={pageTotal}
              onChange={(page: number) => {
                setPage(page);
                localStorage.setItem('page', page.toString());
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
