/**
 * Wish module - Core wish definition and management
 * "A wish is a dream the heart makes" - the foundation of SPELWork
 */

import { v4 as uuidv4 } from 'uuid';
import { Wish, ID, Timestamp } from '../types';

/**
 * Wish management class for defining and evaluating organizational objectives
 */
export class WishManager {
  private wishes: Map<ID, Wish> = new Map();

  /**
   * Create a new wish with expert guidance
   */
  createWish(params: {
    description: string;
    stakeholders: string[];
    expertGuidance?: string;
    context?: Record<string, any>;
  }): Wish {
    const wish: Wish = {
      id: uuidv4(),
      description: params.description,
      clarity: 0, // Will be evaluated
      coherence: 0, // Will be evaluated
      alignment: 0, // Will be evaluated
      stakeholders: params.stakeholders,
      created: new Date(),
      updated: new Date(),
      metadata: {
        expertGuidance: params.expertGuidance,
        context: params.context || {}
      }
    };

    // Initial evaluation
    this.evaluateWish(wish);
    this.wishes.set(wish.id, wish);
    return wish;
  }

  /**
   * Evaluate wish clarity - how well the wish is articulated
   */
  evaluateClarity(wish: Wish): number {
    let score = 0;
    
    // Check description quality
    if (wish.description.length > 20) score += 0.3;
    if (wish.description.includes('specific')) score += 0.2;
    if (wish.description.includes('measurable')) score += 0.2;
    if (wish.stakeholders.length > 0) score += 0.3;
    
    return Math.min(score, 1.0);
  }

  /**
   * Evaluate wish coherence - system understanding based on context
   */
  evaluateCoherence(wish: Wish): number {
    let score = 0.5; // Base score
    
    // Check if context provides enough information
    const context = wish.metadata.context || {};
    if (Object.keys(context).length > 2) score += 0.2;
    if (wish.metadata.expertGuidance) score += 0.3;
    
    return Math.min(score, 1.0);
  }

  /**
   * Evaluate wish alignment - compatibility with organizational capabilities
   */
  evaluateAlignment(wish: Wish): number {
    // This would typically integrate with organizational data
    // For now, return a baseline score
    return 0.7;
  }

  /**
   * Comprehensive wish evaluation
   */
  evaluateWish(wish: Wish): void {
    wish.clarity = this.evaluateClarity(wish);
    wish.coherence = this.evaluateCoherence(wish);
    wish.alignment = this.evaluateAlignment(wish);
    wish.updated = new Date();
  }

  /**
   * Update wish with expert input
   */
  updateWishWithExpertise(wishId: ID, expertise: {
    refinedDescription?: string;
    additionalStakeholders?: string[];
    domainKnowledge?: Record<string, any>;
  }): Wish | null {
    const wish = this.wishes.get(wishId);
    if (!wish) return null;

    if (expertise.refinedDescription) {
      wish.description = expertise.refinedDescription;
    }
    
    if (expertise.additionalStakeholders) {
      wish.stakeholders = [...new Set([...wish.stakeholders, ...expertise.additionalStakeholders])];
    }
    
    if (expertise.domainKnowledge) {
      wish.metadata.domainKnowledge = expertise.domainKnowledge;
    }

    this.evaluateWish(wish);
    return wish;
  }

  /**
   * Get wish by ID
   */
  getWish(id: ID): Wish | undefined {
    return this.wishes.get(id);
  }

  /**
   * Get all wishes
   */
  getAllWishes(): Wish[] {
    return Array.from(this.wishes.values());
  }

  /**
   * Get wishes by stakeholder
   */
  getWishesByStakeholder(stakeholder: string): Wish[] {
    return this.getAllWishes().filter(wish => 
      wish.stakeholders.includes(stakeholder)
    );
  }

  /**
   * Get poorly aligned wishes that need attention
   */
  getPoorlyAlignedWishes(threshold: number = 0.6): Wish[] {
    return this.getAllWishes().filter(wish => 
      wish.alignment < threshold || 
      wish.clarity < threshold || 
      wish.coherence < threshold
    );
  }

  /**
   * Remove a wish
   */
  removeWish(id: ID): boolean {
    return this.wishes.delete(id);
  }

  /**
   * Export wishes for analysis
   */
  exportWishes(): Wish[] {
    return this.getAllWishes();
  }
}

/**
 * Utility functions for wish analysis
 */
export class WishAnalytics {
  /**
   * Calculate overall wish health score
   */
  static calculateWishHealth(wishes: Wish[]): number {
    if (wishes.length === 0) return 0;
    
    const totalScore = wishes.reduce((sum, wish) => 
      sum + (wish.clarity + wish.coherence + wish.alignment) / 3, 0
    );
    
    return totalScore / wishes.length;
  }

  /**
   * Identify wish dependencies and conflicts
   */
  static analyzeWishRelationships(wishes: Wish[]): {
    dependencies: Array<{ from: ID; to: ID; reason: string }>;
    conflicts: Array<{ wishA: ID; wishB: ID; reason: string }>;
  } {
    const dependencies: Array<{ from: ID; to: ID; reason: string }> = [];
    const conflicts: Array<{ wishA: ID; wishB: ID; reason: string }> = [];

    // Simple analysis based on stakeholder overlap and description similarity
    for (let i = 0; i < wishes.length; i++) {
      for (let j = i + 1; j < wishes.length; j++) {
        const wishA = wishes[i];
        const wishB = wishes[j];
        
        // Check for stakeholder overlap
        const sharedStakeholders = wishA.stakeholders.filter(s => 
          wishB.stakeholders.includes(s)
        );
        
        if (sharedStakeholders.length > 0) {
          // Could be dependency or conflict - simplified logic
          if (wishA.description.toLowerCase().includes('require') || 
              wishB.description.toLowerCase().includes('require')) {
            dependencies.push({
              from: wishA.id,
              to: wishB.id,
              reason: `Shared stakeholders: ${sharedStakeholders.join(', ')}`
            });
          }
        }
      }
    }

    return { dependencies, conflicts };
  }

  /**
   * Generate wish improvement recommendations
   */
  static generateRecommendations(wish: Wish): string[] {
    const recommendations: string[] = [];
    
    if (wish.clarity < 0.7) {
      recommendations.push('Improve wish description with more specific and measurable criteria');
    }
    
    if (wish.coherence < 0.7) {
      recommendations.push('Add more contextual information to help system understanding');
    }
    
    if (wish.alignment < 0.7) {
      recommendations.push('Review organizational capabilities and adjust wish scope');
    }
    
    if (wish.stakeholders.length < 2) {
      recommendations.push('Identify additional stakeholders who may be affected by this wish');
    }
    
    return recommendations;
  }
}
