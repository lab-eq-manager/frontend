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

export default function ApprovalFilter(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { equipments } = useEquipmentList();
  const [labList, setLabList] = useState([]);
  const [usernameList, setUsernameList] = useState([]);
  const { toast } = useToast();

  const [eqName, setEqName] = useState('');
  const [labName, setLabName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [isExpired, setIsExpired] = useState(new Set());

  const onConfirm = () => {
    const filterVal = {};
    eqName && (filterVal.eqName = eqName);
    labName && (filterVal.labName = labName);
    applicantName && (filterVal.userName = applicantName.split('-')[1]);
    year &&
      month &&
      day &&
      (filterVal.applyDate = `${year}-${parseInt(month) < 10 ? '0' : ''}${month}-${
        parseInt(day) < 10 ? '0' : ''
      }${day}`);
    isExpired.size > 0 &&
      (filterVal.isExpire = Array.from(isExpired)[0] === 'sel-exp' ? 'true' : 'false');
    localStorage.setItem('filterVal', JSON.stringify(filterVal));
    localStorage.setItem('page', '1');
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
      <Button onPress={onOpen} color="primary" variant="flat">
        筛选
      </Button>
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
                    {equipments.map((equipment) => (
                      <AutocompleteItem key={equipment.name} value={equipment.name}>
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
                    {labList.map((lab) => (
                      <AutocompleteItem key={lab.name} value={lab.name}>
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
