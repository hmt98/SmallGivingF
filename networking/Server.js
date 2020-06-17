const apiBlog = 'http://smallgiving.cf/mobileapp/Tinhoatdong/tinhoatdong.php';

const apiBXH = 'http://smallgiving.cf/mobileapp/Bangxephang/bangxephang.php';

const apiHoatDong = 'http://smallgiving.cf/mobileapp/Hoatdong/hoatdong.php';

async function getBlogFromServer() {
  try {
    let respond = await fetch(apiBlog);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

async function getBXHFromServer() {
  try {
    let respond = await fetch(apiBXH);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

async function getHoatDongFromServer() {
  try {
    let respond = await fetch(apiHoatDong);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

export {getBlogFromServer};
export {getBXHFromServer};
export {getHoatDongFromServer};
