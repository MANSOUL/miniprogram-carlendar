const data = {};
for (let index = 97; index < 123; index++) {
  const c = String.fromCharCode(index);
  const arr = [];
  for (let i = 0; i < (2 + Math.floor(Math.random() * 8)); i++) {
    arr.push(`${c}${Math.floor(Math.random() * 1000)}`);
  }
  data[c] = arr;
}

Component({
  properties: {
    data: {
      type: Object,
      value: data
    },
    chars: {
      type: Array,
      value: Object.keys(data)
    }
  }
});