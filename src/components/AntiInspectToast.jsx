import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function AntiInspectToast({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="anti-inspect-toast" role="alert">
      <ShieldAlert size={20} color="#ff4b72" />
      <span>{message}</span>
    </div>
  );
}
