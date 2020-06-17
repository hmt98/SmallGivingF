import getUser from './api/getUser';
import {AsyncStorage} from 'react-native';

const getUserName = async () => {
  var userName = '';
  var tokenAsync = await AsyncStorage.getItem('tokenLogin');
  getUser(tokenAsync)
    .then(resName => resName['TenNguoiDung'])
    .then(resJSON => {
      userName = resJSON;
    })
    .catch(error => console.log(error));
  await AsyncStorage.setItem('userName', userName);
};
module.exports = getUserName;
