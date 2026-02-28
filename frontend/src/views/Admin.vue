<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
    
    <!-- Sidebar / Menu lateral -->
    <aside class="w-full md:w-64 bg-slate-900 text-white flex flex-col h-auto md:h-screen fixed md:relative z-20">
      <div class="p-6 border-b border-slate-800">
        <h2 class="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Backoffice SaaS</h2>
        <p class="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Painel Administrativo</p>
      </div>
      
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <a href="#" @click.prevent="aba = 'overview'" :class="aba === 'overview' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Visão Geral
        </a>
        <a href="#" @click.prevent="aba = 'departamentos'" :class="aba === 'departamentos' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          Departamentos
        </a>
        <a href="#" @click.prevent="aba = 'servicos'" :class="aba === 'servicos' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          Serviços
        </a>
        <a href="#" @click.prevent="aba = 'usuarios'" :class="aba === 'usuarios' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Usuários
        </a>
        <a href="#" @click.prevent="aba = 'guiches'" :class="aba === 'guiches' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
          Guichês
        </a>

        <!-- Divisor -->
        <div class="pt-2 pb-1 px-2">
          <span class="text-xs text-slate-600 uppercase tracking-widest font-semibold">Configurações</span>
        </div>

        <a href="#" @click.prevent="aba = 'painel'" :class="aba === 'painel' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Painel Monitor
        </a>
      </nav>
      
      <div @click="logout" class="p-6 border-t border-slate-800 text-sm flex gap-3 items-center cursor-pointer hover:bg-rose-900/40 transition-colors group">
        <div class="bg-gradient-to-r from-rose-400 to-orange-500 w-8 h-8 rounded-full flex-shrink-0"></div>
        <div class="flex flex-col flex-1">
          <span class="font-bold">{{ userNome }}</span>
          <span class="text-xs text-slate-400 group-hover:text-rose-400 transition-colors">Sair da Conta</span>
        </div>
        <svg class="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
      </div>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="flex-1 overflow-y-auto p-4 sm:p-8 md:ml-0 mt-20 md:mt-0">
      
      <!-- Top header de boas vindas -->
      <header class="mb-10 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight capitalize">{{ aba === 'painel' ? 'Painel Monitor' : aba }}</h1>
          <p class="text-slate-500 mt-2">Gerencie as configurações gerais da unidade.</p>
        </div>
        
        <div class="flex items-center gap-3">
          <button v-if="aba === 'overview'" @click="zerarSenhas" class="bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 font-semibold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 border border-rose-200 active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Zerar Senhas do Dia
          </button>
          <button v-if="aba !== 'overview' && aba !== 'painel'" @click="abrirModal" class="bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 transform active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Novo Registro
          </button>
        </div>
      </header>

      <!-- Loader Global -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
      </div>

      <template v-else>
        <!-- Visão Geral -->
        <section v-if="aba === 'overview'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500 font-semibold mb-1">Total Emitidos Hoje</p>
                <p class="text-4xl font-black text-slate-800">{{ estatisticas.totaisDiarios?.hoje || 0 }}</p>
              </div>
              <div class="bg-blue-50 text-blue-500 p-4 rounded-2xl"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg></div>
            </div>
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500 font-semibold mb-1">Pessoas na Fila (Aguardando)</p>
                <p class="text-4xl font-black text-rose-500">{{ estatisticas.totaisDiarios?.fila || 0 }}</p>
              </div>
              <div class="bg-rose-50 text-rose-500 p-4 rounded-2xl"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            </div>
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500 font-semibold mb-1">Membros Equipe</p>
                <p class="text-4xl font-black text-slate-800">{{ estatisticas.usuarios }}</p>
              </div>
              <div class="bg-amber-50 text-amber-500 p-4 rounded-2xl"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 class="font-bold text-slate-700 mb-6">Status dos Atendimentos Diários</h3>
               <div class="h-64 flex justify-center w-full">
                  <Bar 
                     v-if="estatisticas.graficoDiario"
                     :data="estatisticas.graficoDiario" 
                     :options="{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }" 
                  />
               </div>
            </div>
          </div>
        </section>

        <!-- ======================== -->
        <!--  ABA: PAINEL MONITOR     -->
        <!-- ======================== -->
        <section v-else-if="aba === 'painel'" class="space-y-8 max-w-4xl">

          <!-- Mídias -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="font-bold text-slate-800 text-lg">Playlist de Mídias</h3>
                <p class="text-slate-400 text-sm mt-0.5">Imagens e vídeos exibidos no Monitor (ordem da lista)</p>
              </div>
              <button @click="adicionarMidia" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-95">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Adicionar
              </button>
            </div>

            <!-- Formulário nova mídia inline -->
            <div v-if="novaMidiaVisivel" class="mb-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-end">
              <div class="flex-1">
                <label class="block text-xs font-semibold text-slate-500 mb-1">URL da Mídia *</label>
                <input v-model="novaMidia.url" type="url" placeholder="https://..." class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="w-full sm:w-52">
                <label class="block text-xs font-semibold text-slate-500 mb-1">Título</label>
                <input v-model="novaMidia.titulo" type="text" placeholder="Ex: Nossos Serviços" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="w-full sm:w-36">
                <label class="block text-xs font-semibold text-slate-500 mb-1">Tipo *</label>
                <select v-model="novaMidia.tipo" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="image">Imagem</option>
                  <option value="video">Vídeo</option>
                </select>
              </div>
              <div class="flex gap-2 shrink-0">
                <button @click="confirmarNovaMidia" class="bg-indigo-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-indigo-700 transition-all">OK</button>
                <button @click="novaMidiaVisivel = false" class="bg-slate-100 text-slate-500 text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-slate-200 transition-all">Cancelar</button>
              </div>
            </div>

            <!-- Lista de mídias -->
            <div v-if="painelConfig.midias && painelConfig.midias.length > 0" class="space-y-3">
              <div 
                v-for="(midia, i) in painelConfig.midias" 
                :key="i"
                class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group"
              >
                <!-- Badge tipo -->
                <span 
                  class="shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                  :class="midia.tipo === 'video' ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'"
                >
                  {{ midia.tipo === 'video' ? '▶ Vídeo' : '🖼 Imagem' }}
                </span>
                <!-- Thumb preview -->
                <img v-if="midia.tipo === 'image'" :src="midia.url" class="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0" @error="e => e.target.style.display='none'" />
                <div v-else class="w-12 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>

                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-700 text-sm truncate">{{ midia.titulo || '(sem título)' }}</p>
                  <p class="text-xs text-slate-400 truncate">{{ midia.url }}</p>
                </div>

                <!-- Reordenar -->
                <button @click="moverMidia(i, -1)" :disabled="i === 0" class="p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-20 transition-colors">↑</button>
                <button @click="moverMidia(i, 1)" :disabled="i === painelConfig.midias.length - 1" class="p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-20 transition-colors">↓</button>

                <button @click="removerMidia(i)" class="p-1.5 text-slate-300 hover:text-rose-500 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            <div v-else class="py-8 text-center text-slate-400 italic text-sm">
              Nenhuma mídia cadastrada. Clique em "Adicionar" para começar.
            </div>
          </div>

          <!-- Clima -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 class="font-bold text-slate-800 text-lg mb-1">Temperatura — Cidade</h3>
            <p class="text-slate-400 text-sm mb-5">Escolha a cidade cuja temperatura será exibida no Monitor</p>
            <select v-model="cidadeSelecionada" @change="onCidadeChange" class="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 text-sm">
              <option v-for="c in cidades" :key="c.nome" :value="c">{{ c.nome }}</option>
            </select>
            <p class="text-xs text-slate-400 mt-2">Cidade atual: <strong class="text-slate-600">{{ painelConfig.cidadeNome }}</strong> ({{ painelConfig.cidadeLat }}, {{ painelConfig.cidadeLon }})</p>
          </div>

          <!-- Dados Financeiros -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold text-slate-800 text-lg">Ticker Financeiro</h3>
                <p class="text-slate-400 text-sm mt-0.5">Exibe cotações (Dólar, Euro, IBOV, Ouro) em rodapé do Monitor</p>
              </div>
              <!-- Toggle -->
              <button 
                @click="painelConfig.dadosFinanceiros = !painelConfig.dadosFinanceiros"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none"
                :class="painelConfig.dadosFinanceiros ? 'bg-indigo-600' : 'bg-slate-300'"
              >
                <span 
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform"
                  :class="painelConfig.dadosFinanceiros ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>

          <!-- Botão Salvar -->
          <div class="flex justify-end">
            <button 
              @click="salvarPainelConfig"
              :disabled="salvandoPainel"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
            >
              <span v-if="salvandoPainel" class="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></span>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
              Salvar Configurações
            </button>
          </div>

          <!-- Feedback de save -->
          <div v-if="painelSavedMsg" class="flex items-center gap-2 text-emerald-600 font-semibold text-sm justify-end">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Configurações salvas com sucesso!
          </div>
        </section>

        <!-- Tabelas Genericas de Dados -->
        <section v-else class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider font-semibold">
                <th class="p-5 font-semibold">Nome</th>
                <th class="p-5 font-semibold hidden sm:table-cell">Descrição / Info</th>
                <th class="p-5 font-semibold">Status</th>
                <th class="p-5 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <!-- Listagem de Departamentos -->
              <template v-if="aba === 'departamentos'">
                <tr v-for="dept in data.departamentos" :key="dept.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="p-5 font-bold text-slate-800">{{ dept.nome }}</td>
                  <td class="p-5 text-slate-500 text-sm hidden sm:table-cell">{{ dept.descricao || '--' }}</td>
                  <td class="p-5">
                    <span :class="dept.ativo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ dept.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="p-5 text-right flex justify-end gap-2">
                    <button @click="editRecord(dept)" class="text-slate-400 hover:text-indigo-600 transition-colors font-medium text-sm border px-3 py-1 bg-white rounded-lg shadow-sm">Editar</button>
                    <button @click="removeRecord(dept)" class="text-rose-400 hover:text-white hover:bg-rose-500 transition-colors font-medium text-sm border border-rose-100 px-3 py-1 bg-white rounded-lg shadow-sm">Inativar</button>
                  </td>
                </tr>
              </template>

              <!-- Listagem de Serviços -->
              <template v-if="aba === 'servicos'">
                <tr v-for="srv in data.servicos" :key="srv.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="p-5 font-bold text-slate-800">{{ srv.nome }}</td>
                  <td class="p-5 text-slate-500 text-sm hidden sm:table-cell">
                    {{ srv.descricao || '--' }} <br/>
                    <span class="text-xs text-indigo-500 font-semibold">SLA: {{ srv.slaMinutos }} min</span>
                  </td>
                  <td class="p-5">
                    <span :class="srv.ativo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ srv.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="p-5 text-right flex justify-end gap-2">
                    <button @click="editRecord(srv)" class="text-slate-400 hover:text-indigo-600 transition-colors font-medium text-sm border px-3 py-1 bg-white rounded-lg shadow-sm">Editar</button>
                    <button @click="removeRecord(srv)" class="text-rose-400 hover:text-white hover:bg-rose-500 transition-colors font-medium text-sm border border-rose-100 px-3 py-1 bg-white rounded-lg shadow-sm">Inativar</button>
                  </td>
                </tr>
              </template>

              <!-- Listagem de Usuarios -->
              <template v-if="aba === 'usuarios'">
                <tr v-for="usr in data.usuarios" :key="usr.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="p-5">
                    <div class="font-bold text-slate-800">{{ usr.nome }}</div>
                    <div class="text-sm text-slate-400">{{ usr.email }}</div>
                  </td>
                  <td class="p-5 hidden sm:table-cell text-sm">
                    <span class="font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">{{ usr.role }}</span>
                  </td>
                  <td class="p-5">
                    <span :class="usr.ativo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ usr.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="p-5 text-right flex justify-end gap-2">
                    <button @click="editRecord(usr)" class="text-slate-400 hover:text-indigo-600 transition-colors font-medium text-sm border px-3 py-1 bg-white rounded-lg shadow-sm">Editar</button>
                    <button @click="removeRecord(usr)" class="text-rose-400 hover:text-white hover:bg-rose-500 transition-colors font-medium text-sm border border-rose-100 px-3 py-1 bg-white rounded-lg shadow-sm">Inativar</button>
                  </td>
                </tr>
              </template>

              <!-- Listagem de Guiches -->
              <template v-if="aba === 'guiches'">
                <tr v-for="g in data.guiches" :key="g.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="p-5">
                    <div class="font-black text-2xl text-slate-800">{{ g.numero }}</div>
                  </td>
                  <td class="p-5 hidden sm:table-cell text-sm text-slate-400">
                    <span v-if="g.atendenteAtualId" class="text-indigo-500 font-bold bg-indigo-50 px-2 rounded">Ocupado</span>
                    <span v-else>Livre</span>
                  </td>
                  <td class="p-5">
                    <span :class="g.ativo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ g.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="p-5 text-right flex justify-end gap-2">
                    <button @click="editRecord(g)" class="text-slate-400 hover:text-indigo-600 transition-colors font-medium text-sm border px-3 py-1 bg-white rounded-lg shadow-sm">Editar</button>
                    <button @click="removeRecord(g)" class="text-rose-400 hover:text-white hover:bg-rose-500 transition-colors font-medium text-sm border border-rose-100 px-3 py-1 bg-white rounded-lg shadow-sm">Inativar</button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="data[aba]?.length === 0" class="p-10 text-center flex flex-col items-center justify-center">
             <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
               <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
             </div>
             <p class="text-slate-500 font-medium text-lg">Nenhum registro encontrado.</p>
             <p class="text-slate-400 mt-1">Clique em 'Novo Registro' para começar.</p>
          </div>
        </section>

      </template>

    </main>

    <!-- Modal Novo Registro -->
    <div v-if="modalAberto" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 class="font-bold text-xl text-slate-800 capitalize">Novo {{ tituloModal }}</h3>
          <button @click="fecharModal" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="salvarRegistro" class="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          
          <div v-if="aba === 'departamentos' || aba === 'servicos' || aba === 'usuarios'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Nome *</label>
            <input v-model="form.nome" required type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="Digite o nome..." />
          </div>

          <div v-if="aba === 'guiches'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Número do Guichê *</label>
            <input v-model="form.numero" required type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="Ex: 01, CX1" maxlength="5" />
          </div>

          <div v-if="aba === 'departamentos' || aba === 'servicos'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Descrição</label>
            <textarea v-model="form.descricao" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="Breve descrição..."></textarea>
          </div>

          <div v-if="aba === 'servicos'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Departamento Vinculado *</label>
            <select v-model="form.departamentoId" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800">
              <option value="" disabled>Selecione um departamento...</option>
              <option v-for="d in data.departamentos" :key="d.id" :value="d.id">{{ d.nome }}</option>
            </select>
          </div>

          <div v-if="aba === 'servicos'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Meta de SLA (Minutos) *</label>
            <input v-model="form.slaMinutos" required type="number" min="1" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="15" />
          </div>

          <div v-if="aba === 'usuarios'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Email (Login) *</label>
            <input v-model="form.email" required type="email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="usuario@empresa.com" />
          </div>

          <div v-if="aba === 'usuarios'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Senha Primária {{ isEditing ? '(Opcional)' : '*' }}</label>
            <input v-model="form.senhaHash" :required="!isEditing" type="password" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" placeholder="*****" />
          </div>

          <div v-if="aba === 'usuarios'">
            <label class="block text-sm font-semibold text-slate-600 mb-2">Departamentos Vinculados *</label>
            <div class="space-y-2 max-h-36 overflow-y-auto border border-slate-200 rounded-xl p-3 bg-slate-50">
              <label
                v-for="d in data.departamentos"
                :key="d.id"
                class="flex items-center gap-3 cursor-pointer hover:bg-white px-2 py-1 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  :value="d.id"
                  v-model="form.departamentosIds"
                  class="w-4 h-4 rounded accent-indigo-600"
                />
                <span class="text-slate-700 text-sm font-medium">{{ d.nome }}</span>
              </label>
            </div>
          </div>

          <div v-if="aba === 'usuarios'">
            <label class="block text-sm font-semibold text-slate-600 mb-1">Nível de Acesso *</label>
            <select v-model="form.role" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800">
              <option value="ATENDENTE">Atendente</option>
              <option value="GERENTE">Gerente</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          
          <div class="flex gap-3 justify-end mt-4 pt-4 border-t border-slate-100">
            <button type="button" @click="fecharModal" class="px-5 py-2.5 rounded-xl font-semibold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
            <button type="submit" :disabled="salvando" class="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center gap-2">
              <span v-if="salvando" class="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></span>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { API_BASE } from '@/config.js';
