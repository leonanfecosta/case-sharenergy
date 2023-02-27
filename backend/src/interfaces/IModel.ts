export interface IModel<T> {
  create(obj: T): Promise<T>;
  readOneLogin(username: string, password: string): Promise<T | null>;
  read(): Promise<T[]>;
  readOneUser(email: string, cpf: string): Promise<T | null>;
  update(id: string, obj: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
