import { BloodStock } from "../services/HospitalService";

export const TIPOS_SANGUE: (keyof BloodStock)[] = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export const BLOOD_VAZIO: BloodStock = { 
  'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 
  'AB-': 0, 'O+': 0, 'O-': 0 
};

export const UF_LIST = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];