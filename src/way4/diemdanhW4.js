const diemdanhW4 = (NumberNguoiGui, NumberNguoiNhan, SoTien) =>
  fetch('https://misappmobile.000webhostapp.com/apiway4/chuyentien.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({NumberNguoiGui, NumberNguoiNhan, SoTien}),
  }).then((response) => response.json());

module.exports = diemdanhW4;
