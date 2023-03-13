export interface GenericModel<T> {
  findAll(): Promise<T[]>;
  find(filter: T): Promise<T[]>;
  save(item: T): Promise<T>;
  get(id: string): Promise<T>;
  findOne(id: string): Promise<T>;
  findByIdAndUpdate(id: string, item: T);
}
