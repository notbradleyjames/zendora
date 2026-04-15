<script>
  import { onMount, afterUpdate } from 'svelte';
  
  let ws;
  let messageInput = '';
  let chatHistory = [];
  let chatContainer;
  let fileInput;
  let isUploading = false;

  const WS_URL = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/chat';
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  onMount(() => {
    connectWebSocket();
    return () => {
      if (ws) ws.close();
    };
  });

  afterUpdate(() => {
    // Auto-scroll to bottom of chat
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  function connectWebSocket() {
    ws = new WebSocket(WS_URL);
    
    ws.onopen = () => {
      chatHistory = [...chatHistory, { sender: 'system', text: 'Connected to Hermes Backend.' }];
    };

    ws.onmessage = (event) => {
      chatHistory = [...chatHistory, { sender: 'hermes', text: event.data }];
    };

    ws.onclose = () => {
      chatHistory = [...chatHistory, { sender: 'system', text: 'Disconnected from Hermes. Reconnecting in 3s...' }];
      setTimeout(connectWebSocket, 3000);
    };
  }

  function sendMessage() {
    if (!messageInput.trim()) return;
    
    chatHistory = [...chatHistory, { sender: 'user', text: messageInput }];
    
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(messageInput);
    } else {
      chatHistory = [...chatHistory, { sender: 'system', text: 'Error: WebSocket not connected.' }];
    }
    
    messageInput = '';
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function uploadFile(file) {
    if (!file) return;
    isUploading = true;
    chatHistory = [...chatHistory, { sender: 'system', text: `Uploading file: ${file.name}...` }];
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      chatHistory = [...chatHistory, { sender: 'system', text: `Upload successful: ${data.filename}` }];
    } catch (e) {
      chatHistory = [...chatHistory, { sender: 'system', text: `Upload failed: ${e.message}` }];
    } finally {
      isUploading = false;
    }
  }
  
  function triggerFileInput() {
    fileInput.click();
  }

  function onFileSelected(e) {
    const file = e.target.files[0];
    uploadFile(file);
    e.target.value = '';
  }

  function renderMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1 rounded text-accent">$1</code>')
      .replace(/\n/g, '<br/>');
  }
</script>

<main class="flex flex-col h-screen bg-darker w-full mx-auto overflow-hidden relative">
  <!-- Header -->
  <header class="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-dark/80 backdrop-blur z-10">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      <h1 class="text-xl font-semibold tracking-tight text-white">Zendora Command Center</h1>
    </div>
    <div class="flex items-center gap-2">
      <span class="relative flex h-3 w-3">
        {#if ws && ws.readyState === WebSocket.OPEN}
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        {:else}
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        {/if}
      </span>
      <span class="text-xs text-slate-400 uppercase font-medium tracking-wider">
        {#if ws && ws.readyState === WebSocket.OPEN} Hermes Online {:else} Offline {/if}
      </span>
    </div>
  </header>

  <!-- Chat Area -->
  <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-darker/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark to-darker">
    {#if chatHistory.length === 0}
      <div class="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
        <svg class="w-16 h-16 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <p>Awaiting operational directives...</p>
      </div>
    {/if}
    
    {#each chatHistory as msg}
      <div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
        <div class="flex items-end gap-3 max-w-[85%] lg:max-w-[70%] {msg.sender === 'user' ? 'flex-row-reverse' : ''}">
          {#if msg.sender === 'hermes'}
            <div class="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-sm shadow border border-slate-700 shrink-0">🤖</div>
          {/if}
          
          <div class="px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed 
            {msg.sender === 'user' ? 'bg-accent text-white rounded-br-none' : 
             msg.sender === 'system' ? 'bg-slate-800/50 text-slate-400 text-xs text-center mx-auto border border-slate-700/50' : 
             'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'}">
            {@html renderMarkdown(msg.text)}
          </div>
        </div>
        {#if msg.sender !== 'system'}
          <span class="text-[10px] text-slate-500 mt-1 px-11">{msg.sender === 'user' ? 'You' : 'Hermes'}</span>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Input Area -->
  <div class="p-4 bg-dark/95 backdrop-blur border-t border-slate-800">
    <div class="max-w-4xl mx-auto flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl p-2 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all shadow-inner">
      
      <button on:click={triggerFileInput} disabled={isUploading} class="p-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50" title="Upload File">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>
      </button>
      <input type="file" bind:this={fileInput} on:change={onFileSelected} class="hidden" />

      <textarea 
        bind:value={messageInput}
        on:keydown={handleKeyDown}
        placeholder="Message Hermes..." 
        class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-slate-200 resize-none max-h-32 min-h-[44px] py-2.5 px-2 placeholder:text-slate-500 font-sans"
        rows="1"></textarea>

      <button on:click={sendMessage} disabled={!messageInput.trim()} class="p-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-accent/10 disabled:hover:text-accent flex items-center justify-center shrink-0 h-11 w-11 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
      </button>
    </div>
    <div class="text-center mt-3">
      <p class="text-[10px] text-slate-600">Hermes AI OS • Zendora Studio Dashboard</p>
    </div>
  </div>
</main>
