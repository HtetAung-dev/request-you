import React, { useMemo } from 'react';

export function FloatingHearts() {
  const hearts = useMemo(() => {
    const items = [];
    const colors = ['#ff4b72', '#ff758c', '#ff8fa3', '#ffccd5', '#ffb3c1'];
    const emojis = ['💖', '💕', '✨', '🌸', '💘', '💗', '🥰'];

    for (let i = 0; i < 28; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${5 + Math.random() * 7}s`,
        delay: `${Math.random() * 6}s`,
        size: `${14 + Math.random() * 20}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
    return items;
  }, []);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
            color: h.color
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
