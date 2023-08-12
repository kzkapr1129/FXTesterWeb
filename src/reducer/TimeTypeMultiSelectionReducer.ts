import { TimeType } from '../types/TimeType';

type Action =
  | {
      type: 'INITIALIZE';
      payload: {
        initState: State;
      };
    }
  | {
      type: 'TOGGLE_CHECKED';
      payload: {
        timeType: TimeType;
      };
    }
  | {
      type: 'TOGGLE_ALL_CHECKED';
    };

type State = {
  all: boolean;
  checked: {
    M1: boolean;
    M5: boolean;
    M15: boolean;
    M30: boolean;
    H1: boolean;
    H4: boolean;
    Daily: boolean;
    Weekly: boolean;
  };
};

export const TimeTypeMultiSelectionReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...action.payload.initState };

    case 'TOGGLE_CHECKED':
      return {
        ...state,
        ...toggleChecks(state, action.payload.timeType)
      };
    case 'TOGGLE_ALL_CHECKED':
      return {
        ...state,
        ...toggleAll(state)
      };
  }
};

const toggleChecks = (state: State, timeType: TimeType) => {
  const newChecked = {
    ...state.checked,
    [timeType]: !(state.checked[timeType] ?? false)
  };

  /**
   * 全選択の状態を更新する。
   * 全選択のチェックルールは以下の通り
   *   - 全て選択されている時 => true
   *   - 何個か選択されている時 => false
   *   - 全て選択されていない時 => false
   */
  const allTimeTypes = Object.keys(newChecked);
  const newAll =
    allTimeTypes.filter((timeType) => newChecked[timeType]).length ===
    allTimeTypes.length;
  return {
    checked: newChecked,
    all: newAll
  };
};

const toggleAll = (state: State) => {
  const newAll = !state.all;
  const newChecked = Object.keys(state.checked).reduce(
    (sum, v) => ({ ...sum, [v]: newAll }),
    {}
  );
  return {
    checked: newChecked,
    all: newAll
  };
};
