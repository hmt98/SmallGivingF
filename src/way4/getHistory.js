const URL = 'https://misappmobile.000webhostapp.com/apiway4/lichsugiaodich.php';

const getHistory = (ClientNumber, NgayBD, NgayKT) =>
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ClientNumber,
      NgayBD,
      NgayKT,
    }),
  }).then((response) => response.json());

module.exports = getHistory;
