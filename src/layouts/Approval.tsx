import { ApplyTable } from '@/components/ApplyTable';
import { mockApplyEquipmentRequests } from '@/utils/mockData';
import { getUserApplyList } from '@/utils/requests';
import { useEffect, useState } from 'react';

export const Approval = () => {
  const [eqData, setEqData] = useState();
  useEffect(() => {
    getUserApplyList()
      .then((res) => {
        console.log('apply', res);
        setEqData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">我的申请</div>
      <div className="w-full">
        {eqData && eqData?.length !== 0 && <ApplyTable eqData={eqData} />}
      </div>
    </div>
  );
};
