//Inicializar Funções com o doc
document.addEventListener("DOMContentLoaded", function() {
    img_projeto_destaque();
});

// Imagens Projeto Destaque
function img_projeto_destaque() {
    const main = document.getElementById('img_principal');
    const mini = document.querySelectorAll('.mini');

    mini.forEach(img => {
        img.addEventListener('click', () => {
            const mainSrc = main.getAttribute('src');
            const clickedSrc = img.getAttribute('src');

            main.classList.add('fade-out');

            setTimeout(() => {
                main.setAttribute('src', clickedSrc);
                main.classList.remove('fade-out');
                main.classList.add('fade-in');

                img.setAttribute('src', mainSrc);
            }, 200);

            setTimeout(() => {
                main.classList.remove('fade-in');
            }, 400);
        });
    });
}    