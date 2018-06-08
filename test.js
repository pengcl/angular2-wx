function getYesterday() {
  var date = new Date(Date.parse(new Date().toString()) - 24 * 60 * 60 * 1000);
  console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
}

getYesterday();
