export enum TypePermit {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export interface RegistrationRequest {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password?: string; // Optionnel si généré par l'admin
  totalPrice: number;
  typePermit: string;
}

export interface RegistrationResponse {
  registrationId: number;
  fileNumber: string;
  dateInscription: string;
  typePermit: TypePermit;
  totalPrice: number;
  firstnameStudent: string;
  lastnameStudent: string;
  firstnameAdmin: string;
}

export interface StudentResponse {
  registrationId: any|string;
  userId: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  fileNumber: string;
  email: string;
  enabled: boolean; // Ajoute ceci pour gérer l'état du bouton
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// payment.models.ts
export enum PaymentMethod {
  CASH = 'CASH',
  OM = 'OM',
  MOMO = 'MOMO',
}

export interface PaymentRequestDTO {
  amount: number;
  paymentMethod: PaymentMethod;
  registrationId: number;
  note: string;
}

export interface PaymentResponseDTO{
  paymentId: number;
  receiptNumber: string;
  amount: number;
  datePayment: string;
  paymentMethod: string;
  note: string;
  studentFullName: string;
  fileNumber: string;
  adminName: string;
  remainingBalance: number;

}
