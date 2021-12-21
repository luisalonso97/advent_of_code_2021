import * as R from 'ramda';
import { read_input_file } from './input.js';

const calculate_answer = raw_diagnostics => {
  // Assuming a 12 bit string
  let bit_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // To compare an occurrence on >50% of the cases
  const most_common_scale = Math.floor(raw_diagnostics.length / 2) + 1;

  R.forEach(
    raw_diagnostic => {
      R.addIndex(R.forEach)(
        (diag, idx) => {
          if (bit_count[idx] < most_common_scale) {
            if (diag === '1') bit_count[idx] += 1;
          }
        }, raw_diagnostic
      );
    }, raw_diagnostics
  );

  const binary_repr = R.reduce(
    (a, x) => R.concat(a, (x < most_common_scale) ? '0' : '1'), '', bit_count
  );

  const binary_flip = R.reduce(
    (a, x) => R.concat(a, (x === '1') ? '0' : '1'), '', binary_repr
  );

  const decimal_repr = parseInt(binary_repr, 2);
  const decimal_flip = parseInt(binary_flip, 2);

  return decimal_repr * decimal_flip;
}

const main = () => {
  const answer = R.pipe(read_input_file, calculate_answer)();
  console.log(answer)
}

main();
