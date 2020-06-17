const updateInforWay4 = (ClientNumber, ClientName) =>
  fetch('https://misappmobile.000webhostapp.com/apiway4/capnhatthongtin.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ClientNumber,
      ClientName,
    }),
  }).then((response) => response.json());

module.exports = updateInforWay4;
