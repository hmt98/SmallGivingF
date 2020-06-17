const quyengop = (idNguoiDung, idHoatDong, SoTien) =>
  fetch('http://smallgiving.cf/mobileapp/Quyengop/thuchienquyengop.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, idHoatDong, SoTien}),
  }).then((response) => response.json());

module.exports = quyengop;
