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
      type: 'DONE_UPLOAD';
      payload: {
        errorCode: number;
        errorMessage?: string;
      }
    }
  | {
      type: 'CLOSE_ERROR_MESSAGE';
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
    case 'UPLOADING':
      return { ...state, isUploading: true};
    case 'DONE_UPLOAD':
      return { ...state, isUploading: true, ...action.payload, isShownErrorMessage: action.payload.errorCode !== 0};
    case 'CLOSE_ERROR_MESSAGE':
      return { ...state, isShownErrorMessage: false };
    default:
      return { ...state };
  }
};
