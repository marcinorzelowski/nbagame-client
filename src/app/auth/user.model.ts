export class User {


  constructor(
    public username: string,
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
