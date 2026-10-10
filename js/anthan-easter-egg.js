/**
 * Undertale FR - Easter Egg Anthan
 * Running gag communautaire : variantes orthographiques imprévisibles du pseudonyme d'Anthan.
 */

(function () {
    'use strict';

    const ANTHAN_VARIANTS = [
        // Classiques & running gag canon
        'Anthan',
        'Anatan',
        'Natation',
        'Manathan',
        'Athanan',
        'Antan',
        'Manhattan',
        'Anthane',
        'Anhtan',
        'Ananas-Tan',
        'A-ton-avis',
        'Antarctique',
        'Anthozoaire',
        'Anathème',
        'Anthocyane',
        'A.N.T.H.A.N. (Modèle Mk. II)',
        'Anthanos (Maître des 6 Âmes)',
        'Antenne 2',
        'Anesthésiant',
        'Nathanaël le Bref',
        'Jonathan (attends, quoi ?)',
        'Anthan (ou son double maléfique)',
        'Nâthan (circonflexe sauvage)',
        '[ANTHAN NON TROUVÉ - 404]',
        'Toby Fox déguisé en Anthan',
        'Anathomic',
        'Anticonstitutionnel-than',
        'L\'homme aux mille voyelles',
        'Le gars dont on écorche le nom',
        'Anathan',
        'Natation Synchronisée',
        'Manhattan Project',
        'Anathomy of Grey',
        'Anatholien Sauvage',
        'Anthracite v2.0',
        'Anthanium-235',
        'Antananarivo',
        'A.N.T.H.A.N. (Patch Protocol)',
        'Nâthan l\'Indomptable',
        '404 Pseudo Not Found',
        'Anthan de Givre',
        'L\'homme sans voyelle fixe',
        'Anathème Céleste',
        'Anthan (Nom Provisoire)',
        'Ananas-Titan',
        'En-Attendant-Godot',
        'Antha-na-na-na-na',
        'Papyrus l\'appelle Anthan',
        'Anthan.exe a cessé de fonctionner',

        // Arc Re:Zero & Jeux de mots en "-tan" (Dédicace Otaku)
        'Emilia-tan (Fan de Re:Zero démasqué)',
        'Anatan-tan (D.M.T : Déesse Majestueuse Traductrice)',
        'Rem-than (Qui est Rem d\'ailleurs ?)',
        'Subaru-than (Mort Réversible du Patch)',
        'Beako-than (Je suppose, en fait)',
        'Satella-tan (L\'Amour Obscur du Lore)',
        'Pételgeuse Rom-Anthan-Contee (Le cerveau tremble !)',
        'Tantantan-than',
        'Tan-Tan le Reporter de l\'Outremonde',
        'Tantacule-than (Calamar céleste)',
        'Tangente-than (Il fuit le dialogue)',
        'Tantal-than (Le supplice de la trad)',
        'Tanzanite-than (Pierre précieuse du Sous-sol)',
        'Tandoori-than (Épicé à 200°C)'
    ];

    const GLITCH_CHARS = '░▒▓█▄▀■▲▼◆#&@?!/\\*';

    let currentVariantIndex = 0;
    let isGlitching = false;
    let tooltipEl = null;

    function createCustomTooltip() {
        if (tooltipEl) return tooltipEl;
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'anthan-custom-tooltip';
        tooltipEl.setAttribute('role', 'status');
        tooltipEl.setAttribute('aria-live', 'polite');
        tooltipEl.innerHTML = '<span class="anthan-tooltip-icon">*</span><span class="anthan-tooltip-text">(Un frisson parcourt son pseudonyme...)</span>';
        document.body.appendChild(tooltipEl);
        return tooltipEl;
    }

    function positionTooltip(target) {
        if (!tooltipEl) return;
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        
        const viewportWidth = window.innerWidth;
        const targetCenterX = rect.left + (rect.width / 2);
        
        let left = targetCenterX - (tooltipRect.width / 2);
        const padding = 12;

        if (left < padding) {
            left = padding;
        } else if (left + tooltipRect.width > viewportWidth - padding) {
            left = viewportWidth - tooltipRect.width - padding;
        }

        let top = rect.top - tooltipRect.height - 10;
        if (top < 10) {
            top = rect.bottom + 10;
        }

        tooltipEl.style.top = `${Math.round(top)}px`;
        tooltipEl.style.left = `${Math.round(left)}px`;
    }

    function showCustomTooltip(target) {
        const tooltip = createCustomTooltip();
        tooltip.classList.add('visible');
        positionTooltip(target);
    }

    function hideCustomTooltip() {
        if (tooltipEl) {
            tooltipEl.classList.remove('visible');
        }
    }

    function getRandomVariant(excludeCurrent = true) {
        if (!excludeCurrent) {
            return ANTHAN_VARIANTS[Math.floor(Math.random() * ANTHAN_VARIANTS.length)];
        }
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * ANTHAN_VARIANTS.length);
        } while (nextIndex === currentVariantIndex && ANTHAN_VARIANTS.length > 1);
        currentVariantIndex = nextIndex;
        return ANTHAN_VARIANTS[currentVariantIndex];
    }

    function generateGlitchText(targetLength) {
        let res = '';
        for (let i = 0; i < targetLength; i++) {
            res += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
        return res;
    }

    function applyGlitchEffect(element, finalWord, duration = 320) {
        if (isGlitching) return;
        isGlitching = true;

        const originalText = element.textContent;
        const targetLen = Math.max(originalText.length, finalWord.length);
        const startTime = Date.now();
        element.classList.add('anthan-is-glitching');

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
                clearInterval(interval);
                element.textContent = finalWord;
                element.classList.remove('anthan-is-glitching');
                isGlitching = false;
            } else {
                element.textContent = generateGlitchText(targetLen);
            }
        }, 35);
    }

    function triggerVariantChange(element, withGlitch = true) {
        if (!element) return;
        const nextWord = getRandomVariant(true);
        if (withGlitch) {
            applyGlitchEffect(element, nextWord);
        } else {
            element.textContent = nextWord;
        }
    }

    function initAnthanEasterEgg() {
        const targets = document.querySelectorAll('.anthan-glitch-target');
        if (!targets.length) return;

        targets.forEach(target => {
            target.removeAttribute('title');
            target.style.cursor = 'pointer';

            target.addEventListener('mouseenter', () => {
                showCustomTooltip(target);
                if (Math.random() < 0.40 && !isGlitching) {
                    triggerVariantChange(target, true);
                }
            });

            target.addEventListener('mouseleave', () => {
                hideCustomTooltip();
            });

            target.addEventListener('click', (e) => {
                e.preventDefault();
                triggerVariantChange(target, true);
                if (tooltipEl) {
                    const textEl = tooltipEl.querySelector('.anthan-tooltip-text');
                    if (textEl) {
                        textEl.textContent = '(Son nom refuse d\'exister sous une seule forme...)';
                    }
                    positionTooltip(target);
                }
            });
        });

        // Détection de visibilité (changement d'onglet)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                targets.forEach(target => {
                    triggerVariantChange(target, false);
                });
            }
        });

        // Glitch subtil occasionnel
        setInterval(() => {
            if (!document.hidden && !isGlitching && Math.random() < 0.30) {
                targets.forEach(target => {
                    triggerVariantChange(target, true);
                });
            }
        }, 28000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnthanEasterEgg);
    } else {
        initAnthanEasterEgg();
    }
})();
