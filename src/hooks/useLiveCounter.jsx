import { useState, useEffect } from 'react';

const useLiveCounter = (startDate) => {
  const [time, setTime] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calcTime = () => {
      const now = new Date();
      const start = new Date(startDate);

      // Calculamos los años transcurridos
      let years = now.getFullYear() - start.getFullYear();
      const lastAnniversary = new Date(start);
      lastAnniversary.setFullYear(start.getFullYear() + years);

      // Si aún no se ha llegado al aniversario de este año, restamos 1
      if (now < lastAnniversary) {
        years--;
        lastAnniversary.setFullYear(start.getFullYear() + years);
      }

      // Tiempo transcurrido desde el último aniversario
      const diff = now - lastAnniversary;

      setTime({
        years,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    calcTime();
    const timer = setInterval(calcTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return time;
};

export default useLiveCounter;