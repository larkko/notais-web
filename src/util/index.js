
export const range = ({from = 0, to}) => {
  return [...Array(to - from + 1).keys()].map(x => x + from);
};



