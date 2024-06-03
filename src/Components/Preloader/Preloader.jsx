import React, { useState, useEffect } from 'react';
import "./Preloader.scss"

const Preloader = () => {
  const [phrases, setPhrases] = useState([]);
  const checkmarkIdPrefix = "loadingCheckSVG-";
  const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
  const verticalSpacing = 50;

  const createPhraseSvg = (phrase, yOffset) => (
    <text fill="white" x={50} y={yOffset} fontSize={18} fontFamily="Arial">{phrase}...</text>
  );

  const createCheckSvg = (yOffset, index) => (
    <g transform={`translate(10, ${yOffset - 20}) scale(0.9)`}>
      <circle id={`${checkmarkCircleIdPrefix}${index}`} fill="rgba(255, 255, 255, 0)" cx={16} cy={16} r={15} />
      <polygon id={`${checkmarkIdPrefix}${index}`} points="21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708" fill="rgba(255, 255, 255, 1)" />
      <path d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z" fill="white" />
    </g>
  );

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    const phrasesArray = shuffleArray([
      "Feeding unicorns", "Grabbing tasks", "Collating conversations",
      "Reticulating splines", "Pondering emptiness", "Considering alternatives",
      "Shuffling bits", "Celebrating moments",
    ]);

    setPhrases(phrasesArray);

  }, []);

  useEffect(() => {
    const start_time = new Date().getTime();
  
    const animateLoading = () => {
      const upward_moving_group = document.getElementById("phrases");
      if (upward_moving_group) {
        if (!upward_moving_group.currentY) {
          upward_moving_group.currentY = 0; // Initialize currentY if it doesn't exist
        }
        const checks = phrases.map((_, i) => ({
          check: document.getElementById(checkmarkIdPrefix + i),
          circle: document.getElementById(checkmarkCircleIdPrefix + i)
        }));
        const now = new Date().getTime();
        upward_moving_group.setAttribute("transform", `translate(0, ${upward_moving_group.currentY})`);
        upward_moving_group.currentY -= 1.35 * easeInOut(now);
        checks.forEach((check, i) => {
          const color_change_boundary = -i * verticalSpacing + verticalSpacing + 15;
          if (upward_moving_group.currentY < color_change_boundary) {
            const alpha = Math.max(Math.min(1 - (upward_moving_group.currentY - color_change_boundary + 15) / 30, 1), 0);
            check.circle.setAttribute("fill", `rgba(255, 255, 255, ${alpha})`);
            const check_color = [
              Math.round(255 * (1 - alpha) + 120 * alpha),
              Math.round(255 * (1 - alpha) + 154 * alpha)
            ];
            check.check.setAttribute("fill", `rgba(255, ${check_color[0]}, ${check_color[1]}, 1)`);
          }
        });
        if (now - start_time < 30000 && upward_moving_group.currentY > -710) {
          requestAnimationFrame(animateLoading);
        }
      }
    };
  
    animateLoading(); // Initial call to start the animation
  
    return () => cancelAnimationFrame(animateLoading);
  }, [phrases]);
  

  const easeInOut = (t) => {
    const period = 200;
    return (Math.sin(t / period + 100) + 1) / 2;
  };

  return (
    <div id="page">
      <div id="phrase_box">
        <svg width="100%" height="100%">
          <defs>
            <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <linearGradient id="linearGradient" gradientUnits="objectBoundingBox" x2="0" y2="1">
                <stop stopColor="white" stopOpacity={0} offset="0%" />
                <stop stopColor="white" stopOpacity={1} offset="30%" />
                <stop stopColor="white" stopOpacity={1} offset="70%" />
                <stop stopColor="white" stopOpacity={0} offset="100%" />
              </linearGradient>
              <rect width="100%" height="100%" fill="url(#linearGradient)" />
            </mask>
          </defs>
          <g id="phrases" width="100%" height="100%" style={{ mask: 'url(#mask)' }}>
            {phrases.map((phrase, index) => (
              <React.Fragment key={index}>
                {createPhraseSvg(phrase, 30 + verticalSpacing * index)}
                {createCheckSvg(30 + verticalSpacing * index, index)}
              </React.Fragment>
            ))}
          </g>
        </svg>
      </div>
      <div id="footer">
        <div id="logo">Company</div>
      </div>
    </div>
  );
};

export default Preloader;