import { useRouter } from 'vue-router';

// --------- Chart.js Setup ---------
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const aba = ref('overview');
const loading = ref(true);

// ---- Auth ----
const router = useRouter();
const userLocal = JSON.parse(localStorage.getItem('filas_user') || '{}');
const userNome = userLocal.nome || 'Admin';

const logout = () => {
  localStorage.removeItem('filas_token');
  localStorage.removeItem('filas_user');
  localStorage.removeItem('filas_guiche_id');
  localStorage.removeItem('filas_guiche_numero');
  router.push('/login');
};

const estatisticas = ref({ depto: 0, servicos: 0, usuarios: 0, totaisDiarios: {}, graficoDiario: null });
const data = ref({
  departamentos: [],
  servicos: [],
  usuarios: [],
  guiches: []
});

// Mock Company para o MVP
const COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';

// ==============================
// Cidades disponíveis (lat/lon)
// ==============================
const cidades = [
  { nome: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { nome: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
  { nome: 'Brasília', lat: -15.7801, lon: -47.9292 },
  { nome: 'Salvador', lat: -12.9714, lon: -38.5014 },
  { nome: 'Fortaleza', lat: -3.7172, lon: -38.5433 },
  { nome: 'Belo Horizonte', lat: -19.9167, lon: -43.9345 },
  { nome: 'Manaus', lat: -3.1190, lon: -60.0217 },
  { nome: 'Curitiba', lat: -25.4284, lon: -49.2733 },
  { nome: 'Recife', lat: -8.0476, lon: -34.8770 },
  { nome: 'Porto Alegre', lat: -30.0346, lon: -51.2177 },
  { nome: 'Belém', lat: -1.4558, lon: -48.5044 },
  { nome: 'Goiânia', lat: -16.6869, lon: -49.2648 },
  { nome: 'Maceió', lat: -9.6658, lon: -35.7350 },
  { nome: 'Natal', lat: -5.7945, lon: -35.2110 },
  { nome: 'Campo Grande', lat: -20.4697, lon: -54.6201 },
];

// ==============================
// Painel Config State
// ==============================
const painelConfig = ref({
  midias: [],
  cidadeNome: 'São Paulo',
  cidadeLat: -23.5505,
  cidadeLon: -46.6333,
  dadosFinanceiros: false,
});
const cidadeSelecionada = ref(cidades[0]);
const salvandoPainel = ref(false);
const painelSavedMsg = ref(false);

// Mídia nova state
const novaMidiaVisivel = ref(false);
const novaMidia = ref({ url: '', titulo: '', tipo: 'image' });

const adicionarMidia = () => {
  novaMidia.value = { url: '', titulo: '', tipo: 'image' };
  novaMidiaVisivel.value = true;
};

const confirmarNovaMidia = () => {
  if (!novaMidia.value.url) return;
  painelConfig.value.midias = [...(painelConfig.value.midias || []), { ...novaMidia.value }];
  novaMidiaVisivel.value = false;
};

const removerMidia = (index) => {
  painelConfig.value.midias = painelConfig.value.midias.filter((_, i) => i !== index);
};

const moverMidia = (index, direction) => {
  const arr = [...painelConfig.value.midias];
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= arr.length) return;
  [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
  painelConfig.value.midias = arr;
};

const onCidadeChange = () => {
  if (!cidadeSelecionada.value) return;
  painelConfig.value.cidadeNome = cidadeSelecionada.value.nome;
  painelConfig.value.cidadeLat = cidadeSelecionada.value.lat;
  painelConfig.value.cidadeLon = cidadeSelecionada.value.lon;
};

const fetchPainelConfig = async () => {
  try {
    const res = await fetch(API_BASE + '/admin/painel-config');
    if (res.ok) {
      const cfg = await res.json();
      painelConfig.value = cfg;
      // Sync cidade selector
      const found = cidades.find(c => c.nome === cfg.cidadeNome);
      if (found) cidadeSelecionada.value = found;
    }
  } catch(e) {
    console.error('Erro ao buscar painel-config:', e);
  }
};

const salvarPainelConfig = async () => {
  if (salvandoPainel.value) return;
  salvandoPainel.value = true;
  painelSavedMsg.value = false;
  try {
    const res = await fetch(API_BASE + '/admin/painel-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        midias: painelConfig.value.midias,
        cidadeNome: painelConfig.value.cidadeNome,
        cidadeLat: painelConfig.value.cidadeLat,
        cidadeLon: painelConfig.value.cidadeLon,
        dadosFinanceiros: painelConfig.value.dadosFinanceiros,
      }),
    });
    if (res.ok) {
      painelSavedMsg.value = true;
      setTimeout(() => { painelSavedMsg.value = false; }, 4000);
    }
  } catch(e) {
    console.error('Erro ao salvar config:', e);
  } finally {
    salvandoPainel.value = false;
  }
};

