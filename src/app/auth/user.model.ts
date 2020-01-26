export class User {


  constructor(
    public name: string,
    public username: string,
    public email: string,
    public token: string,
    ) {
  }

  // get Token() {
  //   if ( !this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
  //     return null;
  //   }
  //   return this.token;
  // }
}
