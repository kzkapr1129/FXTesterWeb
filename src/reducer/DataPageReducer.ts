type Action =
  | {
      type: 'DOWNLOADING';
    }
  | {
      type: 'DONE_DOWNLOAD';
      payload: {
        data: Array<{
          pairName: string;
          details: Array<{ timeType: number; countData: number }>;
        }>;
        errorCode: number;
        errorMessage?: string;
      };
    }
  | {
      type: 'CLOSE_ERROR_MESSAGE';
    };

type PairDetail = {
  pairName: string;
  details: Array<{
    timeType: number;
    countData: number;
  }>;
};

type State = {
  isDownloading: boolean;
  isShownErrorMessage: boolean;
  data: Array<PairDetail>;
};

export const DataPageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DOWNLOADING':
      return { ...state, isDownloading: true };
    case 'DONE_DOWNLOAD':
      return {
        ...state,
        isDownloading: false,
        isShownErrorMessage: action.payload.errorCode !== 0,
        ...action.payload
      };
    case 'CLOSE_ERROR_MESSAGE':
      return { ...state, isShownErrorMessage: false };
  }
};
