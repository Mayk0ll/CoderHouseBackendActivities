import bcrypt, { genSaltSync } from 'bcrypt';

const hashPassword = (password) => bcrypt.hashSync(password, genSaltSync(10));

const isValidPassword = (password, passwordDB) => bcrypt.compareSync(password, passwordDB);

export { hashPassword, isValidPassword };