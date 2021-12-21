import fs from 'fs';

export const read_input_file = (file_path='input.dat') => {
  const text = fs.readFileSync(file_path).toString().split('\n');
  return text;
}