// Carrega painel config quando o usuário navega para a aba painel
watch(aba, (val) => {
  if (val === 'painel') fetchPainelConfig();
});

// ==============================
// Fetch data & CRUD
// ==============================
const fetchAllData = async () => {
  loading.value = true;
  try {
    const urls = [
      API_BASE + '/admin/departamentos',
      API_BASE + '/admin/servicos',
      API_BASE + '/admin/usuarios',
      API_BASE + '/admin/guiches',
      API_BASE + '/admin/stats'
    ];
    
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const [deptosRes, servicosRes, usuariosRes, guichesRes, statsRes] = await Promise.all(requests);
    
    data.value.departamentos = deptosRes;
    data.value.servicos = servicosRes;
    data.value.usuarios = usuariosRes;
    data.value.guiches = guichesRes;

    estatisticas.value = {
      depto: deptosRes.length,
      servicos: servicosRes.length,
      usuarios: usuariosRes.length,
      totaisDiarios: statsRes.totais,
      graficoDiario: {
        labels: statsRes.graficoStatus.labels.length ? statsRes.graficoStatus.labels : ['Sem Dados'],
        datasets: [{
          label: 'Atendimentos Hoje',
          backgroundColor: '#4f46e5',
          borderRadius: 8,
          data: statsRes.graficoStatus.data.length ? statsRes.graficoStatus.data : [0]
        }]
      }
    };
  } catch(e) {
    console.error("Erro carregando ADMIN DB:", e);
  } finally {
    loading.value = false;
  }
};

