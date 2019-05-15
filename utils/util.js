const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTimeTrunk = t => {
  const trunks = {
    Morning: [5, 12],
    Afternoon: [12, 18],
    Evening: [18, 22],
    Night: [22, 27]
  };
  const date = new Date();
  let hour = date.getHours();
  hour = hour <= 5 ? hour + 24 : hour;
  for (const [k, v] of Object.entries(trunks)) {
    if (hour >= v[0] && hour <= v[1]) {
      return k;
    }
  }
  return 'Morning';
}

function add(n1, n2) {
  const p1 = (n1 + '').split('.')[1];
  const p2 = (n2 + '').split('.')[1];
  const c1 = p1 ? p1.length : 0;
  const c2 = p2 ? p2.length : 0;
  const cMax = Math.max(c1, c2);
  const max = Math.pow(10, cMax);
  return (n1 * max + n2 * max) / max;
}

function getHost() {
  const DEV = 'http://localhost:8888';
  const PROP = 'https://speednote.jokme.com';
  return DEV;
}

module.exports = {
  formatTime,
  formatNumber,
  getTimeTrunk,
  add,
  getHost
};
