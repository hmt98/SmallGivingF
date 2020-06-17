const updateInfor = (idNguoiDung, TenNguoiDung, MatKhau, NgaySinh, STK) =>
  fetch('http://smallgiving.cf/mobileapp/Doithongtin/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      idNguoiDung,
      TenNguoiDung,
      MatKhau,
      NgaySinh,
      STK,
    }),
  }).then(response => response.json());

module.exports = updateInfor;
