export * from './data-source.interface';
export * from './entity.interface';
export * from './record.interface';
export * from './generic.interface';

/**
 * Represents some Type of the Entity (class)
 */
export type EntityClass<E> = { new (entity: E): E } 
