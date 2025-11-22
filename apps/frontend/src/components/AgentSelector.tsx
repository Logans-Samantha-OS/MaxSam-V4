/**
 * AgentSelector Component
 * 
 * Allows users to select which AI agent to chat with
 */

'use client';

interface Agent {
  id: 'sam' | 'eleanor' | 'alex' | 'nanobanana';
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface AgentSelectorProps {
  selectedAgent: string;
  onSelectAgent: (agentId: string) => void;
}

const agents: Agent[] = [
  {
    id: 'sam',
    name: 'Sam',
    description: 'Emotional support and reasoning companion',
    icon: '🤝',
    color: 'bg-blue-500',
  },
  {
    id: 'eleanor',
    name: 'Eleanor',
    description: 'Analytics and business intelligence',
    icon: '📊',
    color: 'bg-purple-500',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Creative engine for content',
    icon: '✨',
    color: 'bg-pink-500',
  },
  {
    id: 'nanobanana',
    name: 'NanoBanana',
    description: 'Technical workflows and automation',
    icon: '🔧',
    color: 'bg-green-500',
  },
];

export default function AgentSelector({ selectedAgent, onSelectAgent }: AgentSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent.id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedAgent === agent.id
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-2">
            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-full ${agent.color} flex items-center justify-center text-3xl`}
            >
              {agent.icon}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600">{agent.description}</p>

            {/* Selected indicator */}
            {selectedAgent === agent.id && (
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Selected
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
