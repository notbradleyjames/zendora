import { SpatialScene } from './lib/spatial-scene.js';

// Boot spatial background
const _scene = new SpatialScene(document.getElementById('spatial-bg'));

// Virtual File System representing Zendora
const fileSystem = {
  id: 'root',
  name: 'Zendora',
  type: 'folder',
  theme: 'folder-system',
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
    },
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
    },
    {
      id: 'readme',
      name: 'README.md',
      type: 'file',
      extension: 'md'
    }
  ]
};

// State
let pathStack = [fileSystem];
let currentFolder = fileSystem;

// DOM Elements
const fileGrid = document.getElementById('file-grid');
const breadcrumb = document.getElementById('breadcrumb');
const btnBack = document.getElementById('btn-back');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const itemCount = document.getElementById('item-count');
const clock = document.getElementById('clock');

// Initialization
function init() {
  renderCurrentFolder();
  setupEventListeners();
  updateClock();
  setInterval(updateClock, 60000); // UI Clock
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Find folder by ID recursively
function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Render Folder Contents
function renderCurrentFolder() {
  fileGrid.innerHTML = '';
  
  // Update UI Elements
  btnBack.style.opacity = pathStack.length > 1 ? '1' : '0.5';
  btnBack.style.cursor = pathStack.length > 1 ? 'pointer' : 'default';
  
  // Breadcrumb
  breadcrumb.textContent = pathStack.map(p => p.name).join(' > ');
  itemCount.textContent = `${currentFolder.children ? currentFolder.children.length : 0} items`;

  // Render Grid
  if (currentFolder.children) {
    currentFolder.children.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'grid-item';
      
      if (item.type === 'folder') {
        const logoHTML = item.logoUrl 
          ? `<img src="${item.logoUrl}" class="tool-img-logo" alt="${item.name}">` 
          : `<span class="tool-logo">${item.iconText || ''}</span>`;

        itemEl.innerHTML = `
          <div class="folder-icon ${item.theme}">
            <div class="folder-back"></div>
            <div class="folder-front">${logoHTML}</div>
          </div>
          <div class="item-name">${item.name}</div>
        `;
        
        itemEl.addEventListener('dblclick', () => {
          pathStack.push(item);
          currentFolder = item;
          updateSidebarActive();
          renderCurrentFolder();
        });
      } else {
        // File Rendering
        itemEl.innerHTML = `
          <div class="file-icon">${item.extension}</div>
          <div class="item-name">${item.name}</div>
        `;
      }
      
      fileGrid.appendChild(itemEl);
    });
  } else {
    fileGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); margin-top: 40px;">This folder is empty</div>';
  }
}

function updateSidebarActive() {
  sidebarItems.forEach(el => el.classList.remove('active'));
  // Simple matching logic
  const match = Array.from(sidebarItems).find(el => el.dataset.path === currentFolder.id);
  if (match) match.classList.add('active');
}

function setupEventListeners() {
  // Back button
  btnBack.addEventListener('click', () => {
    if (pathStack.length > 1) {
      pathStack.pop();
      currentFolder = pathStack[pathStack.length - 1];
      updateSidebarActive();
      renderCurrentFolder();
    }
  });

  // Sidebar navigation
  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      sidebarItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      
      const pathId = item.dataset.path;
      const action = item.dataset.action;

      if (action === 'insights') {
        alert("Action Triggered: Running the /insights operational audit...");
        return;
      }

      if (pathId === 'root') {
        pathStack = [fileSystem];
        currentFolder = fileSystem;
        renderCurrentFolder();
      } else {
        const found = findNodeById(fileSystem, pathId);
        if (found) {
          // Rebuild stack up to root is complex, here we just jump directly
          pathStack = [fileSystem, found];
          currentFolder = found;
          renderCurrentFolder();
        }
      }
    });
  });
}

init();
