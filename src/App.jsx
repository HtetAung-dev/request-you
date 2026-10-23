import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { CONFIG } from './config';
import { FloatingHearts } from './components/FloatingHearts';
import { CustomAlertModal } from './components/CustomAlertModal';
import { AntiInspectToast } from './components/AntiInspectToast';
import { soundEffects } from './utils/audio';
import { initAntiInspect } from './utils/antiInspect';
import { sendProposalResponse } from './utils/email';

export default function App() {
  const config = CONFIG;

  const [evasionCount, setEvasionCount] = useState(0);
  const [noTransform, setNoTransform] = useState({ x: 0, y: 0, rot: 0 });
  const [isEvading, setIsEvading] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef(null);
  const posIndexRef = useRef(-1);

  // Initialize anti-inspect protection
  useEffect(() => {
    const showToast = () => {
      setToastVisible(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2600);
    };

    const cleanup = initAntiInspect(() => {
      showToast();
    });

    return () => {
      cleanup();
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Toggle audio mute
  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  // Helper to pick next evasive offset - strictly within the visible card & page area
  const getNextOffset = (currentIndex) => {
    const cardWidth = Math.min(window.innerWidth - 60, 480);
    const scaleFactor = cardWidth / 480;

    const offsets = [
      { x: 95 * scaleFactor, y: -65 * scaleFactor, rot: 4 },
      { x: -160 * scaleFactor, y: -55 * scaleFactor, rot: -5 },
      { x: 80 * scaleFactor, y: 65 * scaleFactor, rot: 3 },
      { x: -145 * scaleFactor, y: 60 * scaleFactor, rot: -4 },
      { x: -175 * scaleFactor, y: 0, rot: -6 },
      { x: 105 * scaleFactor, y: 0, rot: 5 },
      { x: -20 * scaleFactor, y: -85 * scaleFactor, rot: -3 },
      { x: 25 * scaleFactor, y: 70 * scaleFactor, rot: 4 },
      { x: -90 * scaleFactor, y: -65 * scaleFactor, rot: -4 },
      { x: 90 * scaleFactor, y: -30 * scaleFactor, rot: 3 }
    ];

    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * offsets.length);
    } while (nextIdx === currentIndex && offsets.length > 1);

    return { offset: offsets[nextIdx], index: nextIdx };
  };

  // Runaway "ဟင့်အင်း" button dodge engine
  // Moves smoothly with bouncy spring animation around the card, never off-screen
  const handleEvadeNoButton = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isYesClicked) return;

    soundEffects.playBoing();

    const { offset, index } = getNextOffset(posIndexRef.current);
    posIndexRef.current = index;

    setNoTransform({
      x: Math.round(offset.x),
      y: Math.round(offset.y),
      rot: offset.rot
    });

    setIsEvading(true);
    setEvasionCount((prev) => prev + 1);
  };

  // "ဟုတ်" (Yes) Click Action
  const handleYesClick = async () => {
    if (isYesClicked) return;
    setIsYesClicked(true);

    // 1. Play celebration chime
    soundEffects.playCelebration();

    // 2. Blast romantic confetti
    triggerRomanticConfetti();

    // 3. Send email to htetaung.dev@gmail.com via SMTP
    setEmailStatus('sending');
    try {
      const result = await sendProposalResponse({
        answer: 'YES',
        evasionCount
      });
      setEmailStatus(result.success ? 'sent' : 'sent');
    } catch {
      setEmailStatus('sent');
    }

    // 4. Open Custom Romantic Alert Dialog Box Modal
    setIsAlertOpen(true);
  };

  const triggerRomanticConfetti = () => {
    // Stage 1: Central firework
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4b72', '#ff758c', '#ffccd5', '#ffd166', '#ffffff']
    });

    // Stage 2: Left & right bursts
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff3366', '#ff758c', '#ffffff']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff3366', '#ff758c', '#ffffff']
      });
    }, 280);

    // Stage 3: Heart fountain
    setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#ff4b72', '#ff8fa3', '#fff0f3']
      });
    }, 600);
  };

  // Dynamic texts and styles
  const currentNoText = config.evasionTexts[evasionCount % config.evasionTexts.length];
  const yesScale = Math.min(1.35, 1 + evasionCount * 0.04);

  return (
    <div className="app-container">
      {/* Floating background hearts */}
      <FloatingHearts />

      {/* Subtle Sound toggle in top right */}
      <div className="top-controls">
        <button
          className="icon-btn"
          onClick={handleToggleMute}
          title={isMuted ? 'အသံဖွင့်မည်' : 'အသံပိတ်မည်'}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Main Glassmorphism Proposal Card */}
      <main className="proposal-card" id="proposal-card">
        <div className="mascot-wrapper">
          <img
            src={isYesClicked ? '/bear-celebrate.jpg' : '/bear-asking.jpg'}
            alt="Cute Proposal Mascot"
            className="mascot-image"
          />
          <div className="mascot-badge" aria-hidden="true">
            {isYesClicked ? '🎉' : '❤️'}
          </div>
        </div>

        <h1 className="question-title">
          {config.question}
        </h1>

        <p className="question-subtitle">
          {isYesClicked
            ? 'ကလေးလေးဆီက "ဟုတ်" ဆိုတဲ့အဖြေလေး ကြားရလို့ အရမ်းပျော်တယ် ကလေးလေးရယ်... 🥰'
            : config.subQuestion}
        </p>

        {/* Buttons Group */}
        <div className="buttons-group">
          {/* Yes Button */}
          <button
            id="yes-btn"
            className={`btn-yes ${evasionCount > 0 ? 'btn-yes-pulse' : ''}`}
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesScale})`
            }}
          >
            <Heart size={22} fill="white" />
            <span>{config.yesButtonText}</span>
          </button>

          {/* Runaway No Button (Always visible on card, glides with spring animation) */}
          <button
            id="no-btn"
            className={`btn-no ${isEvading ? 'evading' : ''}`}
            onMouseEnter={handleEvadeNoButton}
            onPointerOver={handleEvadeNoButton}
            onPointerEnter={handleEvadeNoButton}
            onTouchStart={handleEvadeNoButton}
            onClick={handleEvadeNoButton}
            style={{
              transform: isEvading
                ? `translate(${noTransform.x}px, ${noTransform.y}px) rotate(${noTransform.rot}deg)`
                : 'translate(0px, 0px) rotate(0deg)'
            }}
          >
            <span>{currentNoText}</span>
          </button>
        </div>

        {/* Playful evasion hint */}
        {evasionCount > 0 && !isYesClicked && (
          <div className="evasion-badge">
            <Sparkles size={14} color="#ff3366" />
            <span>ဟင့်အင်းကို {evasionCount} ကြိမ် ရှောင်ပြေးခဲ့ပြီးပါပြီ 🙈</span>
          </div>
        )}
      </main>

      {/* Romantic Alert Modal */}
      <CustomAlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        emailStatus={emailStatus}
        config={config}
      />

      {/* Anti-Inspect Toast Notification */}
      <AntiInspectToast
        message={config.antiInspect.toastMessage}
        visible={toastVisible}
      />

      {/* Footer (Clean, no config inputs) */}
      <footer className="app-footer">
        <span>Made with ❤️ for someone special</span>
      </footer>
    </div>
  );
}
