const projects = [
    {
        name: 'StepUp',
        category: 'E-commerce concept',
        image: 'main/assets/StepUp_logo.jpg',
        summary: 'Projeto de conceito para loja digital com foco em marca, UX e visual moderno.',
        description: 'O StepUp foi criado para unir identidade visual, organização de conteúdo e desenvolvimento front-end em um projeto coeso. A ideia foi apresentar uma loja virtual com uma marca forte, navegação clara e visual impactante.',
        details: [
            'Criação de identidade visual e proposta de marca.',
            'Estrutura modular para facilitar ajustes e manutenção.',
            'Layout responsivo pensado para diferentes dispositivos.',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Figma'],
        links: [
            { label: 'Site', url: 'https://pjlkaw.github.io/StepUp/' },
            { label: 'Código', url: 'https://github.com/pjlkaw/StepUp' }
        ]
    },
    {
        name: 'PokeSearch',
        category: 'API + busca',
        image: 'main/assets/PokeSearch.png',
        summary: 'Aplicação para consultar informações de Pokémon usando a PokeAPI.',
        description: 'Este projeto foi essencial para entender consumo de APIs públicas e lógica de interação com dados dinâmicos. A aplicação busca e apresenta informações como nome, habilidades, tipos e imagem dos Pokémon.',
        details: [
            'Consumo de API pública com JavaScript.',
            'Manipulação dinâmica de dados e renderização.',
            'Interface simples e direta para visualização de resultados.',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'API'],
        links: [
            { label: 'Site', url: 'https://pjlkaw.github.io/PokeSearch/' },
            { label: 'Código', url: 'https://github.com/pjlkaw/PokeSearch' }
        ]
    },
    {
        name: 'DeCode',
        category: 'Ferramenta de codificação',
        image: 'main/assets/decode_img.png',
        summary: 'Aplicação para converter textos em diversas formas de codificação.',
        description: 'O DeCode foi um projeto dedicado a praticar lógica de programação e manipulação do DOM. Ele permite explorar diferentes métodos de codificação e decodificação em uma interface didática.',
        details: [
            'Prática com lógica condicional e estruturas de repetição.',
            'Manipulação do DOM com JavaScript.',
            'Exploração de métodos como Base64, César, Morse e ROT13.',
        ],
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { label: 'Site', url: 'https://pjlkaw.github.io/decode' },
            { label: 'Código', url: 'https://github.com/pjlkaw/decode' }
        ]
    },
    {
        name: 'AutoSender',
        category: 'Automação',
        image: 'main/assets/autosender_img.png',
        summary: 'Script em Python para automatizar envio de mensagens via WhatsApp Web.',
        description: 'O AutoSender foi desenvolvido para explorar automação de tarefas em Python e integração com interfaces externas. O projeto ajudou a praticar lógica, controle de tempo e estrutura de scripts.',
        details: [
            'Uso de Python para tarefas automatizadas.',
            'Automação de mensagens por WhatsApp Web.',
            'Aplicação prática de lógica e organização de código.',
        ],
        tech: ['Python'],
        links: [
            { label: 'Código', url: 'https://github.com/pjlkaw/autosender' }
        ]
    },
    {
        name: 'Login & Signup',
        category: 'Back-end básico',
        image: 'main/assets/cadastro_login.png',
        summary: 'Sistema simples de cadastro e login com Node.js e persistência em JSON.',
        description: 'Este projeto foi uma introdução prática ao desenvolvimento back-end, com cadastro, autenticação e armazenamento em arquivo JSON. Também foi importante para entender rotas e fluxo de requisições.',
        details: [
            'Estrutura básica de autenticação.',
            'Persistência de dados em JSON.',
            'Introdução ao Node.js e lógica server-side.',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        links: [
            { label: 'Site', url: 'https://pjlkaw.github.io/login_cadastro' },
            { label: 'Código', url: 'https://github.com/pjlkaw/login_cadastro' }
        ]
    }
];

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = projects.map((project) => `
        <article class="project-card" data-project="${project.name}">
            <img src="${project.image}" alt="${project.name}">
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

    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.name}">
        <h3 id="modal-title">${project.name}</h3>
        <p>${project.description}</p>
        <ul>
            ${project.details.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <div class="links">
            ${project.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} <i class="fa-solid fa-link"></i></a>`).join('')}
        </div>
    `;

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
    initModalControls();
    initPageNavigation();
});
