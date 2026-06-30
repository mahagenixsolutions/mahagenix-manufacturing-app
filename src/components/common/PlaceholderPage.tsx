// ============================================================
// ForgeMES — Placeholder Page (for modules not yet built)
// ============================================================

import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-surface-secondary)' }}
      >
        <Construction className="w-8 h-8" style={{ color: 'var(--text-tertiary)' }} />
      </div>
      <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
        {description}
      </p>
    </div>
  );
}
