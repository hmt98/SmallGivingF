const getNotice = (idNhaHaoTam) =>
  fetch('http://smallgiving.cf/mobileapp/thongbao/thongbao.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNhaHaoTam}),
  }).then((response) => response.json());

module.exports = getNotice;
