//Inicializar Funções com o doc
document.addEventListener("DOMContentLoaded", function() {
    img_projeto_destaque();
    scroll_tela();
    copiar_email();
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

// Scroll tela
function scroll_tela() {
    const menu_sobre_mim = document.getElementById('sobre_mim');
    const menu_projetos = document.getElementById('projetos');
    const menu_contato = document.getElementById('contato');

    const sec_sobre_mim = document.querySelector('.sobre_mim .sub_titulo');
    const sec_projetos = document.querySelector('.projetos .sub_titulo');
    const sec_contato = document.querySelector('.contato .sub_titulo');

    menu_sobre_mim.addEventListener('click', () => {
        sec_sobre_mim.scrollIntoView({ behavior: 'smooth' });
    });
    menu_projetos.addEventListener('click', () => {
        sec_projetos.scrollIntoView({ behavior: 'smooth' });
    });
    menu_contato.addEventListener('click', () => {
        sec_contato.scrollIntoView({ behavior: 'smooth' });
    });

}

//Carregar Projetos
function carregar_projeto(pokesearch) {
    fetch('main/html/' + pokesearch + '.html')
        .then(response => response.text())
        .then(html => {
            //carregar projeto
            const projeto = document.getElementById('conteudo_projeto').innerHTML = html;
            projeto.return;
            //carregar css
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'main/css/' + pokesearch + '.css';
            document.head.appendChild(link);
            //fechar 
            const fechar = document.querySelector('.fechar');
            fechar.addEventListener('click', () => {
                const projeto = document.getElementById('conteudo_projeto').innerHTML = '';
                projeto.return;
            });
            //scroll para conteudo do projeto
            const conteudo_projeto = document.getElementById('conteudo_projeto');
            conteudo_projeto.scrollIntoView({ behavior: 'smooth' });
            setInterval(() => {
                conteudo_projeto.style.boxShadow = 'var(--branco) 0px 0px 10px';
                setTimeout(() => {
                    conteudo_projeto.style.boxShadow = 'none';
                }, 1000)
            }, 1000);
        })
        .catch(error => {
            alert('Erro ao carregar o projeto');
            console.error(error);
        });
}

//Copiar email
function copiar_email() {
    const email = document.querySelector('.links p');

    email.addEventListener('click', () => {
        const text = email.textContent;
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Email copiado!');
            })
            .catch(() => {
                alert('Erro ao copiar email!');
            });
    })
}