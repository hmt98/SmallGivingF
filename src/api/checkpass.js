const checkpass = (Email, SDT) =>
  fetch('http://smallgiving.cf/mobileapp/Doimatkhau/kiemtrapass.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({Email, SDT}),
  }).then(response => response.json());

module.exports = checkpass;
