export interface IForm {
  username: string
  phoneNumber: string
}

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  adress: IAdress
  phone: string
  website: string
  company: ICompany
}

export interface IAdress {
  street: string
  suite: string
  city: string
  zipcode: string
  get: {
    lat: string
    lng: string
  }
}

export interface ICompany {
  name: string
  catchPhrase: string
  bs: string
}