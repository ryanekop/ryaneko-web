"use client";

import { motion } from "framer-motion";

const confettiColors = [
    "#f97316",
    "#facc15",
    "#22c55e",
    "#0ea5e9",
    "#2563eb",
    "#7c3aed",
    "#e11d48",
    "#f472b6",
    "#06b6d4",
];

const confettiPieces = Array.from({ length: 54 }, (_, index) => {
    const lane = (index * 37) % 100;
    const size = 7 + ((index * 13) % 12);
    const drift = -90 + ((index * 29) % 181);
    const startsFromLeft = index % 5 === 0;
    const startsFromRight = index % 7 === 0;

    return {
        id: index,
        color: confettiColors[index % confettiColors.length],
        delay: (index % 18) * 0.08,
        duration: 3.8 + ((index * 11) % 14) / 10,
        left: startsFromLeft ? -4 : startsFromRight ? 104 : lane,
        top: -8 - ((index * 17) % 30),
        width: size * 0.72,
        height: size * 1.45,
        drift:
            startsFromLeft
                ? Math.abs(drift) + 120
                : startsFromRight
                  ? -Math.abs(drift) - 120
                  : drift,
        rotate: -180 + ((index * 47) % 360),
    };
});

export function PurchaseConfetti() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden motion-reduce:hidden"
        >
            {confettiPieces.map((piece) => (
                <motion.span
                    key={piece.id}
                    className="absolute block rounded-[2px] shadow-sm"
                    initial={{
                        x: 0,
                        y: `${piece.top}vh`,
                        rotate: piece.rotate,
                        opacity: 0,
                    }}
                    animate={{
                        x: piece.drift,
                        y: "112vh",
                        rotate: piece.rotate + 540,
                        opacity: [0, 0.95, 0.9, 0],
                    }}
                    transition={{
                        delay: piece.delay,
                        duration: piece.duration,
                        ease: "easeOut",
                        times: [0, 0.12, 0.72, 1],
                    }}
                    style={{
                        left: `${piece.left}%`,
                        width: piece.width,
                        height: piece.height,
                        backgroundColor: piece.color,
                    }}
                />
            ))}
        </div>
    );
}
