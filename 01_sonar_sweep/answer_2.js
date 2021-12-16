import * as R from 'ramda';
import { read_input_file } from './input.js';

/*
  Get the slices of the array and compare the sums of them.
  Slicing the array in sizes of WIN_SIZE and iterate over the input array
  from 0 to (lenth_of_input - WIN_SIZE).
*/
const get_depth_increase = d => {
  const WIN_SIZE = 3;

  const get_sum_of_win = idx => R.sum(d.slice(idx, idx+WIN_SIZE));
  const compare_wins   = idx => get_sum_of_win(idx) < get_sum_of_win(idx+1);
  const compare_inc    = (a, x) => compare_wins(x) ? a = a+1 : a;

  const n_increases = R.reduce(compare_inc, 0, R.range(0, d.length - 3));

  return n_increases;
}

const main = () => {
  const answer = R.pipe(read_input_file, get_depth_increase)();
  console.log(answer);
}

main();
