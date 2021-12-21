import * as R from 'ramda';
import { read_input_file } from './input.js';

const MOVEMENTS = {
  'FORWARD': /^forward\s+(?<scalar>\d+)$/,
  'DOWN'   : /^down\s+(?<scalar>\d+)$/,
  'UP'     : /^up\s+(?<scalar>\d+)$/
};

const get_movement_scalar = (type, line) => {
  const match = line.match(MOVEMENTS[type]);
  return parseInt(match.groups.scalar);
}
const get_movement = raw_movement => {
  if (MOVEMENTS['FORWARD'].test(raw_movement))
    return { type: 'FORWARD', scalar: get_movement_scalar('FORWARD', raw_movement) };
  else if (MOVEMENTS['UP'].test(raw_movement))
    return { type: 'UP', scalar: get_movement_scalar('UP', raw_movement) };
  else if (MOVEMENTS['DOWN'].test(raw_movement))
    return { type: 'DOWN', scalar: get_movement_scalar('DOWN', raw_movement) };
}

const calculate_answer = raw_movements => {
  let x_scalar = 0;
  let y_scalar = 0;
  let aim = 0;

  R.forEach(
    raw_mov => {
      const {type, scalar} = get_movement(raw_mov);
      if      (type == 'UP')   aim -= scalar;
      else if (type == 'DOWN') aim += scalar;
      else if (type == 'FORWARD') {
        x_scalar += scalar;
        y_scalar += scalar * aim;
      }
    }, raw_movements
  );

  return x_scalar * y_scalar;
}

const main = () => {
  const answer = R.pipe(read_input_file, calculate_answer)();
  console.log(answer);
}

main();
