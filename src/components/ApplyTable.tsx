import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Chip,
} from '@nextui-org/react';
import { mockApplyEquipmentRequests } from '@/utils/mockData';
import { availableTime } from '@/types';
import { VerticalDotsIcon } from '@/assets/VerticalDotsIcon';

const tabelHeaders = [
  '申请人',
  '申请器材',
  '使用日期',
  '使用时段',
  '申请时间',
  '状态',
  '操作',
] as const;

export const ApplyTable = () => {
  return (
    <div className="wrapper">
      <div className="toolbar"></div>
      <Table>
        <TableHeader>
          <TableColumn>申请人</TableColumn>
          <TableColumn>申请器材</TableColumn>
          <TableColumn>使用日期</TableColumn>
          <TableColumn>使用时段</TableColumn>
          <TableColumn>申请时间</TableColumn>
          <TableColumn>状态</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {mockApplyEquipmentRequests.map((request) => {
            return (
              <TableRow key={request.uid + request.eqId + request.applyDate + request.applyTime}>
                <TableCell>{request.uid}</TableCell>
                <TableCell>
                  <Chip color="secondary">{request.eqId}</Chip>
                </TableCell>
                <TableCell>{request.applyDate}</TableCell>
                <TableCell>{availableTime[parseInt(request.timeIndex)]}</TableCell>
                <TableCell>{request.applyTime}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <VerticalDotsIcon size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="view">查看</DropdownItem>
                      <DropdownItem key="approve" color="success" className="text-success">
                        通过
                      </DropdownItem>
                      <DropdownItem key="reject" color="danger" className=" text-danger">
                        驳回
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
