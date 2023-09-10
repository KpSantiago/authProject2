export interface IAuth {
  id?: string;
  name: string;
  email?: string;
  password: string;
  cpf?: string;
  roleId?: string;
  Roles?: { Role: string };
  acessToken?: string;
}
