import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const filenameCustom = __filename.split('\\').splice(0,8).join('\\');
const _dirname = dirname(filenameCustom);

export default _dirname;