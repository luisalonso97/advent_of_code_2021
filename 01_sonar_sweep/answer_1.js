import * as R from 'ramda';
import { read_input_file } from './input.js';

/*
  Starting from index 1 just compare all elements with their respective
  predecesor and increase the accumulator if the measure has increased.
*/
const get_depth_increase = d => {
  const compare_inc = (a, x) => (d[x-1] < d[x]) ? a = a+1 : a;

  const n_increases = R.reduce(compare_inc, 0, R.range(1, d.length));

  return n_increases;
}

const main = () => {
  const answer = R.pipe(read_input_file, get_depth_increase)();
  console.log(answer);
}

main();
