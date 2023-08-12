export const Path = {
  HOME: '/',
  LOGIN: '/login',
  UPLOAD: '/upload',
  VERIFICATION: '/verification',
  SETTINGS: '/settings',
  DATA: '/data'
};

export const TimeTypeTable = {
  M1: 0,
  M5: 1,
  M15: 2,
  M30: 3,
  H1: 4,
  H4: 5,
  Daily: 6,
  Weekly: 7
};

export const TimeTypeInvTable = Object.keys(TimeTypeTable).reduce(
  (sum, v) => ({ ...sum, [TimeTypeTable[v]]: v }),
  {}
);
