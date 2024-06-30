export interface ApiResponse<T> {
  message?: string;
  employeeDtos: T;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  position: string;
  departement: string;
  createDate: string;
}
