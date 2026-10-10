// ==============================================================================
// PIXEL MATRIX ENGINE : INSPIRÉ DU PORTFOLIO CRONOS.BUILD
// Trame procédurale de dalles pixel animées avec masque de profondeur radial
// ==============================================================================

(function() {
    function initPixelMatrix() {
        const wrapper = document.createElement('div');
        wrapper.className = 'hero-pixel-wrapper';
        wrapper.setAttribute('aria-hidden', 'true');

        const canvas = document.createElement('canvas');
        canvas.className = 'hero-pixel-canvas';
        wrapper.appendChild(canvas);

        const mask = document.createElement('div');
        mask.className = 'hero-pixel-mask';
        wrapper.appendChild(mask);

        // Insère au tout début du body
        document.body.prepend(wrapper);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        const colorPalette = Array(64);
        const strokePalette = Array(64);

        for (let i = 0; i < 64; i++) {
            const t = (i / 63) * 2 - 1;
            const n = Math.floor(18 + (t + 1) * 22);
            const r = Math.min(0.65, Math.max(0.08, 0.15 + (t + 1) * 0.18));
            colorPalette[i] = `rgba(${n + 10}, ${n + 10}, ${n + 22}, ${r.toFixed(3)})`;
            strokePalette[i] = `rgba(255, 255, 255, ${(r * 0.28).toFixed(3)})`;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        let frame = 0;
        let animId = null;
        let isVisible = true;

        function render() {
            if (!isVisible) return;
            frame += 0.01;
            ctx.clearRect(0, 0, width, height);

            const tileSize = 24;
            const innerSize = 22;
            const cols = Math.ceil(width / tileSize);
            const rows = Math.ceil(height / tileSize);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const wave = (Math.sin(x * 0.13 + frame * 0.45) * Math.cos(y * 0.13 - frame * 0.35) + Math.sin((x + y) * 0.07 - frame * 0.25)) * 0.5;
                    const noise = ((x * 17 + y * 31) % 11) / 10;
                    
                    if (noise + wave * 0.5 > 0.34) {
                        const px = x * tileSize;
                        const py = y * tileSize;
                        const colorIdx = Math.max(0, Math.min(63, Math.floor((wave + 1) * 0.5 * 63)));

                        ctx.fillStyle = colorPalette[colorIdx];
                        ctx.fillRect(px, py, innerSize, innerSize);

                        if (wave > 0.18) {
                            ctx.strokeStyle = strokePalette[colorIdx];
                            ctx.lineWidth = 1;
                            ctx.strokeRect(px + 0.5, py + 0.5, innerSize - 1, innerSize - 1);
                        }
                    }
                }
            }

            animId = requestAnimationFrame(render);
        }

        // Observer de visibilité pour suspendre en tâche d'arrière-plan
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isVisible = false;
                if (animId) cancelAnimationFrame(animId);
            } else {
                isVisible = true;
                animId = requestAnimationFrame(render);
            }
        });

        animId = requestAnimationFrame(render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPixelMatrix);
    } else {
        initPixelMatrix();
    }
})();
