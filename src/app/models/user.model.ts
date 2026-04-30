export interface User {
  user_id?: number; // Optionnel car généré par la BDD
  nom: string;
  prenom: string;
  email: string;
  tel: number; // Ou string selon comment tu gères les préfixes internationaux
  date_naiss: string; // Format 'YYYY-MM-DD'
  mdp: string; 
  role: 'CLIENT' | 'MANAGER' | 'ADMIN';
}

export interface LoginCredentials {
  email: string;
  mdp: string;
}