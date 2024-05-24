import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef } from "react";

function App() {
  const noOfFrame = 256;
  // const noOfFrame = 653;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const images = useMemo(() => {
    const loadedImages = [];

    for (let i = 1; i <= noOfFrame; i++) {
      const img = new Image();
      // img.src = `/images/${i}.webp`
      img.src = `/troll/${i}.webp`;

      loadedImages.push(img);
    }

    return loadedImages;
  }, []);

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, noOfFrame]);

  const render = useCallback(
    (i) => {
      if (images[i - 1]) {
        ref.current?.getContext("2d").drawImage(images[i - 1], 0, 0);
      }
    },
    [images]
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  return (
    <div style={{ height: "5000px", background: "black" }}>
      <div style={{ height: "900px" }} />

      <div style={{ position: "relative", height: "100vh" }}>
        <canvas
          ref={ref}
          style={{
            position: "fixed",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={1000}
          height={1778}
        ></canvas>
      </div>
      
      <div style={{ height: "3000px" }} />
    </div>
  );
}

export default App;
