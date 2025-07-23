/**
 * Ethics module - Ethics evaluation and bias detection
 */

import { EthicsEvaluation, BiasDetection, BiasType, ID } from '../types';

/**
 * Ethics manager for handling ethical evaluations and bias detection
 */
export class EthicsManager {
  private ethicsEvaluations: Map<ID, EthicsEvaluation[]> = new Map();
  private biasDetections: Map<ID, BiasDetection[]> = new Map();

  /**
   * Conduct ethics evaluation for a component
   */
  evaluateEthics(componentId: ID, params: {
    wishEthics: number;
    processEthics: number;
    outcomeEthics: number;
    stakeholderImpact: Record<string, number>;
    concerns: string[];
    recommendations: string[];
    assessedBy: string;
  }): EthicsEvaluation {
    const evaluation: EthicsEvaluation = {
      wishEthics: params.wishEthics,
      processEthics: params.processEthics,
      outcomeEthics: params.outcomeEthics,
      stakeholderImpact: params.stakeholderImpact,
      concerns: params.concerns,
      recommendations: params.recommendations,
      assessedBy: params.assessedBy,
      assessedAt: new Date()
    };

    const existingEvaluations = this.ethicsEvaluations.get(componentId) || [];
    existingEvaluations.push(evaluation);
    this.ethicsEvaluations.set(componentId, existingEvaluations);

    return evaluation;
  }

  /**
   * Detect bias in a component
   */
  detectBias(componentId: ID, params: {
    type: BiasType;
    description: string;
    affectedComponents: ID[];
    severity: 'low' | 'medium' | 'high' | 'critical';
  }): BiasDetection {
    const detection: BiasDetection = {
      type: params.type,
      severity: params.severity,
      description: params.description,
      affectedComponents: params.affectedComponents,
      mitigationStrategies: this.generateMitigationStrategies(params.type, params.severity),
      detectedAt: new Date(),
      status: 'open'
    };

    const existingDetections = this.biasDetections.get(componentId) || [];
    existingDetections.push(detection);
    this.biasDetections.set(componentId, existingDetections);

    return detection;
  }

  /**
   * Generate mitigation strategies based on bias type and severity
   */
  private generateMitigationStrategies(type: BiasType, severity: string): string[] {
    const strategies: string[] = [];

    switch (type) {
      case BiasType.STRUCTURAL:
        strategies.push('Review organizational structures for inherent biases');
        strategies.push('Implement diverse decision-making processes');
        if (severity === 'high' || severity === 'critical') {
          strategies.push('Conduct comprehensive structural audit');
        }
        break;
      
      case BiasType.DATA_MEASUREMENT:
        strategies.push('Audit data collection and measurement processes');
        strategies.push('Implement bias-aware data validation');
        if (severity === 'high' || severity === 'critical') {
          strategies.push('Redesign data collection methodology');
        }
        break;
      
      case BiasType.COGNITIVE_BEHAVIORAL:
        strategies.push('Provide bias awareness training');
        strategies.push('Implement decision-making checkpoints');
        if (severity === 'high' || severity === 'critical') {
          strategies.push('Introduce external oversight and review');
        }
        break;
    }

    return strategies;
  }

  /**
   * Get ethics evaluations for a component
   */
  getEthicsEvaluations(componentId: ID): EthicsEvaluation[] {
    return this.ethicsEvaluations.get(componentId) || [];
  }

  /**
   * Get bias detections for a component
   */
  getBiasDetections(componentId: ID): BiasDetection[] {
    return this.biasDetections.get(componentId) || [];
  }

  /**
   * Calculate overall ethics score
   */
  calculateOverallEthics(): number {
    const allEvaluations: EthicsEvaluation[] = [];
    for (const evaluations of this.ethicsEvaluations.values()) {
      allEvaluations.push(...evaluations);
    }

    if (allEvaluations.length === 0) return 0.8; // Default baseline

    const totalScore = allEvaluations.reduce((sum, evaluation) => 
      sum + (evaluation.wishEthics + evaluation.processEthics + evaluation.outcomeEthics) / 3, 0
    );
    
    return totalScore / allEvaluations.length;
  }

  /**
   * Get active bias detections (open or mitigating status)
   */
  getActiveBiasDetections(): BiasDetection[] {
    const result: BiasDetection[] = [];
    for (const detections of this.biasDetections.values()) {
      result.push(...detections.filter(d => d.status === 'open' || d.status === 'mitigating'));
    }
    return result;
  }

  /**
   * Update bias detection status
   */
  updateBiasStatus(componentId: ID, detectionIndex: number, status: 'open' | 'mitigating' | 'resolved'): boolean {
    const detections = this.biasDetections.get(componentId);
    if (!detections || detectionIndex >= detections.length) {
      return false;
    }

    detections[detectionIndex].status = status;
    return true;
  }

  /**
   * Generate ethics recommendations
   */
  generateEthicsRecommendations(componentId: ID): string[] {
    const evaluations = this.getEthicsEvaluations(componentId);
    const biases = this.getBiasDetections(componentId);
    const recommendations: string[] = [];

    // Check ethics scores
    const latestEval = evaluations[evaluations.length - 1];
    if (latestEval) {
      if (latestEval.wishEthics < 0.7) {
        recommendations.push('Improve ethical alignment of organizational wishes');
      }
      if (latestEval.processEthics < 0.7) {
        recommendations.push('Review and enhance process ethical standards');
      }
      if (latestEval.outcomeEthics < 0.7) {
        recommendations.push('Evaluate and improve outcome ethical implications');
      }
    }

    // Check bias detections
    const activeBiases = biases.filter(b => b.status === 'open');
    if (activeBiases.length > 0) {
      recommendations.push(`Address ${activeBiases.length} active bias detection(s)`);
    }

    const criticalBiases = activeBiases.filter(b => b.severity === 'critical');
    if (criticalBiases.length > 0) {
      recommendations.push(`URGENT: Address ${criticalBiases.length} critical bias detection(s)`);
    }

    return recommendations;
  }
}
