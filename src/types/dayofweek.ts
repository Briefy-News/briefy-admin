export enum DayOfWeek {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

type DayOfWeekName = '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일' | '일요일';

export const dayOfWeekName: Record<DayOfWeek, DayOfWeekName> = {
  [DayOfWeek.MON]: '월요일',
  [DayOfWeek.TUE]: '화요일',
  [DayOfWeek.WED]: '수요일',
  [DayOfWeek.THU]: '목요일',
  [DayOfWeek.FRI]: '금요일',
  [DayOfWeek.SAT]: '토요일',
  [DayOfWeek.SUN]: '일요일',
};
