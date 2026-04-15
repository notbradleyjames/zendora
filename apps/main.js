// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Virtual File System representing Zendora
const fileSystem = {
  id: 'root',
  name: 'Zendora',
  type: 'folder',
  theme: 'folder-system',
  children: [
    {
      id: 'apps',
      name: 'Apps',
      type: 'folder',
      theme: 'folder-design',
      iconText: '📱',
      children: [
        { id: 'hub', name: 'Dashboard UI', type: 'folder', theme: 'folder-system', iconText: '⌘' }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      type: 'folder',
      theme: 'folder-marketing',
      iconText: '🏢',
      children: [
        {
          id: 'brand',
          name: 'Brand',
          type: 'folder',
          theme: 'folder-default',
          iconText: '🎨'
        },
        {
          id: 'clients',
          name: 'Clients',
          type: 'folder',
          theme: 'folder-default',
          iconText: '🤝'
        },
        {
          id: 'operations',
          name: 'Operations',
          type: 'folder',
          theme: 'folder-system',
          iconText: '⚙️',
          children: [
            {
              id: 'tools',
              name: 'Tools Stack',
              type: 'folder',
              theme: 'folder-tools',
              iconText: '🛠️',
              children: [
                { id: 'firecrawl', name: 'Firecrawl', type: 'folder', theme: 'folder-tools', logoUrl: 'https://mintlify.s3.us-west-1.amazonaws.com/firecrawl/logo/logo.png' },
                { id: 'chatgpt', name: 'ChatGPT', type: 'folder', theme: 'folder-ai', iconText: 'GPT' },
                { id: 'cursor', name: 'Cursor', type: 'folder', theme: 'folder-system', iconText: '⌨️' },
                { id: 'github', name: 'GitHub', type: 'folder', theme: 'folder-system', iconText: 'GH' },
                { id: 'n8n', name: 'n8n', type: 'folder', theme: 'folder-social', iconText: '⚡' },
                { id: 'notion', name: 'Notion', type: 'folder', theme: 'folder-default', iconText: 'N' },
                { id: 'make', name: 'Make', type: 'folder', theme: 'folder-design', iconText: 'M' }
              ]
            },
            { id: 'insights', name: 'Insights', type: 'folder', theme: 'folder-marketing', iconText: '📈' },
            { id: 'SOPs', name: 'SOPs', type: 'folder', theme: 'folder-default', iconText: '📋' },
            { id: 'finance', name: 'Finance', type: 'folder', theme: 'folder-marketing', iconText: '💳' }
          ]
        },
        {
          id: 'services',
          name: 'Services',
          type: 'folder',
          theme: 'folder-design',
          iconText: '🚀',
          children: [
            { id: 'ai-automations', name: 'AI Automations', type: 'folder', theme: 'folder-ai', iconText: '🤖' },
            { id: 'digital-design', name: 'Digital Design', type: 'folder', theme: 'folder-design', iconText: '✨' },
            { id: 'marketing', name: 'Marketing', type: 'folder', theme: 'folder-marketing', iconText: '📣' },
            { id: 'social-media', name: 'Social Media', type: 'folder', theme: 'folder-social', iconText: '📱' },
            { id: 'freelance-gigs', name: 'Freelance Gigs', type: 'folder', theme: 'folder-default', iconText: '💼' }
          ]
        }
      ]
    },
    {
      id: 'hermes_core',
      name: 'Hermes Core',
      type: 'folder',
      theme: 'folder-ai',
      iconText: '⚡',
      children: [
        {
          id: 'skills',
          name: 'Skills',
          type: 'folder',
          theme: 'folder-ai',
          iconText: '🧠',
          children: [
            { id: 'ai-prompts', name: 'AI Prompts', type: 'folder', theme: 'folder-ai', iconText: '💬' },
            { id: 'automation-recipes', name: 'Recipes', type: 'folder', theme: 'folder-social', iconText: '🍳' },
            { id: 'content-frameworks', name: 'Frameworks', type: 'folder', theme: 'folder-marketing', iconText: '🏗️' }
          ]
        },
        {
          id: '.agents',
          name: '.agents',
          type: 'folder',
          theme: 'folder-system',
          iconText: '🕵️'
        }
      ]
    },
    {
      id: 'readme',
      name: 'README.md',
      type: 'file',
      extension: 'md'
    }
  ]
};


// ---------- Mobile Menu ----------
const menuToggle = document.getElementById('menu-toggle');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
menuClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---------- Scroll Reveal ----------
const revealEls = document.querySelectorAll(
  '.hero-eyebrow, .hero-title, .hero-desc, .hero-actions, .hero-stats, ' +
  '.section-title, .see-all, .section-tag, ' +
  '.service-card, .work-card, .process-step, .pricing-card, ' +
  '.contact-box, .footer-wordmark, .footer-tagline, .footer-copy'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));
