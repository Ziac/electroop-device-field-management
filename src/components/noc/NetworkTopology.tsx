import React, { useEffect, useRef, useState } from 'react';
import { Network, Server, Wifi, AlertTriangle } from 'lucide-react';
import * as d3 from 'd3';

interface Node {
  id: string;
  type: 'gateway' | 'station' | 'server';
  status: 'active' | 'warning' | 'error';
  name: string;
  connections: number;
  load?: number;
}

interface Link {
  source: string;
  target: string;
  status: 'active' | 'warning' | 'error';
  bandwidth: number;
  latency: number;
}

const mockData = {
  nodes: [
    { id: 'server1', type: 'server', status: 'active', name: 'Main Server', connections: 3 },
    { id: 'gateway1', type: 'gateway', status: 'active', name: 'Gateway North', connections: 2 },
    { id: 'gateway2', type: 'gateway', status: 'warning', name: 'Gateway South', connections: 2 },
    { id: 'gateway3', type: 'gateway', status: 'error', name: 'Gateway East', connections: 1 },
    { id: 'cs001', type: 'station', status: 'active', name: 'CS001', connections: 1, load: 75 },
    { id: 'cs002', type: 'station', status: 'active', name: 'CS002', connections: 1, load: 85 },
    { id: 'cs003', type: 'station', status: 'warning', name: 'CS003', connections: 1, load: 90 },
    { id: 'cs004', type: 'station', status: 'error', name: 'CS004', connections: 1, load: 0 },
    { id: 'cs005', type: 'station', status: 'active', name: 'CS005', connections: 1, load: 65 }
  ],
  links: [
    { source: 'server1', target: 'gateway1', status: 'active', bandwidth: 100, latency: 15 },
    { source: 'server1', target: 'gateway2', status: 'warning', bandwidth: 85, latency: 45 },
    { source: 'server1', target: 'gateway3', status: 'error', bandwidth: 20, latency: 150 },
    { source: 'gateway1', target: 'cs001', status: 'active', bandwidth: 50, latency: 25 },
    { source: 'gateway1', target: 'cs002', status: 'active', bandwidth: 50, latency: 28 },
    { source: 'gateway2', target: 'cs003', status: 'warning', bandwidth: 35, latency: 55 },
    { source: 'gateway2', target: 'cs004', status: 'error', bandwidth: 0, latency: 0 },
    { source: 'gateway3', target: 'cs005', status: 'active', bandwidth: 45, latency: 35 }
  ]
};

export const NetworkTopology: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Create force simulation
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create arrow marker
    svg.append("defs").selectAll("marker")
      .data(["end"])
      .join("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(mockData.links)
      .join("line")
      .attr("stroke", d => d.status === 'active' ? '#4ade80' : d.status === 'warning' ? '#fbbf24' : '#ef4444')
      .attr("stroke-width", d => Math.max(1, d.bandwidth / 20))
      .attr("marker-end", "url(#arrow)");

    // Create nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(mockData.nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => setSelectedNode(d))
      .call(drag(simulation));

    // Add circles for nodes
    node.append("circle")
      .attr("r", 20)
      .attr("fill", d => d.status === 'active' ? '#4ade80' : d.status === 'warning' ? '#fbbf24' : '#ef4444');

    // Add icons based on node type
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .text(d => {
        switch (d.type) {
          case 'server': return '🖥️';
          case 'gateway': return '🔌';
          case 'station': return '⚡';
          default: return '';
        }
      });

    // Add labels
    node.append("text")
      .attr("x", 25)
      .attr("y", 0)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#1f2937")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .text(d => d.name);

    // Update positions on simulation tick
    simulation.nodes(mockData.nodes as any).on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    (simulation.force("link") as any).links(mockData.links);

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  // Drag functionality
  function drag(simulation: any) {
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Network Topology</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Error</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <svg
          ref={svgRef}
          width="100%"
          height="600"
          className="bg-white"
        />
      </div>

      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">{selectedNode.name}</h3>
            <div className="space-y-2">
              <p><strong>Type:</strong> {selectedNode.type}</p>
              <p><strong>Status:</strong> {selectedNode.status}</p>
              <p><strong>Connections:</strong> {selectedNode.connections}</p>
              {selectedNode.load !== undefined && (
                <p><strong>Load:</strong> {selectedNode.load}%</p>
              )}
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};