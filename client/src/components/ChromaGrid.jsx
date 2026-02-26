import { useEffect, useRef, useState } from "react";

const demo = [
    {
        image: "/vite.svg",
        title: "ATHARVIX",
        subtitle: "Cyber Systems",
        borderColor: "#00f3ff",
        gradient: "linear-gradient(145deg,#00f3ff22,#020617)",
        url: "#",
    },
    {
        image: "/vite.svg",
        title: "Backend",
        subtitle: "Node • Linux",
        borderColor: "#a855f7",
        gradient: "linear-gradient(145deg,#a855f722,#020617)",
        url: "#",
    },
    {
        image: "/vite.svg",
        title: "Frontend",
        subtitle: "React • Vite",
        borderColor: "#00ff9d",
        gradient: "linear-gradient(145deg,#00ff9d22,#020617)",
        url: "#",
    },
    {
        image: "/vite.svg",
        title: "DevOps",
        subtitle: "Linux • Cloud",
        borderColor: "#bd00ff",
        gradient: "linear-gradient(145deg,#bd00ff22,#020617)",
        url: "#",
    },
];

export default function ChromaGrid({
    items,
    radius: radiusProp = 260,
    damping: dampingProp = 0.6,
    fadeOut: fadeOutProp = 0.8,
    enableSpotlight = true,
}) {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const radius = isMobile ? 160 : radiusProp;
    const damping = isMobile ? 0.9 : dampingProp;
    const fadeOut = fadeOutProp;

    const cards = items && items.length > 0 ? items : demo;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !enableSpotlight) return;

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            // Smooth lerp toward mouse
            current.current.x += (mouse.current.x - current.current.x) * (1 - damping);
            current.current.y += (mouse.current.y - current.current.y) * (1 - damping);

            const container = containerRef.current;
            if (container) {
                const articles = container.querySelectorAll("article");
                articles.forEach((article) => {
                    const rect = article.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const dx = current.current.x - cx;
                    const dy = current.current.y - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const strength = Math.max(0, 1 - dist / radius);
                    const faded = Math.pow(strength, fadeOut);

                    // Spotlight highlight via CSS variable
                    article.style.setProperty("--spotlight-opacity", faded.toFixed(3));
                    article.style.setProperty("--spotlight-x", `${((current.current.x - rect.left) / rect.width) * 100}%`);
                    article.style.setProperty("--spotlight-y", `${((current.current.y - rect.top) / rect.height) * 100}%`);
                });
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [mounted, damping, radius, fadeOut, enableSpotlight]);

    if (!mounted) return null;

    const cardSize = isMobile ? "100px" : "140px";

    return (
        <div
            ref={containerRef}
            className="chroma-grid-root"
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? "1.5rem" : "3rem",
                pointerEvents: "none",
                width: "100%",
                height: "100%",
                padding: "2rem",
            }}
        >
            {cards.map((c, i) => (
                <article
                    key={i}
                    style={{
                        pointerEvents: "auto",
                        position: "relative",
                        width: cardSize,
                        height: cardSize,
                        borderRadius: "16px",
                        border: `1px solid ${c.borderColor || "transparent"}`,
                        background: c.gradient || "transparent",
                        overflow: "hidden",
                        flexShrink: 0,
                        cursor: c.url && c.url !== "#" ? "pointer" : "default",
                        "--card-border": c.borderColor || "transparent",
                        "--spotlight-opacity": "0",
                        "--spotlight-x": "50%",
                        "--spotlight-y": "50%",
                    }}
                    onClick={() => {
                        if (c.url && c.url !== "#") window.open(c.url, "_blank");
                    }}
                >
                    {/* Spotlight overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.18) 0%, transparent 70%)`,
                            opacity: "var(--spotlight-opacity)",
                            pointerEvents: "none",
                            transition: "opacity 0.05s linear",
                        }}
                    />

                    {/* Card content */}
                    <div
                        style={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            gap: "0.4rem",
                            padding: "0.75rem",
                            textAlign: "center",
                        }}
                    >
                        {c.image && (
                            <img
                                src={c.image}
                                alt={c.title}
                                style={{
                                    width: isMobile ? "24px" : "32px",
                                    height: isMobile ? "24px" : "32px",
                                    opacity: 0.7,
                                    filter: `drop-shadow(0 0 6px ${c.borderColor || "#fff"})`,
                                }}
                            />
                        )}
                        <span
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: isMobile ? "0.55rem" : "0.65rem",
                                fontWeight: 700,
                                color: c.borderColor || "#fff",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                lineHeight: 1.2,
                            }}
                        >
                            {c.title}
                        </span>
                        <span
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: isMobile ? "0.5rem" : "0.58rem",
                                color: "rgba(255,255,255,0.5)",
                                letterSpacing: "0.05em",
                                lineHeight: 1.2,
                            }}
                        >
                            {c.subtitle}
                        </span>
                    </div>
                </article>
            ))}
        </div>
    );
}
