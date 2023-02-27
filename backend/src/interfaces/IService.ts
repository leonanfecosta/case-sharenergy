export interface IService<T> {
  create(obj: unknown): Promise<T>;
  read(): Promise<T[]>;
  update(id: string, obj: unknown): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}