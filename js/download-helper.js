/**
 * Undertale FR - Module Téléchargements & Point de Sauvegarde
 * 
 * Téléchargements directs natifs sans pop-up intempestive.
 * Interaction du Point de Sauvegarde dans le pied de page.
 */

(function () {
    'use strict';

    // Gestion interactive du Point de Sauvegarde dans le footer
    function initSavePointInteraction() {
        const star = document.getElementById('savepoint-star');
        const feedback = document.getElementById('savepoint-feedback');
        if (!star) return;

        let saveTimeout = null;

        star.addEventListener('click', () => {
            star.classList.add('star-activated');
            if (feedback) {
                feedback.innerHTML = '<span class="save-flash-msg">* [FICHIER SAUVEGARDÉ]</span>';
            }

            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                star.classList.remove('star-activated');
                if (feedback) {
                    feedback.innerHTML = '';
                }
            }, 3000);
        });

        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                star.click();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSavePointInteraction);
    } else {
        initSavePointInteraction();
    }
})();
