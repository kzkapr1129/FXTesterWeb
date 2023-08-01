import { Candle } from '../types/Candle';

type Action =
  | {
      type: 'FILE_OPENED';
      payload: {
        filename: string;
        startTime: string;
        endTime: string;
        pairName: string;
        timeType: string;
        data: Array<Candle>;
      };
    }
  | {
      type: 'UPLOADING';
    }
  | {
      type: 'ERROR';
      payload: {
        message: string;
      };
    }
  | {
      type: 'DISMISS_ERROR_MESSAGE';
    };

type State = {
  filename: string;
  startTime: string;
  endTime: string;
  pairName: string;
  timeType: string;
  isShownErrorMessage: boolean;
  errorMessage: string;
  isUploading: boolean;
  isFileOpened: boolean;
  data: Array<Candle>;
};

export const UploadPageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FILE_OPENED':
      return { ...state, isFileOpened: true, ...action.payload };
    default:
      return { ...state };
  }
};
