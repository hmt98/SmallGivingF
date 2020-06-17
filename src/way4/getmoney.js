const getmoney = (ClientNumber) =>
  fetch('https://misappmobile.000webhostapp.com/apiway4/laythongtin.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ClientNumber}),
  }).then((response) => response.json());

module.exports = getmoney;
