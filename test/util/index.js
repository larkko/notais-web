import {
  expect
} from 'chai';
import {
  range
} from '../../src/util';

describe('#range', () => {
  it('should return empty array when range is empty', () => {
    expect(range({from: 0, to: -1})).to.deep.equal([]);
  });
  it('should return an array covering the appropriate range', () => {
    expect(range({from: -3, to: 3})).to.deep.equal([-3, -2, -1, 0, 1, 2, 3]);
  });
  it('should use 0 as a default value for the "from" argument', () => {
    expect(range({to: 3})).to.deep.equal([0, 1, 2, 3]);
  });
});



