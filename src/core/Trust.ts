/**
 * Trust module - Trust metrics and evaluation
 */

import { TrustMetrics, TrustDimension, ID } from '../types';

/**
 * Trust manager for handling trust evaluation and metrics
 */
export class TrustManager {
  private trustMetrics: Map<ID, TrustMetrics[]> = new Map();

  /**
   * Evaluate trust for a component
   */
  evaluateTrust(componentId: ID, dimension: TrustDimension, evidence: string[]): TrustMetrics {
    const metrics: TrustMetrics = {
      dimension,
      score: this.calculateTrustScore(dimension, evidence),
      evidence,
      lastAssessed: new Date(),
      trend: 'stable'
    };

    const existingMetrics = this.trustMetrics.get(componentId) || [];
    const updatedMetrics = existingMetrics.filter(m => m.dimension !== dimension);
    updatedMetrics.push(metrics);
    this.trustMetrics.set(componentId, updatedMetrics);

    return metrics;
  }

  /**
   * Calculate trust score based on dimension and evidence
   */
  private calculateTrustScore(dimension: TrustDimension, evidence: string[]): number {
    // Simplified trust calculation
    let baseScore = 0.5;
    
    switch (dimension) {
      case TrustDimension.PROCEDURAL:
        baseScore = evidence.length > 2 ? 0.8 : 0.6;
        break;
      case TrustDimension.COMPETENCE:
        baseScore = evidence.length > 3 ? 0.9 : 0.7;
        break;
      case TrustDimension.CONTRACTUAL:
        baseScore = evidence.length > 1 ? 0.8 : 0.6;
        break;
      case TrustDimension.COMMUNICATION:
        baseScore = evidence.length > 2 ? 0.7 : 0.5;
        break;
      case TrustDimension.IDENTIFICATION:
        baseScore = evidence.length > 1 ? 0.6 : 0.4;
        break;
    }

    return Math.min(baseScore, 1.0);
  }

  /**
   * Get trust metrics for a component
   */
  getTrustMetrics(componentId: ID): TrustMetrics[] {
    return this.trustMetrics.get(componentId) || [];
  }

  /**
   * Calculate overall trust score
   */
  calculateOverallTrust(): number {
    const allMetrics: TrustMetrics[] = [];
    for (const metrics of this.trustMetrics.values()) {
      allMetrics.push(...metrics);
    }

    if (allMetrics.length === 0) return 0.7; // Default baseline

    const totalScore = allMetrics.reduce((sum, metric) => sum + metric.score, 0);
    return totalScore / allMetrics.length;
  }

  /**
   * Get trust metrics by dimension
   */
  getTrustByDimension(dimension: TrustDimension): TrustMetrics[] {
    const result: TrustMetrics[] = [];
    for (const metrics of this.trustMetrics.values()) {
      result.push(...metrics.filter(m => m.dimension === dimension));
    }
    return result;
  }
}
