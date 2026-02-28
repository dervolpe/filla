<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
    <!-- Premium Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <div class="flex items-center gap-4">
        <div class="bg-gradient-to-br from-indigo-500 to-violet-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-800 tracking-tight">Painel do Atendente</h1>
          <p class="text-sm font-medium text-slate-500">Gestão de Filas SaaS</p>
        </div>
      </div>
      
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-2 bg-indigo-50 pl-4 pr-2 py-1.5 rounded-full border border-indigo-100">
          <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse hidden sm:block"></span>
          <span class="text-sm font-bold text-indigo-700 mr-2">Guichê {{ guicheAtual || '...' }}</span>
          <button @click="trocarGuiche" class="bg-white hover:bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 transition-colors">
            Trocar
          </button>
        </div>
        
        <div class="h-8 w-px bg-slate-200"></div>
        
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold text-slate-700 leading-none">{{ userNome }}</p>
            <p class="text-xs text-slate-500 mt-1">{{ userRole }}</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <svg class="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </div>
          <button @click="logout" class="ml-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-all" title="Sair">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 p-6 lg:p-8 flex flex-col lg:flex-row gap-8 max-w-[1400px] w-full mx-auto relative">
      
      <!-- Esquerda: Fila de Espera -->
      <aside class="w-full lg:w-96 flex flex-col gap-6">
        
        <!-- Call to Action Principal -->
        <button 
          @click="chamarProximo" 
          :disabled="!!senhaVigente"
          :class="senhaVigente ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]'"
          class="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-1 shadow-lg shadow-indigo-200 transition-all"
        >
          <div class="absolute inset-0 bg-white/20 transition-transform group-hover:translate-x-full"></div>
          <div class="relative flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-5 text-white">
            <svg class="w-6 h-6 transition-transform group-hover:scale-110 group-active:scale-95" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            <span class="text-lg font-bold tracking-wide">{{ senhaVigente ? 'Finalize o Atendimento Atual' : 'Chamar Próximo' }}</span>
          </div>
        </button>

        <!-- Lista da Fila -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col flex-1 max-h-[calc(100vh-16rem)]">
          <div class="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 class="font-bold text-slate-800 text-lg">Fila de Espera</h2>
            <div class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ring-indigo-500/10">
              {{ filaEspera.length }} Aguardando
            </div>
          </div>
          
          <div class="flex-1 overflow-y-auto p-3 space-y-2 relative">
            <!-- Fade Overlay Superior/Inferior pra listas longas -->
            <div class="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent z-10"></div>
            
            <div v-if="loading" class="flex justify-center py-10">
              <span class="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></span>
            </div>

            <div v-else-if="filaEspera.length === 0" class="text-center py-10 text-slate-400 font-medium">
              Ninguém na fila. <br/> Aproveite para respirar fundo! 🧘
            </div>

            <div v-else v-for="(atend, idx) in filaEspera" :key="atend.id" class="group p-4 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  :class="atend.prioridade !== 'NORMAL' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700 group-hover:bg-white group-hover:shadow-sm'">
                  {{ atend.senha }}
                </div>
                <div>
                  <div class="font-semibold text-slate-700 capitalize">{{ servicoNome(atend.servicoId) }}</div>
                  <div class="text-xs text-slate-400 mt-0.5 font-medium flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ atend.prioridade === 'NORMAL' ? 'Normal' : 'Preferencial' }} &bull; Esp. {{ formatarEspera(atend.dataChegada) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Direita: Área Principal de Atendimento -->
      <section class="flex-1 h-full">
        
        <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col overflow-hidden relative">
          <!-- Decoração de Fundo Premium -->
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-sky-50 to-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <template v-if="senhaVigente">
            <!-- Top do Card de Atendimento -->
            <div class="px-10 py-8 border-b border-slate-100 flex justify-between items-center z-10 bg-white/50 backdrop-blur-sm">
              <div class="flex items-center gap-3">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span class="text-sm font-bold tracking-wide text-emerald-600 uppercase">Em Atendimento</span>
              </div>
              <div class="text-sm font-medium text-slate-400">
                Iniciado às {{ new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
              </div>
            </div>

            <!-- Centro: Senha Grande -->
            <div class="flex-1 flex flex-col items-center justify-center z-10 py-10">
              <div class="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Senha Atual</div>
              <div class="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter drop-shadow-sm mb-4"
                :class="senhaVigente.prioridade !== 'NORMAL' ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500' : 'text-slate-800'">
                {{ senhaVigente.senha }}
              </div>
              <div class="text-base font-semibold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full mb-3">
                {{ servicoNome(senhaVigente.servicoId) || 'Serviço não identificado' }}
              </div>
              <div class="px-6 py-2 rounded-full border-2 font-bold text-lg"
                :class="senhaVigente.prioridade !== 'NORMAL' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-slate-200 text-slate-600 bg-slate-50'">
                Classificação: {{ senhaVigente.prioridade }}
              </div>
            </div>

            <!-- Ações -->
            <div class="p-8 sm:p-10 bg-slate-50/50 backdrop-blur-md border-t border-slate-100 z-10">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <template v-if="senhaVigente.status === 'CHAMADO'">
                  <button @click="rechamarSenha" class="bg-white hover:bg-slate-50 text-indigo-600 font-bold py-4 rounded-2xl transition-all border-2 border-indigo-100 hover:border-indigo-300 flex items-center justify-center gap-2 shadow-sm focus:ring-4 focus:ring-indigo-100 outline-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                    Chamar Novamente
                  </button>
                  <button @click="iniciarAtendimento" class="group bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus:ring-4 focus:ring-indigo-200 outline-none">
                    <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    Iniciar Atendimento
                  </button>
                  <button @click="cancelarAtendimento" class="col-span-1 sm:col-span-2 group bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-4 rounded-2xl transition-all border border-rose-200 active:scale-[0.98] flex items-center justify-center gap-2 focus:ring-4 focus:ring-rose-100 outline-none">
                    <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Não Compareceu
                  </button>
                </template>

                <template v-else-if="senhaVigente.status === 'EM_ATENDIMENTO'">
                  <button @click="encerrarAtendimento" class="col-span-1 sm:col-span-2 group bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus:ring-4 focus:ring-emerald-200 outline-none">
                    <svg class="w-5 h-5 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Finalizar Atendimento
                  </button>
                </template>
              </div>
            </div>
          </template>
          
          <template v-else>
            <div class="flex-1 flex flex-col items-center justify-center text-center p-10 z-10 animate-fade-in">
              
              <template v-if="filaEspera.length === 0">
                <div class="relative w-40 h-40 flex items-center justify-center mb-6">
                   <!-- Background animado do cafe -->
                   <div class="absolute inset-0 bg-amber-100/50 rounded-full blur-2xl animate-pulse"></div>
                   
                   <!-- Ícone Premium de Café -->
                   <div class="w-32 h-32 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center shadow-inner relative z-10 border border-amber-100">
                     <svg class="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                       <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                       <path d="M6 1v3"></path>
                       <path d="M10 1v3"></path>
                       <path d="M14 1v3"></path>
                     </svg>
                   </div>
                </div>

                <h3 class="text-3xl font-bold text-slate-800 tracking-tight mb-4">Nenhum atendimento ativo</h3>
                <p class="text-slate-500 max-w-sm text-lg leading-relaxed">
                  A fila está tranquila agora. Ótimo momento para esticar as pernas, tomar uma água ou um café fresquinho! ☕
                </p>
                
                <div class="mt-8 px-6 py-3 bg-slate-50 text-slate-500 font-medium rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
                  </span>
                  Aguardando novos chamados...
                </div>
              </template>

              <template v-else>
                <div class="relative w-40 h-40 flex items-center justify-center mb-6">
                   <!-- Background animado de alerta -->
                   <div class="absolute inset-0 bg-indigo-100/50 rounded-full blur-2xl animate-pulse"></div>
                   
                   <!-- Ícone de Pessoas -->
                   <div class="w-32 h-32 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full flex items-center justify-center shadow-inner relative z-10 border border-indigo-100">
                     <svg class="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                     </svg>
                   </div>
                </div>

                <h3 class="text-3xl font-bold text-slate-800 tracking-tight mb-4">Pessoas Aguardando</h3>
                <p class="text-slate-500 max-w-sm text-lg leading-relaxed">
                  Há {{ filaEspera.length }} cliente(s) aguardando na fila. Clique em <strong class="text-indigo-600">"Chamar Próximo"</strong> para iniciar um novo atendimento.
                </p>
                
                <button @click="chamarProximo" class="mt-8 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                  Chamar Próximo
                </button>
              </template>

            </div>
          </template>

        </div>
      </section>
    </main>

    <!-- Modal: Selecionar Guichê -->
    <div v-if="guicheModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all">
      <div class="bg-white rounded-[2rem] p-8 sm:p-12 w-full max-w-md shadow-2xl transform text-center relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
        
        <div class="w-20 h-20 bg-indigo-50 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner ring-1 ring-indigo-100">
          <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Qual o seu Guichê?</h2>
        <p class="text-slate-500 mt-2 mb-8 font-medium">Informe o número onde você está atendendo agora.</p>
        
        <div v-if="guichesDisponiveis.length === 0" class="text-slate-400 py-4">
          Nenhum guichê livre no momento.
        </div>
        <div v-else class="grid grid-cols-3 gap-4 mb-6">
          <button 
            v-for="g in guichesDisponiveis" 
            :key="g.id"
            @click="confirmarGuiche(g)"
            class="bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-500 text-slate-700 hover:text-indigo-700 font-bold py-4 rounded-xl transition-all shadow-sm flex flex-col items-center justify-center gap-1 group"
          >
            <span class="text-xs text-slate-400 group-hover:text-indigo-400 uppercase tracking-widest">Guichê</span>
            <span class="text-2xl">{{ g.numero }}</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { API_BASE, SOCKET_URL } from '@/config.js';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';

// ---- State ----
const senhaVigente = ref(null);
const filaEspera = ref([]);
const servicos = ref([]); // Lookup para nomes de servicos
const loading = ref(true);

const COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';
const userLocal = JSON.parse(localStorage.getItem('filas_user') || '{}');
const userNome = userLocal.nome || 'Atendente';
const userRole = userLocal.role || '';

// ---- Auth ----
const router = useRouter();
const logout = async () => {
  // Libera guichê se tiver um vinculado
  if (guicheSelecionadoId.value) {
    try {
      await fetch(API_BASE + '/guiche/desvincular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: COMPANY_ID, guicheId: guicheSelecionadoId.value, atendenteId: userLocal.id })
      });
    } catch(e) { /* silent */ }
  }
  localStorage.removeItem('filas_token');
  localStorage.removeItem('filas_user');
  localStorage.removeItem('filas_guiche_id');
  localStorage.removeItem('filas_guiche_numero');
  if (socket) socket.disconnect();
  router.push('/login');
};

const servicoNome = (servicoId) => {
  if (!servicoId) return '';
  return servicos.value.find(s => s.id === servicoId)?.nome || '';
};

// Modal Selecionar Guiche
const guicheModal = ref(false);
const guichesDisponiveis = ref([]);
const guicheAtual = ref('');
const guicheSelecionadoId = ref(''); // Armazena o ID interno UUID

const carregarGuichesDisponiveis = async () => {
  try {
    const res = await fetch(`${API_BASE}/guiche/disponiveis/${COMPANY_ID}`);
    if (res.ok) {
      guichesDisponiveis.value = await res.json();
      guicheModal.value = true;
    }
  } catch(e) {
    console.error("Erro ao carregar guichês", e);
  }
};

const confirmarGuiche = async (guicheObj) => {
  if(!guicheObj) return;

  try {
    const atendenteId = userLocal.id || '00000000-0000-0000-0000-000000000000'; // mock fallback if manual test
    const res = await fetch(API_BASE + '/guiche/vincular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId: COMPANY_ID, guicheId: guicheObj.id, atendenteId })
    });

    if (res.ok) {
      guicheAtual.value = guicheObj.numero;
      guicheSelecionadoId.value = guicheObj.id;
      guicheModal.value = false;

      // Persistir na sessão para surviving refresh
      localStorage.setItem('filas_guiche_numero', guicheObj.numero);
      localStorage.setItem('filas_guiche_id', guicheObj.id);

      carregarFila();
      setupSocket();
    } else {
      const error = await res.json();
      alert(`Falha ao vincular guichê: ${error.message}`);
      carregarGuichesDisponiveis(); // Refresh no caso de alguém ter pegado na frente
    }
  } catch (e) {
    console.error("Erro ao vincular", e);
  }
};

