import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Input,
  Chip,
  Select,
  SelectItem,
  Badge,
} from '@nextui-org/react';
import {
  AdminApprovalInfo,
  GetAdminApprovalListResponse,
  getAdminApprovalList,
  getLabList,
  getManageUserList,
} from '@/utils/requests';
import { useEquipmentList } from '@/layouts/Equipments';
import { useToast } from './ui/use-toast';
import { userRoleMap } from '@/types';
import { useSelector } from 'react-redux';
import { store } from '@/utils/store';

export default function ApprovalFilter(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const filterValue = useSelector((state) => state.filterValue);

  const { equipments } = useEquipmentList();
  const [labList, setLabList] = useState([]);
  const [usernameList, setUsernameList] = useState([]);
  const { toast } = useToast();

  const {
    eqName: eqNameFromStorage,
    labName: labNameFromStorage,
    day: dayFromStorage,
    month: monthFromStorage,
    year: yearFromStorage,
    isExpired: isExpiredFromStorage,
    applicantName: applicantNameFromStorage,
  } = JSON.parse(localStorage.getItem('fromFilter') || '{}');

  const [eqName, setEqName] = useState(eqNameFromStorage || '');
  const [labName, setLabName] = useState(labNameFromStorage || '');
  const [applicantName, setApplicantName] = useState(applicantNameFromStorage || '');
  const [year, setYear] = useState(yearFromStorage || '');
  const [month, setMonth] = useState(monthFromStorage || '');
  const [day, setDay] = useState(dayFromStorage || '');
  const [isExpired, setIsExpired] = useState(new Set(isExpiredFromStorage || []));

  const toFilterValue = () => {
    const filterVal = {};

    // From "eq123-name" to "name"
    const eqNameArr = eqName?.split('-')?.slice(1);
    const eqNameStr = eqNameArr?.join('-');
    eqName && (filterVal.eqName = eqNameStr);

    // From "lab123-name" to "name"
    const labNameArr = labName?.split('-')?.slice(1);
    const labNameStr = labNameArr?.join('-');
    labName && (filterVal.labName = labNameStr);

    // From "uid-username" to "username"
    applicantName && (filterVal.userName = applicantName.split('-')[1]);

    year &&
      month &&
      day &&
      (filterVal.applyDate = `${year}-${parseInt(month) < 10 ? '0' : ''}${month}-${
        parseInt(day) < 10 ? '0' : ''
      }${day}`);
    isExpired.size > 0 &&
      (filterVal.isExpire = Array.from(isExpired)[0] === 'sel-exp' ? 'true' : 'false');

    return filterVal;
  };

  const onConfirm = () => {
    const filterVal = toFilterValue();
    store.dispatch.filterValue.setFilterValue(filterVal);
    localStorage.setItem('page', '1');
    localStorage.setItem(
      'fromFilter',
      JSON.stringify({
        eqName,
        labName,
        applicantName,
        year,
        month,
        day,
        isExpired: Array.from(isExpired),
      }),
    );
    props.getData();
  };

  useEffect(() => {
    getLabList()
      .then((res) => {
        setLabList(res);
      })
      .catch((err) => {
        toast({
          title: '获取实验室列表失败',
          description: err.message,
          variant: 'destructive',
        });
      });
    getManageUserList()
      .then((res) => {
        setUsernameList(res);
      })
      .catch((err) => {
        toast({
          title: '获取用户列表失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  }, []);

  const onReset = () => {
    setEqName('');
    setLabName('');
    setApplicantName('');
    setYear('');
    setMonth('');
    setDay('');
    setIsExpired(new Set());
  };

  return (
    <>
      <Badge
        color="primary"
        variant="solid"
        size="sm"
        isDot
        content="已设置"
        isInvisible={
          filterValue.eqName === undefined &&
          filterValue.labName === undefined &&
          filterValue.userName === undefined &&
          filterValue.applyDate === undefined &&
          filterValue.isExpire === undefined
        }
      >
        <Button onPress={onOpen} color="primary" variant="flat">
          筛选
        </Button>
      </Badge>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">设置筛选项</ModalHeader>
              <ModalBody>
                <div className="flex gap-4 w-full flex-col">
                  <Autocomplete
                    label="设备名称"
                    variant="bordered"
                    selectedKey={eqName}
                    onSelectionChange={(key) => setEqName(key)}
                  >
                    {equipments.map((equipment, index) => (
                      <AutocompleteItem key={`eq${index}-${equipment.name}`} value={equipment.name}>
                        {equipment.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="实验室名称"
                    variant="bordered"
                    selectedKey={labName}
                    onSelectionChange={(key) => setLabName(key)}
                  >
                    {labList.map((lab, index) => (
                      <AutocompleteItem key={`lab${index}-${lab.name}`} value={lab.name}>
                        {lab.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="申请人"
                    variant="bordered"
                    selectedKey={applicantName}
                    onSelectionChange={(key) => setApplicantName(key)}
                  >
                    {usernameList.map((user) => (
                      <AutocompleteItem key={`${user.uid}-${user.name}`} textValue={user.name}>
                        <div className="flex gap-2 items-center">
                          <Chip color="primary" radius="sm">
                            {user.name}
                          </Chip>
                          <Chip radius="sm">{user.uid}</Chip>
                          <Chip radius="sm">{userRoleMap[user.role]}</Chip>
                        </div>
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <div className=" text-small text-gray-500 m-2 mt-0 mb-0">
                    双击输入框，光标闪烁时可以输入设备名称、实验室名称、申请人姓名进行搜索，选择后会自动填充
                  </div>
                  <div className="flex gap-4">
                    <Input
                      label="年"
                      type="number"
                      variant="bordered"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                    <Input
                      label="月"
                      type="number"
                      variant="bordered"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                    <Input
                      label="日"
                      type="number"
                      variant="bordered"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    />
                  </div>
                  <Select
                    label="时效"
                    variant="bordered"
                    selectedKeys={isExpired}
                    onSelectionChange={(key) => setIsExpired(key)}
                  >
                    <SelectItem key="sel-exp" value="true">
                      已过期
                    </SelectItem>
                    <SelectItem key="sel-no-exp" value="false">
                      未过期
                    </SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="danger" onPress={onReset}>
                  重置
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  确认
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
