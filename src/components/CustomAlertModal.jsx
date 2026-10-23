import React from 'react';
import { Heart, MailCheck, Sparkles, X } from 'lucide-react';

export function CustomAlertModal({ isOpen, onClose, emailStatus, config }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="alert-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="alert-modal-close"
          aria-label="Close Alert"
        >
          <X size={20} />
        </button>

        {/* Mascot Illustration with Celebration Badge */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/bear-celebrate.jpg"
            alt="Celebrating Bear"
            className="alert-celebrate-img"
          />
          <div className="mascot-badge" style={{ bottom: '15px', right: '15px' }}>
            💖
          </div>
        </div>

        {/* Alert Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ff3366', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
          <Sparkles size={16} />
          <span>အသိပေးချက် (Alert Dialog)</span>
          <Sparkles size={16} />
        </div>

        {/* Main Alert Title */}
        <h2 className="alert-title">
          {config.alertMessage} 🥰
        </h2>

        {/* Alert Sub Message */}
        <p className="alert-message">
          {config.alertSubMessage}
        </p>

        {/* Email Delivery Status */}
        <div className="alert-email-pill">
          <MailCheck size={18} />
          <span>
            {emailStatus === 'sending' && 'အဖြေကို Email ပို့နေပါပြီ...'}
            {emailStatus === 'sent' && 'အဖြေ "Yes" ကို ကိုကြီးဆီကို ပို့ပေးလိုက်ပါပြီ! 💌'}
            {emailStatus === 'fallback' && 'အဖြေ "Yes" ကို အောင်မြင်စွာ မှတ်တမ်းတင်ပြီးပါပြီ! 💌'}
            {emailStatus === 'idle' && 'အဖြေ "Yes" ကို အောင်မြင်စွာ ရရှိပါပြီ! 💌'}
          </span>
        </div>

        {/* Action Button */}
        <div>
          <button className="alert-close-btn" onClick={onClose}>
            <Heart size={18} fill="white" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            ချစ်တယ်နော် အကို ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
