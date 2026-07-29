import {CONFETTI_PIECES } from './../data/database';
const Confetti = () => {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
      {CONFETTI_PIECES.map(p => (
        <div
          key={p.id}
          className="absolute top-[-10%]"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.width,
            height: p.height,
            borderRadius: p.shape,
            animation: `confetti-fall ${p.animationDuration} linear ${p.animationDelay} forwards`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;