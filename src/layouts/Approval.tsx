import { Card } from '@nextui-org/react';
import { ApplyTable } from '@/components/ApplyTable';

export const Approval = () => {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">申请列表</div>
      <Card className="w-full">
        <ApplyTable />
      </Card>
    </div>
  );
};
