import { userModel } from "./user.model"

export type placeModel = {
  _id: string,
  name: string,
  type: 'apartment' | 'house' | 'room',
  description: string,
  location: {
    city: string,
    country: string,
    address: string,
    coordinates: {
      lat: number,
      lng: number
    }
  },
  owner: string,
  ownerModel?: userModel,
  ownerName?: string,
  active: boolean,
  images: string[],
  durationRent: 'short' | 'middle' | 'long',
  price: {
    value: number,
    currency: string,
    period: 'day' | 'week' | 'month' | 'year'
  },
  people: {
    max: number,
    min: number
  }
  squareMeters: number
}
