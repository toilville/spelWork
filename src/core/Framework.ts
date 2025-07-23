/**
 * Main SPELWork Framework implementation
 * Coordinates all framework components
 */

import { WishManager } from './Wish';
import { DomainManager } from './Domain';
import { ResourceManager } from './Resource';
import { FlowManager } from './Flow';
import { TrustManager } from './Trust';
import { EthicsManager } from './Ethics';
import { LatticeManager } from './Lattice';
import { 
  ProcessLattice, 
  FrameworkConfig, 
  TrustDimension, 
  BiasType,
  ID,
  AnalyticsResult 
} from '../types';

/**
 * Default framework configuration
 */
const DEFAULT_CONFIG: FrameworkConfig = {
  trustThresholds: {
    [TrustDimension.PROCEDURAL]: 0.7,
    [TrustDimension.COMPETENCE]: 0.8,
    [TrustDimension.CONTRACTUAL]: 0.7,
    [TrustDimension.COMMUNICATION]: 0.6,
    [TrustDimension.IDENTIFICATION]: 0.6
  },
  ethicsRequirements: {
    minimumWishEthics: 0.7,
    minimumProcessEthics: 0.8,
    minimumOutcomeEthics: 0.7
  },
  biasTolerances: {
    [BiasType.STRUCTURAL]: 0.3,
    [BiasType.DATA_MEASUREMENT]: 0.2,
    [BiasType.COGNITIVE_BEHAVIORAL]: 0.4
  },
  humanOversightRequired: true,
  dataRetentionPeriod: 365,
  auditingEnabled: true
};

/**
 * Main SPELWork Framework class
 * 
 * Provides a unified interface for creating, managing, and analyzing
 * organizational process lattices with ethical AI principles
 */
export class SPELWorkFramework {
  private config: FrameworkConfig;
  private wishManager: WishManager;
  private domainManager: DomainManager;
  private resourceManager: ResourceManager;
  private flowManager: FlowManager;
  private trustManager: TrustManager;
  private ethicsManager: EthicsManager;
  private latticeManager: LatticeManager;

  constructor(config: Partial<FrameworkConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    // Initialize component managers
    this.wishManager = new WishManager();
    this.domainManager = new DomainManager();
    this.resourceManager = new ResourceManager();
    this.flowManager = new FlowManager();
    this.trustManager = new TrustManager();
    this.ethicsManager = new EthicsManager();
    this.latticeManager = new LatticeManager();
  }

  /**
   * Create a new process lattice
   */
  createLattice(params: {
    name: string;
    description: string;
    initialWish?: string;
    stakeholders?: string[];
  }): ProcessLattice {
    const lattice = this.latticeManager.createLattice(params);
    
    // If initial wish provided, create it
    if (params.initialWish) {
      const wish = this.wishManager.createWish({
        description: params.initialWish,
        stakeholders: params.stakeholders || []
      });
      lattice.wishes.push(wish);
    }

    return lattice;
  }

  /**
   * Get framework configuration
   */
  getConfig(): FrameworkConfig {
    return { ...this.config };
  }

