import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function fileForFrame(index, { basePath, extension, filePrefix, zeroPad }) {
  const frameNumber = String(index + 1).padStart(zeroPad, '0');
  return `${basePath}/${filePrefix}${frameNumber}.${extension}`;
}

export default function ScrollFrameCanvas({ config, reducedMotion }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [ready, setReady] = useState(false);

  const frameUrls = useMemo(
    () => Array.from({ length: config.totalFrames }, (_, i) => fileForFrame(i, config)),
    [config],
  );

  useEffect(() => {
    if (reducedMotion) return;
    let destroyed = false;
    const ctx = canvasRef.current.getContext('2d');

    const draw = (idx) => {
      const image = imagesRef.current[idx];
      if (!image || !image.complete) return;

      const canvas = canvasRef.current;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const imageAspect = image.width / image.height;
      const canvasAspect = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let x = 0;
      let y = 0;

      if (imageAspect > canvasAspect) {
        drawHeight = height;
        drawWidth = drawHeight * imageAspect;
        x = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = drawWidth / imageAspect;
        y = (height - drawHeight) / 2;
      }

      ctx.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const loadImage = (url, idx) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
        img.onload = () => {
          imagesRef.current[idx] = img;
          resolve();
        };
        img.onerror = resolve;
      });

    const boot = async () => {
      const preloads = frameUrls.slice(0, config.preloadCount).map(loadImage);
      await Promise.all(preloads);
      if (destroyed) return;
      setReady(true);
      draw(0);

      frameUrls.slice(config.preloadCount).forEach((url, idx) => {
        loadImage(url, idx + config.preloadCount);
      });

      const state = { frame: 0 };
      gsap.to(state, {
        frame: config.totalFrames - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
        onUpdate: () => draw(state.frame),
      });
    };

    boot();

    const onResize = () => {
      const canvas = canvasRef.current;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(0);
      ScrollTrigger.refresh();
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [config, frameUrls, reducedMotion]);

  return (
    <section ref={containerRef} className="hero-scroll-wrap" aria-label="Cinematic dirty breakfast hero">
      {!reducedMotion ? <canvas ref={canvasRef} className="hero-canvas" /> : <div className="hero-fallback" />}
      <div className="hero-overlay">
        <p className="badge">NAPKINS REQUIRED</p>
        <h1>BREAKFAST GONE DIRTY</h1>
        <p className="lede">FRIED. SOUTHERN. DIRTY.</p>
        <div className="cta-row">
          <a href="#order" className="btn btn-primary">ORDER NOW</a>
          <a href="#menu" className="btn btn-secondary">VIEW MENU</a>
        </div>
        {!ready && !reducedMotion && <small>Heating the skillet…</small>}
      </div>
    </section>
  );
}
