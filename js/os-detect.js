// ==============================================================================
// GESTIONNAIRE D'OS & CONSOLE DE TÉLÉCHARGEMENT DIRECT
// Détection automatique native (Linux / Steam Deck / Windows) avec logos vectoriels officiels
// ==============================================================================

const SVG_WIN = `
<svg width="16" height="16" viewBox="0 0 88 88" fill="currentColor" style="flex-shrink:0;">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.005 45.7zm4.326-39.027L87.914 0v41.527l-47.918.376zm47.918 39.992l-.028 41.657-47.89-6.732V46.685z"/>
</svg>
`;

const SVG_LINUX = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
    <path d="M12 2c-2.4 0-4 1.8-4 4.3 0 1.2.3 2.5.6 3.6-1.5.5-2.6 1.8-2.6 3.5 0 1.5.8 2.8 2 3.5-.2.8-.5 1.5-1 2.5 1.5 0 3-.5 4.5-1.5.5.2 1 .3 1.5.3s1-.1 1.5-.3c1.5 1 3 1.5 4.5 1.5-.5-1-.8-1.7-1-2.5 1.2-.7 2-2 2-3.5 0-1.7-1.1-3-2.6-3.5.3-1.1.6-2.4.6-3.6 0-2.5-1.6-4.3-4-4.3z"/>
</svg>
`;

function detectUserOS() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const plat = (navigator.platform || '').toLowerCase();
    
    // Détection Linux & Steam Deck
    if (ua.includes('steamdeck') || ua.includes('linux') || plat.includes('linux') || plat.includes('x11')) {
        return 'linux';
    }
    return 'windows';
}

function renderDownloadConsole(game, selectedOS) {
    const targetsEl = document.getElementById('os-download-targets');
    const statusEl = document.getElementById('console-os-status');
    if (!targetsEl) return;

    if (statusEl) {
        if (selectedOS === 'linux') {
            statusEl.innerHTML = `<span>● SYSTÈME SÉLECTIONNÉ : GNU/LINUX & STEAM DECK</span>`;
        } else {
            statusEl.innerHTML = `<span>● SYSTÈME SÉLECTIONNÉ : MICROSOFT WINDOWS</span>`;
        }
    }

    if (game === 'yellow') {
        if (selectedOS === 'linux') {
            targetsEl.innerHTML = `
                <a href="downloads/Undertale-FR-Patcher" download class="dl-action-primary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Patcheur Automatique Linux (v2.2.6)</span>
                        <span class="dl-subtext-note">Exécutable pour Linux & Steam Deck · Détecte votre jeu automatiquement</span>
                    </div>
                    <span class="dl-badge-size">9.54 Mo (ELF)</span>
                </a>
                <a href="downloads/Undertale.Yellow.v1_1PatchFr.zip" download class="dl-action-secondary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Repack Standalone Complet (v1.1 FR)</span>
                        <span class="dl-subtext-note">Jeu complet prêt à jouer · Compatible Steam Deck & Proton directement</span>
                    </div>
                    <span class="dl-badge-size">235 Mo (.ZIP)</span>
                </a>
            `;
        } else {
            targetsEl.innerHTML = `
                <a href="downloads/Undertale-FR-Patcher.exe" download class="dl-action-primary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Patcheur Automatique Windows (v2.2.6)</span>
                        <span class="dl-subtext-note">Application graphique · Détecte automatiquement votre version Steam / DRM-Free</span>
                    </div>
                    <span class="dl-badge-size">2.49 Mo (.EXE)</span>
                </a>
                <a href="downloads/Undertale.Yellow.v1_1PatchFr.zip" download class="dl-action-secondary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Repack Standalone Complet (v1.1 FR)</span>
                        <span class="dl-subtext-note">Jeu complet pré-patché en français · Décompressez et lancez directement</span>
                    </div>
                    <span class="dl-badge-size">235 Mo (.ZIP)</span>
                </a>
            `;
        }
    } else if (game === 'red-yellow') {
        if (selectedOS === 'linux') {
            targetsEl.innerHTML = `
                <a href="downloads/Undertale-FR-Patcher" download class="dl-action-primary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Patcheur Automatique Linux (v2.2.6)</span>
                        <span class="dl-subtext-note">Binaire natif autonome · Compatible distributions GNU/Linux et Steam Deck</span>
                    </div>
                    <span class="dl-badge-size">9.54 Mo (ELF)</span>
                </a>
                <a href="downloads/Undertale.Red.and.Yellow.v2.1.4.FR.Linux.zip" download class="dl-action-secondary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Repack Linux Natif (v2.1.4 FR)</span>
                        <span class="dl-subtext-note">Binaire natif complet sans aucune couche d'émulation Wine</span>
                    </div>
                    <span class="dl-badge-size">268 Mo (.ZIP)</span>
                </a>
            `;
        } else {
            targetsEl.innerHTML = `
                <a href="downloads/Undertale-FR-Patcher.exe" download class="dl-action-primary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Patcheur Automatique Windows (v2.2.6)</span>
                        <span class="dl-subtext-note">Application graphique autonome · Patche Undertale original en un clic</span>
                    </div>
                    <span class="dl-badge-size">2.49 Mo (.EXE)</span>
                </a>
                <a href="downloads/Undertale.Red.and.Yellow.v2.1.4.FR.Windows.zip" download class="dl-action-secondary">
                    <div class="dl-col-info">
                        <span class="dl-title-text">Télécharger le Repack Standalone Complet (v2.1.4 FR)</span>
                        <span class="dl-subtext-note">Jeu complet pré-patché autonome · Décompressez et jouez directement</span>
                    </div>
                    <span class="dl-badge-size">217 Mo (.ZIP)</span>
                </a>
            `;
        }
    }
}

function setupOSCenter(game) {
    const detected = detectUserOS();
    let currentOS = detected;

    const winBtn = document.getElementById('tab-win');
    const linuxBtn = document.getElementById('tab-linux');

    function updateView() {
        if (winBtn) winBtn.classList.toggle('active', currentOS === 'windows');
        if (linuxBtn) linuxBtn.classList.toggle('active', currentOS === 'linux');
        renderDownloadConsole(game, currentOS);
    }

    if (winBtn) {
        winBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentOS = 'windows';
            updateView();
        });
    }

    if (linuxBtn) {
        linuxBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentOS = 'linux';
            updateView();
        });
    }

    updateView();
}

function toggleFaqDrawer(btn) {
    const drawer = btn.closest('.faq-drawer');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    const symbol = btn.querySelector('.faq-symbol');
    
    if (isOpen) {
        drawer.classList.remove('open');
        if (symbol) symbol.textContent = '+';
    } else {
        drawer.classList.add('open');
        if (symbol) symbol.textContent = '−';
    }
}
