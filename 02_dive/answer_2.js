import * as R from 'ramda';
import { read_input_file } from './input.js';

const MOVEMENTS = {
  'FORWARD': /^forward\s+(?<scalar>\d+)$/,
  'DOWN'   : /^down\s+(?<scalar>\d+)$/,
  'UP'     : /^up\s+(?<scalar>\d+)$/
};

const filter_raw_movement = (raw_movements, type) => {
  return R.filter(line => MOVEMENTS[type].test(line), raw_movements);
}

const get_movement_scalar = (type, line) => {
  const match = line.match(MOVEMENTS[type]);
  return parseInt(match.groups.scalar);
}

const main = () => {
  const answer = R.pipe(read_input_file, calculate_answer)();
  console.log(answer)
}

main();
