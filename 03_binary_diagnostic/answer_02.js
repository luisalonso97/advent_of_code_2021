import * as R from 'ramda';
import { read_input_file } from './input.js';

const reduce_diagnostic = (raw_diagnostics, select_fn, bit_n=0) => {
  if (raw_diagnostics.length == 1) { return raw_diagnostics[0]; }

  const get_count_of_bit_n = (raw_diagnostics, n) =>
    R.countBy(R.identity)(R.pluck(n, raw_diagnostics));

  const counts = get_count_of_bit_n(raw_diagnostics, bit_n);
  const select_from_count = R.partial(select_fn, [counts, bit_n]);
  const reduced_diagnostics = R.filter(select_from_count, raw_diagnostics);

  return reduce_diagnostic(reduced_diagnostics, select_fn, bit_n+1);
}

const calculate_answer = raw_diagnostics => {
  const select_life_support = (disambiguator, count, bit_n, raw_diagnostic) => {
    if (count['1'] == count['0']) {
      return (raw_diagnostic[bit_n] === disambiguator) ? true : false;
    }
    const flipper = (count) => {
      if (disambiguator === '1'){ return (count['1'] > count['0']) ? '1' : '0'; }
      else if (disambiguator === '0') { return (count['0'] > count['1']) ? '1' : '0'; }
    }
    const high = flipper(count);
    if (raw_diagnostic[bit_n] === high) return true
    else return false
  }

  const select_oxygen_gen_rating = R.partial(select_life_support, ['1']);
  const select_C02_scrubber_rating = R.partial(select_life_support, ['0']);

  const reduce_raw_diagnostic = R.partial(reduce_diagnostic, [raw_diagnostics]);

  const oxygen_gen_rating = reduce_raw_diagnostic(select_oxygen_gen_rating);
  const C02_scrubber_rating = reduce_raw_diagnostic(select_C02_scrubber_rating);

  const decimal_repr_oxygen_gen_rating = parseInt(oxygen_gen_rating, 2);
  const decimal_repr_C02_scrubber_rating = parseInt(C02_scrubber_rating, 2);

  return decimal_repr_oxygen_gen_rating * decimal_repr_C02_scrubber_rating;
}

const main = () => {
  const answer = R.pipe(read_input_file, calculate_answer)();
  console.log(answer);
}

main();
