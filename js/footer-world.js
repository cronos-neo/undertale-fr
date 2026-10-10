/**
 * Undertale FR - Footer World Interactions
 * Événements immersifs : Sans (Bad Time Event), Toby Dog (Dog Residue & Sprint), Flowey & Fleur Écho.
 */

(function () {
    'use strict';

    // Synthétiseur audio 8-bit Web Audio API (aucun fichier externe requis, zéro latence)
    function play8BitTone(freq, type, duration, volume = 0.1, delay = 0) {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            const ctx = new AudioContextClass();
            if (ctx.state === 'suspended') ctx.resume();

            const t = ctx.currentTime + delay;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(volume, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            osc.stop(t + duration);
        } catch (e) {}
    }

    // Aboiement 8-bit authentique de Toby Dog
    function playUndertaleBark() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            const ctx = new AudioContextClass();
            if (ctx.state === 'suspended') ctx.resume();

            function makeWoof(delay, f1, f2) {
                const t = ctx.currentTime + delay;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f1, t);
                osc.frequency.exponentialRampToValueAtTime(f2, t + 0.08);

                gain.gain.setValueAtTime(0.25, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.10);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(t);
                osc.stop(t + 0.11);
            }

            makeWoof(0, 480, 160);
            makeWoof(0.12, 540, 180);
        } catch (e) {}
    }

    // Mélodie culte Dog Song (Toby Fox)
    function playDogSongJingle() {
        const notes = [
            { f: 293.66, d: 0.11 }, // D4
            { f: 369.99, d: 0.11 }, // F#4
            { f: 440.00, d: 0.11 }, // A4
            { f: 493.88, d: 0.16 }, // B4
            { f: 440.00, d: 0.11 }, // A4
            { f: 369.99, d: 0.11 }, // F#4
            { f: 293.66, d: 0.24 }  // D4
        ];

        let delay = 0;
        notes.forEach(n => {
            play8BitTone(n.f, 'square', n.d, 0.10, delay);
            delay += n.d + 0.02;
        });
    }

    // Riff Megalovania (D4-D4-D5-A4) pour l'éveil de Sans
    function playMegalovaniaIntro() {
        const notes = [
            { f: 293.66, d: 0.13 }, // D4
            { f: 293.66, d: 0.13 }, // D4
            { f: 587.33, d: 0.18 }, // D5
            { f: 440.00, d: 0.28 }  // A4
        ];

        let delay = 0;
        notes.forEach(n => {
            play8BitTone(n.f, 'square', n.d, 0.14, delay);
            delay += n.d + 0.01;
        });
    }

    // Bruit d'impact / transition combat Undertale
    function playEncounterNoise() {
        play8BitTone(150, 'sawtooth', 0.25, 0.25);
        play8BitTone(80, 'triangle', 0.35, 0.30);
    }

    // Gestion du ciel étoilé sous-terrain
    function initFooterStars() {
        const canvas = document.getElementById('footer-stars-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let stars = [];
        const STAR_COUNT = 45;

        function resize() {
            const footer = canvas.parentElement;
            if (!footer) return;
            width = footer.clientWidth;
            height = footer.clientHeight;
            canvas.width = width;
            canvas.height = height;

            if (stars.length === 0) {
                for (let i = 0; i < STAR_COUNT; i++) {
                    stars.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: Math.random() < 0.25 ? 3 : (Math.random() < 0.6 ? 2 : 1),
                        speed: 0.15 + Math.random() * 0.35,
                        opacity: 0.2 + Math.random() * 0.7,
                        pulseSpeed: 0.01 + Math.random() * 0.02,
                        pulseDir: Math.random() < 0.5 ? 1 : -1
                    });
                }
            }
        }

        window.addEventListener('resize', resize);
        resize();

        function render() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];

                s.y += s.speed;
                if (s.y > height - 36) {
                    s.y = 0;
                    s.x = Math.random() * width;
                }

                s.opacity += s.pulseSpeed * s.pulseDir;
                if (s.opacity > 0.9) {
                    s.opacity = 0.9;
                    s.pulseDir = -1;
                } else if (s.opacity < 0.2) {
                    s.opacity = 0.2;
                    s.pulseDir = 1;
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
            }

            requestAnimationFrame(render);
        }

        render();
    }

    function initStageInteractions() {
        const toby = document.getElementById('toby-walker');
        const flowey = document.getElementById('stage-flowey');
        const echoFlower = document.getElementById('stage-echo-flower');
        const sans = document.getElementById('stage-sans');
        const speechBubble = document.getElementById('footer-pixel-speech');

        let speechTimer = null;
        function showBubble(text, duration = 3600) {
            if (!speechBubble) return;
            if (speechTimer) clearTimeout(speechTimer);
            speechBubble.textContent = text;
            speechBubble.classList.add('visible');
            speechTimer = setTimeout(() => {
                speechBubble.classList.remove('visible');
            }, duration);
        }

        // ====================================================================
        // INTERACTION SANS : CYCLE SOMMEIL -> ALERTE -> BAD TIME EVENT
        // ====================================================================
        if (sans) {
            let sansClicks = 0;
            let isSansEventActive = false;

            sans.addEventListener('click', () => {
                if (isSansEventActive) return;
                sansClicks++;

                const snoreEl = document.getElementById('sans-snore');

                if (sansClicks === 1) {
                    play8BitTone(300, 'sine', 0.12, 0.08);
                    showBubble('* zzzzzzz...', 2800);
                } else if (sansClicks === 2) {
                    play8BitTone(350, 'sine', 0.12, 0.08);
                    showBubble('* heh. tu devrais essayer de faire une sieste toi aussi, petit.', 3200);
                } else if (sansClicks === 3) {
                    play8BitTone(260, 'sawtooth', 0.2, 0.12);
                    showBubble('* tu insistes vraiment ? fais gaffe, tu vas passer un mauvais quart d\'heure.', 3800);
                } else {
                    // ÉVÉNEMENT MAJEUR : BAD TIME INITIALIZATION
                    isSansEventActive = true;
                    sansClicks = 0;

                    // 1. Écran noir flash Undertale
                    playEncounterNoise();
                    const flashOverlay = document.createElement('div');
                    flashOverlay.className = 'ut-screen-flash-overlay';
                    document.body.appendChild(flashOverlay);
                    setTimeout(() => flashOverlay.remove(), 250);

                    // 2. Pause du ronflement et apparition de l'œil bleu/jaune flamboyant
                    if (snoreEl) snoreEl.style.display = 'none';

                    let eyeFlame = sans.querySelector('.sans-bad-time-eye');
                    if (!eyeFlame) {
                        eyeFlame = document.createElement('div');
                        eyeFlame.className = 'sans-bad-time-eye';
                        sans.appendChild(eyeFlame);
                    }
                    eyeFlame.classList.add('ignited');
                    sans.classList.add('sans-wide-awake');

                    // 3. Riff Megalovania
                    setTimeout(() => {
                        playMegalovaniaIntro();
                        showBubble('* heh heh heh... je rigolais. c\'est juste une belle journée dehors.', 4500);
                    }, 280);

                    // 4. Retour au calme progressif
                    setTimeout(() => {
                        if (eyeFlame) eyeFlame.classList.remove('ignited');
                        sans.classList.remove('sans-wide-awake');
                        if (snoreEl) snoreEl.style.display = '';
                        isSansEventActive = false;
                    }, 5200);
                }
            });
        }

        // ====================================================================
        // INTERACTION TOBY FOX DOG : SPRINT & RÉSIDUS DE CHIEN
        // ====================================================================
        if (toby) {
            let tobyClicks = 0;
            let isTobyRampage = false;

            function spawnDogResidue(x, y) {
                const residue = document.createElement('div');
                residue.className = 'toby-dog-residue-particle';
                residue.textContent = Math.random() < 0.5 ? '🦴' : '✨';
                residue.style.left = `${x}px`;
                residue.style.top = `${y}px`;
                document.body.appendChild(residue);
                setTimeout(() => residue.remove(), 1200);
            }

            toby.addEventListener('click', (e) => {
                if (isTobyRampage) return;
                tobyClicks++;

                playUndertaleBark();

                if (tobyClicks < 3) {
                    toby.classList.add('toby-barking');
                    setTimeout(() => toby.classList.remove('toby-barking'), 400);

                    const replies = [
                        '* Ouah ! (Le chien ennuyeux absorbe votre clic avec insolence.)',
                        '* Ouah ! (Vous vérifiez votre inventaire... Il est plein de résidus de chien.)'
                    ];
                    showBubble(replies[(tobyClicks - 1) % replies.length], 3200);
                } else {
                    // ÉVÉNEMENT SPÉCIAL : LE SPRINT FOU DE TOBY
                    isTobyRampage = true;
                    tobyClicks = 0;

                    playDogSongJingle();
                    toby.classList.add('toby-sprint-rampage');

                    showBubble('* Ouah ! (Le chien ennuyeux s\'enfuit en volant vos cookies de session !)', 4200);

                    // Particules de résidu de chien
                    const rect = toby.getBoundingClientRect();
                    const interval = setInterval(() => {
                        const curRect = toby.getBoundingClientRect();
                        spawnDogResidue(curRect.left + 14, curRect.top + 6);
                    }, 180);

                    setTimeout(() => {
                        clearInterval(interval);
                        toby.classList.remove('toby-sprint-rampage');
                        toby.classList.add('toby-spin');
                        setTimeout(() => {
                            toby.classList.remove('toby-spin');
                            isTobyRampage = false;
                        }, 800);
                    }, 2400);
                }
            });
        }

        // Clic sur Flowey la Fleur
        if (flowey) {
            const floweyQuotes = [
                '* Coucou ! Je suis FLOWEY. FLOWEY la fleur !',
                '* Dans ce monde... C\'EST TUER OU ÊTRE TUÉ !',
                '* Tu croyais vraiment pouvoir m\'ignorer ? Hi hi hi...',
                '* Ne sois pas bête. Tu sais très bien ce qui t\'attend.'
            ];
            let floweyIndex = 0;

            flowey.addEventListener('click', () => {
                play8BitTone(620, 'sawtooth', 0.15, 0.12);
                showBubble(floweyQuotes[floweyIndex % floweyQuotes.length], 3400);
                floweyIndex++;
            });
        }

        // Clic sur la Fleur Écho
        if (echoFlower) {
            const echoQuotes = [
                '* (Une fleur écho répète les paroles de quelqu\'un d\'autre...)',
                '* « N\'abandonne jamais. Reste déterminé ! »',
                '* (Une douce berceuse souterraine résonne dans la cascade...)',
                '* « J\'aimerais tellement voir les vraies étoiles un jour... »'
            ];
            let echoIndex = 0;

            echoFlower.addEventListener('click', () => {
                play8BitTone(440, 'sine', 0.35, 0.15);
                play8BitTone(554.37, 'sine', 0.45, 0.12, 0.08);
                showBubble(echoQuotes[echoIndex % echoQuotes.length], 3400);
                echoIndex++;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initFooterStars();
            initStageInteractions();
        });
    } else {
        initFooterStars();
        initStageInteractions();
    }
})();
