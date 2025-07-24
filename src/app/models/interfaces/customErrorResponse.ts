import { PaymentModel } from "../classes/payment";

export interface CustomErrorResponse {
  message: string;
  code?: string;
  paymentData?: PaymentModel;
}