const trocarGuiche = async () => {
  if(!guicheSelecionadoId.value) return;

  try {
    const atendenteId = userLocal.id || '00000000-0000-0000-0000-000000000000';
    await fetch(API_BASE + '/guiche/desvincular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId: COMPANY_ID, guicheId: guicheSelecionadoId.value, atendenteId })
    });
  } catch(e) {
    console.error('Erro ao desvincular no servidor, limpando local mesmo assim', e);
  } finally {
    // Clear Local State
    localStorage.removeItem('filas_guiche_numero');
    localStorage.removeItem('filas_guiche_id');
    guicheAtual.value = '';
    guicheSelecionadoId.value = '';
    
    // Stop Socket and Queue Loading
    if (socket) socket.disconnect();
    
    // Reabrir Modal
    carregarGuichesDisponiveis();
  }
};

// ---- WebSocket ----
let socket;

const carregarFila = async () => {
  try {
    const res = await fetch(`${API_BASE}/atendimento/fila/${COMPANY_ID}`);
    if (res.ok) {
        filaEspera.value = await res.json();
    }
  } catch(e) {
    console.error("Erro ao carregar fila", e);
  } finally {
    loading.value = false;
  }
};

const setupSocket = () => {
  socket = io(SOCKET_URL + '/fila');
  socket.emit('joinCompanyRoom', { companyId: COMPANY_ID });

  socket.on('senhaGerada', (novaSenha) => {
    carregarFila();
  });
  
  socket.on('senhaChamada', (dados) => {
    carregarFila();
  });
};

