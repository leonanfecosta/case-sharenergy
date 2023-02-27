export interface IServiceLogin <T> {
  readOne(username: string, password: string): Promise<T | null>;
}