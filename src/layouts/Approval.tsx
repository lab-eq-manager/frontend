import { ApplyTable } from '@/components/ApplyTable';
import { mockApplyEquipmentRequests } from '@/utils/mockData';

export const Approval = () => {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">申请列表</div>
      <div className="w-full">
        <ApplyTable eqData={mockApplyEquipmentRequests} canCustomColumn />
      </div>
    </div>
  );
};
