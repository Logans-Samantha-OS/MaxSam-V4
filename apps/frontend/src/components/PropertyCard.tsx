/**
 * PropertyCard Component
 * 
 * Displays property information in a card format
 */

'use client';

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  score?: number;
  equity?: number;
  status: string;
}

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      qualified: 'bg-purple-100 text-purple-800',
      disqualified: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">
            {property.address}
          </h3>
          <p className="text-sm text-gray-600">
            {property.city}, {property.state} {property.zip}
          </p>
        </div>
        {property.score !== undefined && (
          <div className={`text-2xl font-bold ${getScoreColor(property.score)}`}>
            {property.score}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2">
        {property.equity !== undefined && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Equity:</span>
            <span className="font-semibold text-gray-900">
              ${property.equity.toLocaleString()}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              property.status
            )}`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement skiptrace
          }}
          className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Skiptrace
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement score
          }}
          className="flex-1 px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Score
        </button>
      </div>
    </div>
  );
}
