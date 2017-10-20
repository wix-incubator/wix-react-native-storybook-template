const path = require('path');
const {ncp} = require('ncp');

const source = path.resolve(__dirname, '../development');

const destination = path.resolve(process.cwd(), './storybook');

ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Done. Don\'t forget to include storybook directory to git');
});
