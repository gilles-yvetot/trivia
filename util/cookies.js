function setCookie(cname, cvalue, exdays, domain) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
  const expires = 'expires=' + d.toGMTString();
  const cookie = cname + '=' + cvalue + '; ' + expires + '; ' + 'Domain=' + domain
  window.document.cookie = cookie
}

function getCookie(cname, cookies) {
  if (typeof window == 'undefined' && !cookies) {
    return
  }
  const name = cname + '=';
  const cookiesList = cookies || document.cookie
  const cArr = cookiesList.split(';');
  for (let i = 0; i < cArr.length; i++) {
    const c = cArr[i].trim();
    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length);
  }
  return '';
}

function deleteCookie(cname, domain) {
  const d = new Date();
  d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
  const expires = 'expires=' + d.toGMTString();
  window.document.cookie = cname + '=' + '; ' + expires + '; ' + (domain ? ('Domain=' + domain) : '');
}

module.exports = {
  setCookie,
  deleteCookie,
  getCookie
}
