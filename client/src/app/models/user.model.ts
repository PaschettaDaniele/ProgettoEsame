export type userModel = {
  _id: string,
  username: string,
  email: string,
  password?: string,
  role: 'admin' | 'user',
  active: boolean,
  name: string,
  img: string
}
