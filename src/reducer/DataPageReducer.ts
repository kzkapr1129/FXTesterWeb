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
    }
  | {
      type: 'SHOW_DELETE_DIALOG';
      payload: {
        selectedPairName: string;
      };
    }
  | {
      type: 'CLOSE_DELETE_DIALOG';
    }
  | {
      type: 'DELETING';
    }
  | {
      type: 'DONE_DELETE';
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
  isShownDeleteDialog: boolean;
  selectedPairName?: string;
  isDeleting: boolean;
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

    case 'SHOW_DELETE_DIALOG':
      return { ...state, isShownDeleteDialog: true, ...action.payload };

    case 'CLOSE_DELETE_DIALOG':
      return { ...state, isShownDeleteDialog: false, selectedPairName: null };

    case 'DELETING':
      return {
        ...state,
        isShownDeleteDialog: false,
        selectedPairName: null,
        isDeleting: true
      };

    case 'DONE_DELETE':
      return { ...state, isDeleting: false };
  }
};
