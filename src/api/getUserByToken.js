const URL = 'http://smallgiving.cf/mobileapp/checktokenapp.php?token=';

function getUserByToken(token) {
  return fetch(URL + token).then(res => res.json());
}

module.exports = getUserByToken;
