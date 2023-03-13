/* eslint-disable @typescript-eslint/no-empty-function */
import { GenericModel } from '../interfaces/generic.model';

export class MockDatabase implements GenericModel<any> {
  find(filter: any): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  findAll(): any {
    return { exec: jest.fn(() => {}) };
  }
  save(): any {
    return { exec: jest.fn(() => {}) };
  }
  get(): any {
    return { exec: jest.fn(() => {}) };
  }
  findOne(): any {
    return { exec: jest.fn(() => {}) };
  }
  findByIdAndUpdate(): any {
    return { exec: jest.fn(() => {}) };
  }
}
