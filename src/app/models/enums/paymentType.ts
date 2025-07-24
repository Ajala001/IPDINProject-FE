export enum PaymentType {
  Application = 1,
  Training,
  Examination,
  Dues,
  Registration
}

export const PaymentTypeLabelMap: Record<PaymentType, string> = {
  [PaymentType.Application]: 'Application',
  [PaymentType.Training]: 'Training',
  [PaymentType.Examination]: 'Examination',
  [PaymentType.Dues]: 'Dues',
  [PaymentType.Registration]: 'Registration',
};
