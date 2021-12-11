import fs from 'fs'
import * as R from 'ramda'

const read_input_file = (file_path='input.dat') => {
  const text = fs.readFileSync(file_path).toString().split('\n');
  const int_array = R.map(parseInt, text);
  return int_array;
}

const main = () => {
  const depths = read_input_file()
}