  /**
   * Update framework configuration
   */
  updateConfig(updates: Partial<FrameworkConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Get wish manager instance
   */
  getWishManager(): WishManager {
    return this.wishManager;
  }

  /**
   * Get domain manager instance
   */
  getDomainManager(): DomainManager {
    return this.domainManager;
  }

  /**
   * Get resource manager instance
   */
  getResourceManager(): ResourceManager {
    return this.resourceManager;
  }

  /**
   * Get flow manager instance
   */
  getFlowManager(): FlowManager {
    return this.flowManager;
  }

  /**
   * Get trust manager instance
   */
  getTrustManager(): TrustManager {
    return this.trustManager;
  }

  /**
   * Get ethics manager instance
   */
  getEthicsManager(): EthicsManager {
    return this.ethicsManager;
  }

  /**
   * Get lattice manager instance
   */
  getLatticeManager(): LatticeManager {
    return this.latticeManager;
  }

  /**
   * Perform comprehensive lattice analysis
   */
  analyzeLattice(latticeId: ID): {
    health: AnalyticsResult;
    trust: AnalyticsResult;
    ethics: AnalyticsResult;
    bias: AnalyticsResult;
    recommendations: string[];
  } {
    const lattice = this.latticeManager.getLattice(latticeId);
    if (!lattice) {
      throw new Error(`Lattice ${latticeId} not found`);
    }

    const now = new Date();
    
    // Calculate overall health
    const wishHealth = this.wishManager.getAllWishes().length > 0 ? 
      this.calculateWishHealth() : 0;
    
    const health: AnalyticsResult = {
      metric: 'lattice_health',
      value: wishHealth,
      unit: 'score',
      timestamp: now,
      context: { latticeId }
    };

    // Trust analysis
    const trustScore = this.trustManager.calculateOverallTrust();
    const trust: AnalyticsResult = {
      metric: 'trust_score',
      value: trustScore,
      unit: 'score',
      timestamp: now,
      context: { latticeId }
    };

    // Ethics analysis
    const ethicsScore = this.ethicsManager.calculateOverallEthics();
    const ethics: AnalyticsResult = {
      metric: 'ethics_score',
      value: ethicsScore,
      unit: 'score',
      timestamp: now,
      context: { latticeId }
    };

    // Bias analysis
    const biasScore = this.calculateBiasScore();
    const bias: AnalyticsResult = {
      metric: 'bias_score',
      value: biasScore,
      unit: 'score',
      timestamp: now,
      context: { latticeId }
    };

    // Generate recommendations
    const recommendations = this.generateRecommendations(lattice);

    return {
      health,
      trust,
      ethics,
      bias,
      recommendations
    };
  }

  /**
   * Calculate overall wish health
   */
  private calculateWishHealth(): number {
    const wishes = this.wishManager.getAllWishes();
    if (wishes.length === 0) return 0;
    
    const totalScore = wishes.reduce((sum, wish) => 
      sum + (wish.clarity + wish.coherence + wish.alignment) / 3, 0
    );
    
    return totalScore / wishes.length;
  }

  /**
   * Calculate bias score (lower is better)
   */
  private calculateBiasScore(): number {
    // Simplified bias calculation
    // In real implementation, this would analyze actual bias detection results
    return 0.2; // Assume low bias for now
  }

  /**
   * Generate recommendations for lattice improvement
   */
  private generateRecommendations(lattice: ProcessLattice): string[] {
    const recommendations: string[] = [];
    
    // Check wish quality
    const poorWishes = this.wishManager.getPoorlyAlignedWishes();
    if (poorWishes.length > 0) {
      recommendations.push(`${poorWishes.length} wishes need clarity or alignment improvements`);
    }

    // Check trust levels
    const trustScore = this.trustManager.calculateOverallTrust();
    if (trustScore < 0.7) {
      recommendations.push('Trust levels are below recommended thresholds - review trust-building measures');
    }

    // Check ethics compliance
    const ethicsScore = this.ethicsManager.calculateOverallEthics();
    if (ethicsScore < 0.7) {
      recommendations.push('Ethics evaluation indicates areas for improvement');
    }

    // Check human oversight
    if (this.config.humanOversightRequired && lattice.nodes.length > 10) {
      recommendations.push('Consider adding more human oversight points for complex processes');
    }

    return recommendations;
  }

  /**
   * Export lattice data for external analysis
   */
  exportLattice(latticeId: ID): ProcessLattice | null {
    return this.latticeManager.getLattice(latticeId) || null;
  }

  /**
   * Import lattice data
   */
  importLattice(latticeData: ProcessLattice): boolean {
    try {
      this.latticeManager.importLattice(latticeData);
      return true;
    } catch (error) {
      console.error('Failed to import lattice:', error);
      return false;
    }
  }

  /**
   * Get framework version and metadata
   */
  getMetadata(): {
    version: string;
    name: string;
    organization: string;
    capabilities: string[];
  } {
    return {
      version: '0.1.0',
      name: 'SPELWork',
      organization: 'Toilville',
      capabilities: [
        'Wish Definition & Management',
        'Domain Expertise Integration',
        'Resource Alignment',
        'Flow Optimization',
        'Trust & Safety Systems',
        'Ethics & Bias Management',
        'Human Oversight Integration',
        'Process Analytics'
      ]
    };
  }
}
