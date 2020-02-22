/*
 * Copyright ©2018 Nvest & GravitiChain. All rights reserved. Code contained within or this file cannot be copied, modified and / or distributed without the express written permission. Unauthorized copying or use of this file, via any medium is strictly prohibited.
 */

class StringValidators {
  getCount(str, regex) {
    return str.match(regex) !== null ? str.match(regex).length : 0;
  }

  isLength(str, n) {
    return str.length >= n;
  }

  hasUppercase(str, n) {
    const count = this.getCount(str, /[A-Z]/g, '');
    return count >= n;
  }
  hasLowercase(str, n) {
    const count = this.getCount(str, /[a-z]/g, '');
    return count >= n;
  }
  hasSpecial(str, n) {
    const count = this.getCount(str, /[^A-Za-z0-9]/g, '');
    return count >= n;
  }
  hasNumeric(str, n) {
    const count = this.getCount(str, /[0-9]/g, '');
    return count >= n;
  }
  isAlphaNumeric(str, space) {
    if (space === true) {
      if (this.getCount(str, /[A-Za-z0-9 ]/g, '') > 0) {
        return true;
      }
    }
    if (this.getCount(str, /[A-Za-z0-9]/g, '') > 0) {
      return true;
    }
    return false;
  }
  isSame(str) {
    const start = str[0];
    let pass = true;
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] !== start) {
        pass = false;
      }
    }
    return pass;
  }
}

export default new StringValidators();
