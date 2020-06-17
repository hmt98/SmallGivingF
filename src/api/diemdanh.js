const diemdanh = (idNhaHaoTam) =>
  fetch('http://smallgiving.cf/mobileapp/Diemdanh/diemdanh.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNhaHaoTam}),
  }).then((response) => response.json());

module.exports = diemdanh;
