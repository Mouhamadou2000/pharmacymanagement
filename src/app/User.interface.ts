export interface User {
    id:number |undefined ; // L'identifiant peut être undefined ou de type number
    firstname: string;
    lastname: string;
    email: string;
    active: boolean;
    password: string;
    profile: string; // Le profile peut être undefined ou de type string
  }