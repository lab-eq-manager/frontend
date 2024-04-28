import { availableTime } from '@/types';

const getTimeStr = (range: number[]): string => {
  const start = range[0];
  const end = range[range.length - 1];

  const startTime = availableTime[start].split('-')[0];
  const endTime = availableTime[end].split('-')[1];

  return `${startTime}-${endTime}`;
};

export const mergeTimeIndex = (timeIndexes: number[]): string => {
  const ranges: number[][] = [];
  let range: number[] = [];

  timeIndexes.forEach((timeIndex, curIndex) => {
    if (range.length === 0 || timeIndex === range[range.length - 1] + 1) {
      range.push(timeIndex);
    } else {
      ranges.push(range);
      range = [timeIndex];
    }

    if (curIndex === timeIndexes.length - 1) {
      ranges.push(range);
    }
  });

  return ranges.map(getTimeStr).join(' / ');
};