onMounted(async () => {
  // Carrega lista de serviços para lookup de nomes
  try {
    const srv = await fetch(`${API_BASE}/admin/servicos`);
    if (srv.ok) servicos.value = await srv.json();
  } catch(e) { /* silent fail */ }

  // Lógica de Persistência: Se já amarrei um guichê e não encerrei sessão
  const savedGuicheId = localStorage.getItem('filas_guiche_id');
  const savedGuicheNumero = localStorage.getItem('filas_guiche_numero');

  if (savedGuicheId && savedGuicheNumero) {
    guicheAtual.value = savedGuicheNumero;
    guicheSelecionadoId.value = savedGuicheId;
    guicheModal.value = false;
    carregarFila();
    setupSocket();
  } else {
    loading.value = false; // Parar o spinner inicial
    carregarGuichesDisponiveis(); // Mostrar Modal pra escolher
  }
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});

// ---- Methods ----
const formatarEspera = (dataIso) => {
  if(!dataIso) return '0 min';
  const diffMs = new Date() - new Date(dataIso);
  const diffMin = Math.floor(diffMs / 60000);
  return `${diffMin} min`;
};

const chamarProximo = async () => {
  try {
    const payload = { companyId: COMPANY_ID, guiche: guicheAtual.value };
    const res = await fetch(API_BASE + '/atendimento/chamar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if(!res.ok) {
       // Fila Vazia
       senhaVigente.value = null;
       return;
    }
    const data = await res.json();
    senhaVigente.value = data; 
  } catch(e) {
    console.error("Erro ao chamar", e);
  }
};

