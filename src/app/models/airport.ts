export default class Airport {
  constructor(
    public iataCode: string,
    public name: string,
    public base: boolean,
    public latitude: number,
    public longitude: number,
    public country: any
  ) {  }
}
