import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { AdminApprovalInfo } from '@/utils/requests';
import { mergeTimeIndex } from '@/utils/mergeTimeIndex';

const getTimeIndexShow = (timeIndex: string) => {
  const timeIndexArr = timeIndex.substring(1, timeIndex.length - 1).split(',');
  return mergeTimeIndex(timeIndexArr.map((index) => parseInt(index)).sort((a, b) => a - b));
  // return timeIndexArr.map((index) => availableTime[index as number]).join(' / ');
};

export default function MiniTable(props: {
  data: AdminApprovalInfo[];
  onConfirm: () => void;
  label: string;
  type?: 'danger' | 'primary';
  disabled?: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color={props?.type || 'primary'} isDisabled={props.disabled}>
        {props.label}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.label}确认</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className=" mb-4">将{props.label}以下申请：</div>
                  <div className="max-h-80 overflow-scroll flex flex-col gap-2">
                    {props.data.map((item) => {
                      return (
                        <div key={`Show-${item.applyId}`} className="flex gap-16 text-gray-500 ">
                          <div className="w-16">{item.Name}</div>
                          <div>
                            <div>{item.eqName}</div>
                            <div className="flex-nowrap">{getTimeIndexShow(item.timeIndex)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color={props?.type || 'primary'}
                  onPress={() => {
                    props.onConfirm();
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
