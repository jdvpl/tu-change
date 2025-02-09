import * as moment from 'moment';

export const convertDate = (date: string | Date) => {
  return moment.utc(date).format('YYYY-MM-DD');
};
