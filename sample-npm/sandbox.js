import { NodeVM, VMScript } from 'vm2';
import fs from 'fs';
const vm = new NodeVM({
  console: 'inherit',
  sandbox: {},
  require: {
    external: true,
    builtin: ['fs', 'path'],
    root: './',
    mock: {
      fs: {
        readFileSync: () => 'Nice try!'
      }
    }
  },
});

const script = new VMScript(fs.readFileSync(`index.js`));

vm.run(script);