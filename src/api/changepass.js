const changepass = (idNguoiDung, MatKhau, NewPass) =>
  fetch('http://smallgiving.cf/mobileapp/Doimatkhau/doipass.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, MatKhau, NewPass}),
  }).then(response => response.json());

module.exports = changepass;