const rechamarSenha = async () => {
  if(!senhaVigente.value) return;
  try {
    const payload = {
      companyId: COMPANY_ID,
      senha: senhaVigente.value.senha,
      guiche: guicheAtual.value,
    };
    await fetch(API_BASE + '/atendimento/rechamar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch(e) {
    console.error(e);
  }
};

const iniciarAtendimento = async () => {
  if(!senhaVigente.value) return;
  try {
    const payload = { companyId: COMPANY_ID, atendimentoId: senhaVigente.value.id };
    const res = await fetch(API_BASE + '/atendimento/iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
        senhaVigente.value = await res.json();
    }
  } catch(e) {
    console.error(e);
  }
};

const encerrarAtendimento = async () => { 
  if(!senhaVigente.value) return;
  try {
    const payload = { companyId: COMPANY_ID, atendimentoId: senhaVigente.value.id };
    const res = await fetch(API_BASE + '/atendimento/finalizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
        senhaVigente.value = null; // Clear from screen after finish
    }
  } catch(e) {
    console.error(e);
  }
};

const cancelarAtendimento = async () => { 
  if(!senhaVigente.value) return;
  try {
    const payload = { companyId: COMPANY_ID, atendimentoId: senhaVigente.value.id };
    const res = await fetch(API_BASE + '/atendimento/cancelar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
        senhaVigente.value = null; // Clear from screen
    }
  } catch(e) {
    console.error(e);
  }
};
</script>
