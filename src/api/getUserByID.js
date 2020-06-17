const URL = 'http://smallgiving.cf/mobileapp/Thongtin/thongtin.php';

const getUserByID = idNguoiDung =>
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung}),
  }).then(response => response.json());

module.exports = getUserByID;
