const signup = (
  ShortName,
  ClientNumber,
  IdentityCardNumber,
  MobilePhone,
  EMail,
) =>
  fetch('https://misappmobile.000webhostapp.com/apiway4/taotaikhoan.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ShortName,
      ClientNumber,
      IdentityCardNumber,
      MobilePhone,
      EMail,
    }),
  }).then((response) => response.json());

module.exports = signup;
