const contact = (idNguoiDung, NoiDung) =>
  fetch('http://smallgiving.cf/mobileapp/Gopy/gopyinsert.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, NoiDung}),
  }).then(response => response.json());

module.exports = contact;
