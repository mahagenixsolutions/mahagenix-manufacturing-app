import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

export default function ProductionLeaderboards() {
  const leaders = [
    { rank: 1, name: 'Assembly Line A', score: '98.5%', metric: 'Efficiency', trend: 'up' },
    { rank: 2, name: 'CNC Station 4', score: '97.2%', metric: 'Efficiency', trend: 'up' },
    { rank: 3, name: 'Packaging Line 2', score: '94.8%', metric: 'Efficiency', trend: 'down' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-5 text-warning-600">
        <Trophy className="w-5 h-5" />
        <span className="text-[12px] font-bold">Top Performers Today</span>
      </div>
      
      <div className="space-y-4">
        {leaders.map((leader) => (
          <div key={leader.rank} className="flex items-center justify-between py-3 px-4 rounded-lg bg-surface-secondary border border-subtle">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold ${
                leader.rank === 1 ? 'bg-warning-100 text-warning-700' :
                leader.rank === 2 ? 'bg-surface text-secondary border border-subtle' :
                'bg-orange-50 text-orange-700'
              }`}>
                #{leader.rank}
              </div>
              <div className="text-[12px] font-semibold text-primary">{leader.name}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[12px] font-bold text-primary">{leader.score}</div>
                <div className="text-[9px] text-tertiary uppercase">{leader.metric}</div>
              </div>
              {leader.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-success-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-danger-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
