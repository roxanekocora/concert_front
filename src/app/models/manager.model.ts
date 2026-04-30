import { User } from './user.model';

export interface Manager extends User {
  statut_manager: string; // 'Actif', 'En attente', etc.
}
