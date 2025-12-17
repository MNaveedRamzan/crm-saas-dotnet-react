import type { DealStatus } from '../types';

export const DealStatusEnum = {
  New: 0,
  InProgress: 1,
  Won: 2,
  Lost: 3,
} as const;

export const dealStatusOptions: { label: string; value: DealStatus }[] = [
  { label: 'New', value: DealStatusEnum.New },
  { label: 'In Progress', value: DealStatusEnum.InProgress },
  { label: 'Won', value: DealStatusEnum.Won },
  { label: 'Lost', value: DealStatusEnum.Lost },
];

export function dealStatusLabel(status: DealStatus): string {
  switch (status) {
    case DealStatusEnum.New:
      return 'New';
    case DealStatusEnum.InProgress:
      return 'In Progress';
    case DealStatusEnum.Won:
      return 'Won';
    case DealStatusEnum.Lost:
      return 'Lost';
    default:
      return 'Unknown';
  }
}
