/**
 * Resource module - Resource management and allocation
 */

import { Resource, ID } from '../types';

/**
 * Resource manager for handling organizational assets and capabilities
 */
export class ResourceManager {
  private resources: Map<ID, Resource> = new Map();

  /**
   * Create a new resource
   */
  createResource(params: {
    name: string;
    type: 'physical' | 'information' | 'transformative' | 'relational' | 'purpose';
    availability: number;
    capacity: number;
    quality: number;
    metadata?: Record<string, any>;
  }): Resource {
    const resource: Resource = {
      id: this.generateId(),
      name: params.name,
      type: params.type,
      availability: params.availability,
      capacity: params.capacity,
      quality: params.quality,
      metadata: params.metadata || {},
      created: new Date(),
      updated: new Date()
    };

    this.resources.set(resource.id, resource);
    return resource;
  }

  /**
   * Get resource by ID
   */
  getResource(id: ID): Resource | undefined {
    return this.resources.get(id);
  }

  /**
   * Get all resources
   */
  getAllResources(): Resource[] {
    return Array.from(this.resources.values());
  }

  /**
   * Get resources by type
   */
  getResourcesByType(type: Resource['type']): Resource[] {
    return this.getAllResources().filter(resource => resource.type === type);
  }

  private generateId(): string {
    return 'resource_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
