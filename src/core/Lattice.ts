/**
 * Lattice module - Process lattice management and coordination
 */

import { ProcessLattice, ID } from '../types';

/**
 * Lattice manager for coordinating all framework components
 */
export class LatticeManager {
  private lattices: Map<ID, ProcessLattice> = new Map();

  /**
   * Create a new process lattice
   */
  createLattice(params: {
    name: string;
    description: string;
    version?: string;
  }): ProcessLattice {
    const lattice: ProcessLattice = {
      id: this.generateId(),
      name: params.name,
      description: params.description,
      nodes: [],
      edges: [],
      wishes: [],
      domains: [],
      resources: [],
      trustMetrics: [],
      ethicsEvaluations: [],
      biasDetections: [],
      created: new Date(),
      updated: new Date(),
      version: params.version || '1.0.0'
    };

    this.lattices.set(lattice.id, lattice);
    return lattice;
  }

  /**
   * Get lattice by ID
   */
  getLattice(id: ID): ProcessLattice | undefined {
    return this.lattices.get(id);
  }

  /**
   * Get all lattices
   */
  getAllLattices(): ProcessLattice[] {
    return Array.from(this.lattices.values());
  }

  /**
   * Update lattice
   */
  updateLattice(id: ID, updates: Partial<ProcessLattice>): ProcessLattice | null {
    const lattice = this.lattices.get(id);
    if (!lattice) return null;

    const updatedLattice = {
      ...lattice,
      ...updates,
      updated: new Date()
    };

    this.lattices.set(id, updatedLattice);
    return updatedLattice;
  }

  /**
   * Import lattice data
   */
  importLattice(latticeData: ProcessLattice): void {
    // Validate lattice data structure
    if (!latticeData.id || !latticeData.name) {
      throw new Error('Invalid lattice data: missing required fields');
    }

    // Set the lattice
    this.lattices.set(latticeData.id, {
      ...latticeData,
      updated: new Date()
    });
  }

  /**
   * Remove lattice
   */
  removeLattice(id: ID): boolean {
    return this.lattices.delete(id);
  }

  /**
   * Clone lattice
   */
  cloneLattice(id: ID, newName: string): ProcessLattice | null {
    const original = this.lattices.get(id);
    if (!original) return null;

    const cloned: ProcessLattice = {
      ...original,
      id: this.generateId(),
      name: newName,
      created: new Date(),
      updated: new Date()
    };

    this.lattices.set(cloned.id, cloned);
    return cloned;
  }

  private generateId(): string {
    return 'lattice_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
