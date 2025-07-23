/**
 * SPELWork: Toilville's Ethical AI Framework
 * A workplace automation design framework for humans
 * 
 * @fileoverview Main entry point for the SPELWork framework
 * @version 0.1.0
 * @author Toilville Organization
 */

export * from './types';
export * from './core/Wish';
export * from './core/Domain';
export * from './core/Resource';
export * from './core/Flow';
export * from './core/Trust';
export * from './core/Ethics';
export * from './core/Lattice';
export * from './core/Framework';

// Main framework class
export { SPELWorkFramework as default } from './core/Framework';

/**
 * Version information
 */
export const VERSION = '0.1.0';

/**
 * Framework metadata
 */
export const METADATA = {
  name: 'SPELWork',
  fullName: 'Systemic Process Evaluation Lattice Framework',
  organization: 'Toilville',
  project: '#prolevibesummer',
  description: 'A workplace automation design framework for humans',
  license: 'MIT',
  repository: 'https://github.com/toilville/spelWork'
} as const;
