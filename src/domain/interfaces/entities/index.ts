export * from './data-source.interface';
export * from './entity.interface';
export * from './record.interface';
export * from './generic.interface';

/**
 * Represents some Type of the Entity (class)
 */
export type EntityClass<T, E> = { 
  new (entity: T): E,
  createFromObject(pojoObject: Record<string, any>): [string?, E?] 
} 
