/**
 * Core type definitions for the SPELWork framework
 */

/**
 * Unique identifier type
 */
export type ID = string;

/**
 * Timestamp type
 */
export type Timestamp = Date;

/**
 * Trust dimension enumeration
 */
export enum TrustDimension {
  PROCEDURAL = 'procedural',
  COMPETENCE = 'competence', 
  CONTRACTUAL = 'contractual',
  COMMUNICATION = 'communication',
  IDENTIFICATION = 'identification'
}

/**
 * Bias type enumeration
 */
export enum BiasType {
  STRUCTURAL = 'structural',
  DATA_MEASUREMENT = 'data_measurement',
  COGNITIVE_BEHAVIORAL = 'cognitive_behavioral'
}

/**
 * Actor type enumeration
 */
export enum ActorType {
  HUMAN = 'human',
  SYSTEM = 'system',
  HYBRID = 'hybrid'
}

/**
 * Core Wish interface - represents an organizational objective or intention
 */
export interface Wish {
  id: ID;
  description: string;
  clarity: number; // 0-1 score
  coherence: number; // 0-1 score  
  alignment: number; // 0-1 score
  stakeholders: string[];
  created: Timestamp;
  updated: Timestamp;
  metadata: Record<string, any>;
}

/**
 * Domain boundary interface
 */
export interface Domain {
  id: ID;
  name: string;
  boundaries: string[];
  expertise: string[];
  controls: string[];
  context: Record<string, any>;
  created: Timestamp;
  updated: Timestamp;
}

/**
 * Resource interface - represents available assets and capabilities
 */
export interface Resource {
  id: ID;
  name: string;
  type: 'physical' | 'information' | 'transformative' | 'relational' | 'purpose';
  availability: number; // 0-1 score
  capacity: number;
  quality: number; // 0-1 score
  metadata: Record<string, any>;
  created: Timestamp;
  updated: Timestamp;
}

/**
 * Flow node interface - represents points in the process lattice
 */
export interface FlowNode {
  id: ID;
  type: 'wish' | 'activity' | 'resource' | 'outcome' | 'boundary';
  name: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
  created: Timestamp;
  updated: Timestamp;
}

/**
 * Flow edge interface - represents connections between nodes
 */
export interface FlowEdge {
  id: ID;
  type: 'energy' | 'transformation' | 'dependency' | 'feedback';
  source: ID;
  target: ID;
  weight: number; // 0-1 score
  properties: Record<string, any>;
  created: Timestamp;
  updated: Timestamp;
}

/**
 * Trust metrics interface
 */
export interface TrustMetrics {
  dimension: TrustDimension;
  score: number; // 0-1 score
  evidence: string[];
  lastAssessed: Timestamp;
  trend: 'improving' | 'stable' | 'declining';
}

/**
 * Ethics evaluation interface
 */
export interface EthicsEvaluation {
  wishEthics: number; // 0-1 score
  processEthics: number; // 0-1 score
  outcomeEthics: number; // 0-1 score
  stakeholderImpact: Record<string, number>;
  concerns: string[];
  recommendations: string[];
  assessedBy: string;
  assessedAt: Timestamp;
}

/**
 * Bias detection result interface
 */
export interface BiasDetection {
  type: BiasType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedComponents: ID[];
  mitigationStrategies: string[];
  detectedAt: Timestamp;
  status: 'open' | 'mitigating' | 'resolved';
}

/**
 * Process lattice interface - the core data structure
 */
export interface ProcessLattice {
  id: ID;
  name: string;
  description: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  wishes: Wish[];
  domains: Domain[];
  resources: Resource[];
  trustMetrics: TrustMetrics[];
  ethicsEvaluations: EthicsEvaluation[];
  biasDetections: BiasDetection[];
  created: Timestamp;
  updated: Timestamp;
  version: string;
}

/**
 * Framework configuration interface
 */
export interface FrameworkConfig {
  trustThresholds: Record<TrustDimension, number>;
  ethicsRequirements: {
    minimumWishEthics: number;
    minimumProcessEthics: number;
    minimumOutcomeEthics: number;
  };
  biasTolerances: Record<BiasType, number>;
  humanOversightRequired: boolean;
  dataRetentionPeriod: number; // days
  auditingEnabled: boolean;
}

/**
 * User data management interface
 */
export interface UserDataPreferences {
  userId: ID;
  dataRetention: 'minimal' | 'standard' | 'extended';
  consentLevel: 'basic' | 'analytics' | 'full';
  removalRequested: boolean;
  lastUpdated: Timestamp;
}

/**
 * Analytics result interface
 */
export interface AnalyticsResult {
  metric: string;
  value: number;
  unit: string;
  timestamp: Timestamp;
  context: Record<string, any>;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    confidence: number;
  };
}
