const projects = [
    {
        name: 'KeeperHub',
        category: 'Sistema de gerenciamento',
        image: 'main/assets/keeperhub-main.png',
        summary: 'Sistema web modular para gerenciamento e organização de informações.',
        description: 'O KeeperHub é um projeto desenvolvido em equipe com uma arquitetura modular, tendo como um de seus principais módulos o Controle de Medicamentos. Durante o desenvolvimento, trabalhei na construção e organização de interfaces, estrutura de componentes e fluxo de desenvolvimento utilizando Git e branches.',
        details: [
            'Desenvolvimento de interfaces e componentes web.',
            'Estrutura modular para facilitar manutenção e expansão.',
            'Desenvolvimento do módulo de Controle de Medicamentos.',
            'Uso de Git e branches para organização do projeto.',
            'Organização do código visando facilitar o trabalho em equipe.'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Git', 'MySQL', 'Express'],
        links: [
            { label: 'Código', url: 'https://github.com/pjlkaw/KeeperHub' }
        ]
    },

    {
        name: 'Lumin',
        category: 'IA de Terminal',
        image: 'main/assets/lumin.png',
        summary: 'IA personalizada para auxiliar em atividades diretamente pelo terminal.',
        description: 'Usando a Groq API, construí a Lumin com um sistema de modos, onde cada modo acionado por comandos proporciona um tipo diferente de resposta. O projeto foi importante para consolidar meus conhecimentos em APIs, Node.js, Express e aplicações executadas diretamente pelo terminal.',
        details: [
            'Integração com a Groq API.',
            'Sistema de modos acionados por comandos.',
            'Aplicação de console executada pelo terminal.',
            'Uso de Node.js e Express.',
            'Estilização e organização da experiência no terminal.'
        ],
        tech: ['Node.js', 'JavaScript', 'Express', 'Groq API'],
        links: []
    },

    {
        name: 'SpoPlayer',
        category: 'Spotify API',
        image: 'main/assets/kittyplayer.png',
        summary: 'Player musical com integração à Spotify API e sistema de temas.',
        description: 'Projeto desenvolvido para explorar integração com APIs, autenticação e construção de uma experiência musical interativa. Também implementei diferentes temas visuais e sistemas de modais para tornar a aplicação mais personalizada.',
        details: [
            'Integração com a Spotify API.',
            'Sistema de busca de músicas.',
            'Autenticação utilizando OAuth 2.0.',
            'Sistema de temas e personalização visual.',
            'Criação de modais e componentes interativos.'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'API'],
        links: []
    },

    {
        name: 'DeCode',
        category: 'Ferramenta de codificação',
        image: null,
        summary: 'Aplicação para codificar e decodificar textos utilizando diferentes métodos.',
        description: 'O DeCode é uma ferramenta desenvolvida para praticar lógica de programação e manipulação do DOM. A aplicação permite transformar textos utilizando diferentes métodos de codificação e decodificação, proporcionando uma experiência prática com JavaScript.',
        details: [
            'Manipulação do DOM com JavaScript.',
            'Aplicação de lógica condicional.',
            'Implementação de Base64, César, Morse e ROT13.',
            'Interface interativa para entrada e saída de dados.'
        ],
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { label: 'Site', url: 'https://pjlkaw.github.io/decode' },
            { label: 'Código', url: 'https://github.com/pjlkaw/decode' }
        ]
    }
];
function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = projects.map((project) => `
        <article class="project-card" data-project="${project.name}">
            ${project.image
                ? `<img src="${project.image}" alt="${project.name}" loading="lazy">`
                : `<div class="project-image-placeholder" role="img" aria-label="Imagem de ${project.name}"><i class="fa-solid fa-code"></i><span>${project.name}</span></div>`}
            <div class="project-body">
                <span>${project.category}</span>
                <h3>${project.name}</h3>
                <p>${project.summary}</p>
                <div class="project-meta">
                    ${project.tech.slice(0, 3).map((tag) => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');

    container.querySelectorAll('.project-card img').forEach((image) => {
        image.addEventListener('error', () => {
            image.alt = 'Imagem do projeto indisponível';
            image.classList.add('image-missing');
        }, { once: true });
    });

    container.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', () => {
            const selected = projects.find((project) => project.name === card.dataset.project);
            if (!selected) return;
            openProjectModal(selected);
        });
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    const description = project.description || project.summary;
    const details = project.details?.length
        ? `<ul>${project.details.map((item) => `<li>${item}</li>`).join('')}</ul>`
        : '';
    const links = project.links?.length
        ? `<div class="links">
            ${project.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} <i class="fa-solid fa-link"></i></a>`).join('')}
        </div>`
        : '';

    modalBody.innerHTML = `
        ${project.image
            ? `<img src="${project.image}" alt="${project.name}">`
            : `<div class="project-image-placeholder" role="img" aria-label="Imagem de ${project.name}"><i class="fa-solid fa-code"></i><span>${project.name}</span></div>`}
        <h3 id="modal-title">${project.name}</h3>
        <p>${description}</p>
        ${details}
        ${links}
    `;

    modalBody.querySelector('img')?.addEventListener('error', (event) => {
        event.currentTarget.alt = 'Imagem do projeto indisponível';
        event.currentTarget.classList.add('image-missing');
    }, { once: true });

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function initEmailCopy() {
    const buttons = document.querySelectorAll('[data-email]');

    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            const email = button.dataset.email;

            try {
                await navigator.clipboard.writeText(email);
                const originalText = button.innerHTML;
                button.innerHTML = 'E-mail copiado! <i class="fa-solid fa-check"></i>';

                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 1200);
            } catch (error) {
                window.location.href = `mailto:${email}`;
            }
        });
    });
}

function initFeaturedGallery() {
    const featuredImage = document.querySelector('.featured-media > img');
    const thumbnails = document.querySelectorAll('.thumbnail-button');

    if (!featuredImage || !thumbnails.length) return;

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            const thumbnailImage = thumbnail.querySelector('img');
            if (!thumbnailImage) return;

            const mainSrc = featuredImage.getAttribute('src');
            const mainAlt = featuredImage.alt;
            const thumbnailSrc = thumbnailImage.getAttribute('src');
            const thumbnailAlt = thumbnailImage.alt;

            featuredImage.src = thumbnailSrc;
            featuredImage.alt = thumbnailAlt;
            thumbnailImage.src = mainSrc;
            thumbnailImage.alt = mainAlt;

            thumbnail.setAttribute('aria-label', `Visualizar ${mainAlt}`);
        });
    });
}

function initModalControls() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('[data-close="true"]');

    closeButton?.addEventListener('click', closeProjectModal);
    backdrop?.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
}

function initPageNavigation() {
    const header = document.querySelector('.site-header');
    const pageLinks = document.querySelectorAll('[data-page]');

    if (!header || !pageLinks.length) return;

    const setPage = (page) => {
        const aboutMode = page === 'about';
        header.classList.toggle('about-mode', aboutMode);

        const aboutView = document.getElementById('about');
        aboutView?.setAttribute('aria-hidden', String(!aboutMode));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    pageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            setPage(link.dataset.page);
            history.replaceState(null, '', link.getAttribute('href'));
        });
    });

    if (window.location.hash === '#about') {
        setPage('about');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initEmailCopy();
    initFeaturedGallery();
    initModalControls();
    initPageNavigation();
});
