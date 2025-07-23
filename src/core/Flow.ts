/**
 * Flow module - Process flow management and optimization
 */

import { FlowNode, FlowEdge, ID } from '../types';

/**
 * Flow manager for handling process flows and optimization
 */
export class FlowManager {
  private nodes: Map<ID, FlowNode> = new Map();
  private edges: Map<ID, FlowEdge> = new Map();

  /**
   * Create a new flow node
   */
  createNode(params: {
    type: 'wish' | 'activity' | 'resource' | 'outcome' | 'boundary';
    name: string;
    position: { x: number; y: number };
    properties?: Record<string, any>;
  }): FlowNode {
    const node: FlowNode = {
      id: this.generateId('node'),
      type: params.type,
      name: params.name,
      position: params.position,
      properties: params.properties || {},
      created: new Date(),
      updated: new Date()
    };

    this.nodes.set(node.id, node);
    return node;
  }

  /**
   * Create a new flow edge
   */
  createEdge(params: {
    type: 'energy' | 'transformation' | 'dependency' | 'feedback';
    source: ID;
    target: ID;
    weight: number;
    properties?: Record<string, any>;
  }): FlowEdge {
    const edge: FlowEdge = {
      id: this.generateId('edge'),
      type: params.type,
      source: params.source,
      target: params.target,
      weight: params.weight,
      properties: params.properties || {},
      created: new Date(),
      updated: new Date()
    };

    this.edges.set(edge.id, edge);
    return edge;
  }

  /**
   * Get node by ID
   */
  getNode(id: ID): FlowNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Get edge by ID
   */
  getEdge(id: ID): FlowEdge | undefined {
    return this.edges.get(id);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): FlowNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get all edges
   */
  getAllEdges(): FlowEdge[] {
    return Array.from(this.edges.values());
  }

  private generateId(prefix: string): string {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
