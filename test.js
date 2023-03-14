const dayjs = require('dayjs');

function formatDate() {
    return dayjs().format('MM/DD/YYYY h:mm A')
  }
console.log(formatDate());
