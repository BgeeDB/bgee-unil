const UNIT_MAPPING = {
  0: 'B',
  1: 'KB',
  2: 'MB',
  3: 'GB',
  4: 'TB',
};

const DIVISOR = 1000;

const readableFileSize = (size) => {
  let unit = 0;
  let tmpSize = size;

  while (unit <= 4) {
    // 4 is the higher unit used as map
    console.log(tmpSize, tmpSize / DIVISOR);
    tmpSize /= DIVISOR;
    unit += 1;
    if (tmpSize < DIVISOR) break;
  }
  return `${Math.trunc(tmpSize)} ${UNIT_MAPPING[unit]}`;
};

export default readableFileSize;
