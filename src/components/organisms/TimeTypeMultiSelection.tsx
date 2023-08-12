import {
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react';
import React, { useLayoutEffect, useReducer } from 'react';

import { TimeTypeMultiSelectionReducer } from '../../reducer/TimeTypeMultiSelectionReducer';
import { TimeType } from '../../types/TimeType';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositive: (timeTypes: Array<TimeType>) => void;
  onNegative: () => void;
};

const initState = {
  all: false,
  checked: {
    M1: false,
    M5: false,
    M15: false,
    M30: false,
    H1: false,
    H4: false,
    Daily: false,
    Weekly: false
  }
};

export const TimeTypeMultiSelection: React.FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    positiveButtonText,
    negativeButtonText,
    onPositive,
    onNegative
  } = props;

  const [state, dispatch] = useReducer(
    TimeTypeMultiSelectionReducer,
    initState
  );

  useLayoutEffect(() => {
    dispatch({ type: 'INITIALIZE', payload: { initState } });
  }, [isOpen]);

  const selectedTimeTypes = Object.keys(state.checked)
    .map((key) => key as TimeType)
    .filter((key) => state.checked[key]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Stack spacing={1} direction={'column'}>
            <Checkbox
              isChecked={state.all}
              onChange={() => dispatch({ type: 'TOGGLE_ALL_CHECKED' })}
            >
              全選択
            </Checkbox>
            {Object.keys(state.checked).map((key: TimeType) => (
              <Checkbox
                key={key}
                isChecked={state.checked[key]}
                onChange={() =>
                  dispatch({
                    type: 'TOGGLE_CHECKED',
                    payload: { timeType: key }
                  })
                }
              >
                {key}
              </Checkbox>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justifyContent="space-between">
            <SecondaryButton onClick={onNegative}>
              {negativeButtonText}
            </SecondaryButton>
            <PrimaryButton
              isDisabled={selectedTimeTypes.length === 0}
              onClick={() => onPositive && onPositive(selectedTimeTypes)}
            >
              {positiveButtonText}
            </PrimaryButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
