const clearArr = arr => [arr[1], arr[2].split('\t')[1].split('/').splice(-1)];

const clearStr = (str, char) => str.replace(char, '').trim();

const markFiles = arr => arr.map(value => clearArr(value.split(' ')));

const strToArr = (str, char) => str.toString().trim().split(char);

const makePreviousPath = (path, repoPath) => {
  const previousPath = path.split('/').slice(0, -1).join('/');

  if (path === repoPath) {
    return null;
  }

  return previousPath;
};

const getLastCatalog = (path) => {
  const catalog = decodeURIComponent(path).split('/').splice(-1).join('/');

  return catalog;
};

const convertToStr = (obj) => {
  let str = '';

  Array.prototype.filter.call(obj, (val) => {
    str += `${val}\n`;
  });

  return str;
};

module.exports = {
  strToArr, markFiles, clearStr, makePreviousPath, getLastCatalog, convertToStr,
};
