import * as R from 'ramda';
import { read_input_file } from './input.js';

const MOVEMENTS = {
  'FORWARD': /^forward\s+(?<scalar>\d+)$/,
  'DOWN'   : /^down\s+(?<scalar>\d+)$/,
  'UP'     : /^up\s+(?<scalar>\d+)$/
}

const filter_raw_movement = (raw_movements, type) => {
  return R.filter(line => MOVEMENTS[type].test(line), raw_movements);
}

const get_movement_scalar = (type, line) => {
  const match = line.match(MOVEMENTS[type]);
  return parseInt(match.groups.scalar);
}

const calculate_scalar = (movements, type) => {
  return R.reduce(
    (acc, line) => acc + get_movement_scalar(type, line),
    0, filter_raw_movement(movements, type)
  );
}

const calculate_answer = raw_movements => {
  const calc_scalar_of = R.partial(calculate_scalar, [raw_movements])

  const x_scalar = calc_scalar_of('FORWARD');
  const y_scalar = calc_scalar_of('DOWN') - calc_scalar_of('UP');

  return x_scalar * y_scalar;
}

const main = () => {
  const answer = R.pipe(read_input_file, calculate_answer)();
  console.log(answer)
}

main();
