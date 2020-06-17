const theodoi = (idNhaHaoTam, idHoatDong) =>
  fetch('http://smallgiving.cf/mobileapp/Theodoi/theodoi.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNhaHaoTam, idHoatDong}),
  }).then((response) => response.json());

module.exports = theodoi;
