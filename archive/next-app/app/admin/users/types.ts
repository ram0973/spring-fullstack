type Role = {
  "id": number,
  "createdDate": string,
  "lastModifiedDate": string,
  "createdBy": number,
  "lastModifiedBy": number,
  "role": string
}

type User = {
  "id": number,
  "avatar": string,
  "email": string,
  "enabled": boolean,
  "firstName": string,
  "lastName": string,
  "password": string,
  "roles": Role[]
}

type UsersDto = {
  "users": User[],
  "currentPage": number,
  "totalItems": number,
  "totalPages": number
}

export type {Role, User, UsersDto};
