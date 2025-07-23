/**
 * Domain module - Domain expertise and boundary management
 */

import { Domain, ID } from '../types';

/**
 * Domain manager for handling expertise boundaries and controls
 */
export class DomainManager {
  private domains: Map<ID, Domain> = new Map();

  /**
   * Create a new domain
   */
  createDomain(params: {
    name: string;
    boundaries: string[];
    expertise: string[];
    controls: string[];
    context?: Record<string, any>;
  }): Domain {
    const domain: Domain = {
      id: this.generateId(),
      name: params.name,
      boundaries: params.boundaries,
      expertise: params.expertise,
      controls: params.controls,
      context: params.context || {},
      created: new Date(),
      updated: new Date()
    };

    this.domains.set(domain.id, domain);
    return domain;
  }

  /**
   * Get domain by ID
   */
  getDomain(id: ID): Domain | undefined {
    return this.domains.get(id);
  }

  /**
   * Get all domains
   */
  getAllDomains(): Domain[] {
    return Array.from(this.domains.values());
  }

  private generateId(): string {
    return 'domain_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
