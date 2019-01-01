
export const range = ({from = 0, to}) => {
  return [...Array(to - from).keys()].map(x => x + from);
};



