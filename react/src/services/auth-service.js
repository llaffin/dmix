import Cookies from "universal-cookie";

export default class AuthService {
  static myInstance = null;
  userCookies = new Cookies();

  /**
   * @returns {AuthService}
   */
  static getInstance() {
    if (AuthService.myInstance == null) {
      return (AuthService.myInstance = new AuthService());
    }
    return this.myInstance;
  }

  loginAndStoreSecureToken(token) {
    this.userCookies.set(
      "secureToken",
      { key: token },
      {
        path: "/",
        expires: new Date(Date.now() + 604800),
        // httpOnly: true,
        sameSite: true,
      }
    );
  }

  logoutAndRemoveSecureToken() {
    this.userCookies.remove("secureToken", {
      path: "/",
      expires: new Date(Date.now() + 604800),
      // httpOnly: true,
      sameSite: true,
    });
  }

  logoutAPICall() {}

  hasSecureToken() {
    if (this.userCookies.get("secureToken")) {
      return true;
    } else {
      return false;
    }
  }

  getSecureToken() {
    let secureToken = JSON.stringify(this.userCookies.get("secureToken", {doNotParse: true}));
    let secureTokenSpliced = secureToken.substring(12, (secureToken.length - 4));
    return secureTokenSpliced;
  }
}
