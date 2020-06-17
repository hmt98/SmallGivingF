const getInforDiemDanh = () =>
  fetch('http://smallgiving.cf/mobileapp/trangquantri/laythongtindd.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({}),
  }).then((response) => response.json());

module.exports = getInforDiemDanh;
