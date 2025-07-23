import ToilvilleEthicalAI from '../src/index';
import { TrustDimension, BiasType } from '../src/types';

describe('ToilvilleEthicalAI Framework', () => {
  let framework: ToilvilleEthicalAI;

  beforeEach(() => {
    framework = new ToilvilleEthicalAI();
  });

  test('should create framework instance', () => {
    expect(framework).toBeInstanceOf(ToilvilleEthicalAI);
  });

  test('should create and retrieve wishes', () => {
    const wish = framework.getWishManager().createWish({
      description: 'A test wish for the framework',
      stakeholders: ['test-stakeholder'],
      expertGuidance: 'Expert guidance for this wish'
    });

    expect(wish.description).toBe('A test wish for the framework');
    expect(wish.stakeholders).toEqual(['test-stakeholder']);
    
    const retrieved = framework.getWishManager().getWish(wish.id);
    expect(retrieved).toEqual(wish);
  });

  test('should create and manage domains', () => {
    const domain = framework.getDomainManager().createDomain({
      name: 'Test Domain',
      boundaries: ['boundary1', 'boundary2'],
      expertise: ['expertise1', 'expertise2'],
      controls: ['control1', 'control2']
    });

    expect(domain.name).toBe('Test Domain');
    expect(domain.boundaries).toEqual(['boundary1', 'boundary2']);
    expect(domain.expertise).toEqual(['expertise1', 'expertise2']);
    
    const retrieved = framework.getDomainManager().getDomain(domain.id);
    expect(retrieved).toEqual(domain);
  });

  test('should create and manage resources', () => {
    const resource = framework.getResourceManager().createResource({
      name: 'Test Resource',
      type: 'information',
      availability: 0.8,
      capacity: 100,
      quality: 0.9
    });

    expect(resource.name).toBe('Test Resource');
    expect(resource.type).toBe('information');
    expect(resource.availability).toBe(0.8);
    
    const retrieved = framework.getResourceManager().getResource(resource.id);
    expect(retrieved).toEqual(resource);
  });

  test('should evaluate trust metrics', () => {
    const componentId = 'test-component';
    const evidence = ['test evidence 1', 'test evidence 2', 'test evidence 3'];
    
    const trustMetrics = framework.getTrustManager().evaluateTrust(componentId, TrustDimension.COMPETENCE, evidence);
    
    expect(trustMetrics.dimension).toBe(TrustDimension.COMPETENCE);
    expect(trustMetrics.score).toBeGreaterThan(0);
    expect(trustMetrics.evidence).toEqual(evidence);
  });

  test('should conduct ethics evaluation', () => {
    const componentId = 'test-component';
    const evaluation = framework.getEthicsManager().evaluateEthics(componentId, {
      wishEthics: 0.8,
      processEthics: 0.7,
      outcomeEthics: 0.9,
      stakeholderImpact: { 'stakeholder1': 0.8 },
      concerns: ['test concern'],
      recommendations: ['test recommendation'],
      assessedBy: 'test-assessor'
    });

    expect(evaluation.wishEthics).toBe(0.8);
    expect(evaluation.processEthics).toBe(0.7);
    expect(evaluation.outcomeEthics).toBe(0.9);
    expect(evaluation.assessedBy).toBe('test-assessor');
  });

  test('should detect and manage bias', () => {
    const componentId = 'test-component';
    const biasDetection = framework.getEthicsManager().detectBias(componentId, {
      type: BiasType.COGNITIVE_BEHAVIORAL,
      description: 'Test bias detection',
      affectedComponents: ['comp1', 'comp2'],
      severity: 'medium'
    });

    expect(biasDetection.type).toBe(BiasType.COGNITIVE_BEHAVIORAL);
    expect(biasDetection.severity).toBe('medium');
    expect(biasDetection.status).toBe('open');
    expect(biasDetection.mitigationStrategies.length).toBeGreaterThan(0);
  });

  test('should create process lattices', () => {
    const lattice = framework.createLattice({
      name: 'Test Lattice',
      description: 'A test process lattice'
    });

    expect(lattice.name).toBe('Test Lattice');
    expect(lattice.description).toBe('A test process lattice');
    expect(lattice.version).toBe('1.0.0');
    
    const retrieved = framework.getLatticeManager().getLattice(lattice.id);
    expect(retrieved).toEqual(lattice);
  });

  test('should calculate overall trust score', () => {
    const componentId = 'test-component';
    
    // Add some trust metrics
    framework.getTrustManager().evaluateTrust(componentId, TrustDimension.COMPETENCE, ['evidence1', 'evidence2']);
    framework.getTrustManager().evaluateTrust(componentId, TrustDimension.PROCEDURAL, ['evidence3']);
    
    const overallTrust = framework.getTrustManager().calculateOverallTrust();
    expect(overallTrust).toBeGreaterThan(0);
    expect(overallTrust).toBeLessThanOrEqual(1);
  });

  test('should calculate overall ethics score', () => {
    const componentId = 'test-component';
    
    framework.getEthicsManager().evaluateEthics(componentId, {
      wishEthics: 0.8,
      processEthics: 0.7,
      outcomeEthics: 0.9,
      stakeholderImpact: {},
      concerns: [],
      recommendations: [],
      assessedBy: 'test'
    });
    
    const overallEthics = framework.getEthicsManager().calculateOverallEthics();
    expect(overallEthics).toBeGreaterThan(0);
    expect(overallEthics).toBeLessThanOrEqual(1);
  });

  test('should perform comprehensive lattice analysis', () => {
    const lattice = framework.createLattice({
      name: 'Analysis Test Lattice',
      description: 'A lattice for testing analysis functionality'
    });

    const analysis = framework.analyzeLattice(lattice.id);
    
    expect(analysis).toHaveProperty('health');
    expect(analysis).toHaveProperty('trust');
    expect(analysis).toHaveProperty('ethics');
    expect(analysis).toHaveProperty('bias');
    expect(analysis).toHaveProperty('recommendations');
    expect(Array.isArray(analysis.recommendations)).toBe(true);
  });

  test('should get framework metadata', () => {
    const metadata = framework.getMetadata();
    
    expect(metadata.name).toBe('SPELWork');
    expect(metadata.organization).toBe('Toilville');
    expect(metadata.version).toBe('0.1.0');
    expect(Array.isArray(metadata.capabilities)).toBe(true);
    expect(metadata.capabilities.length).toBeGreaterThan(0);
  });
});