// ==========================
// Lógica do Modal CRUD
// ==========================
const modalAberto = ref(false);
const isEditing = ref(false);
const tituloModal = ref('');
const salvando = ref(false);

const formBase = {
  id: null, nome: '', descricao: '', departamentosIds: [], slaMinutos: 15, email: '', senhaHash: '', role: 'ATENDENTE', numero: ''
};
const form = ref({...formBase});

const abrirModal = () => {
  tituloModal.value = `Novo ${aba.value.substring(0, aba.value.length - 1)}`;
  isEditing.value = false;
  form.value = {...formBase};
  if(aba.value === 'usuarios' && data.value.departamentos.length > 0) {
     form.value.departamentoId = data.value.departamentos[0].id;
  }
  modalAberto.value = true;
};

const editRecord = (item) => {
  tituloModal.value = `Editar ${aba.value.substring(0, aba.value.length - 1)}`;
  isEditing.value = true;
  form.value = { ...formBase, ...item };
  if (aba.value === 'usuarios') {
    form.value.departamentosIds = Array.isArray(item.departamentosIds) ? [...item.departamentosIds] : [];
    form.value.senhaHash = '';
  }
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
};

const salvarRegistro = async () => {
  if (salvando.value) return;
  salvando.value = true;
  
  try {
    const payload = { ...form.value, companyId: COMPANY_ID };
    let method = isEditing.value ? 'PUT' : 'POST';
    let endpoint = `${API_BASE}/admin/${aba.value}`;
    
    if (isEditing.value) {
      endpoint += `/${payload.id}`;
    }

    if(aba.value === 'departamentos') {
      delete payload.departamentosIds; delete payload.slaMinutos; delete payload.email; delete payload.senhaHash; delete payload.role; delete payload.numero;
    } else if (aba.value === 'servicos') {
      delete payload.email; delete payload.senhaHash; delete payload.role; delete payload.numero; delete payload.departamentosIds;
    } else if (aba.value === 'usuarios') {
      delete payload.descricao; delete payload.slaMinutos; delete payload.numero;
      if (isEditing.value && !payload.senhaHash) {
        delete payload.senhaHash;
      }
    } else if (aba.value === 'guiches') {
       delete payload.descricao; delete payload.slaMinutos; delete payload.email; delete payload.senhaHash; delete payload.role; delete payload.nome; delete payload.departamentosIds;
    }

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if(res.ok) {
       await fetchAllData();
       fecharModal();
    } else {
       alert("Erro ao salvar! Veja o console.");
    }
  } catch(e) {
    console.error(e);
  } finally {
    salvando.value = false;
  }
};

const removeRecord = async (item) => {
  if (!confirm(`Tem certeza que deseja inativar este registro?`)) return;
  try {
    const res = await fetch(`${API_BASE}/admin/${aba.value}/${item.id}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchAllData();
    } else {
      alert("Erro ao excluir.");
    }
  } catch(e) {
    console.error("Erro delete", e);
  }
};

const zerarSenhas = async () => {
  if (!confirm('Tem certeza que deseja zerar todas as senhas da fila hoje? Esta ação não pode ser desfeita.')) return;
  try {
    const res = await fetch(API_BASE + '/admin/resetar-senhas', { method: 'POST' });
    if (res.ok) {
      alert('Senhas zeradas com sucesso! A contagem recomeçará do 001.');
      fetchAllData();
    }
  } catch(e) {
    console.error(e);
  }
};

onMounted(() => {
  fetchAllData();
});
</script>
