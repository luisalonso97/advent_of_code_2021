import * as R from 'ramda';
import fs from 'fs';

export const read_input_file = (file_path='input.dat') => {
  const text = fs.readFileSync(file_path).toString().split('\n');
  return R.map(parseInt, text);
}