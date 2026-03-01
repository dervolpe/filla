<template>
  <div class="h-screen w-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans relative overflow-hidden">
    <!-- Efeitos Visuais de Fundo -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

    <main class="w-full max-w-5xl z-10 p-8">
      <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative">
        
        <!-- STEP 1: Selecionar Serviço -->
        <template v-if="step === 'servico'">
          <header class="mb-12">
            <h1 class="text-5xl font-black mb-4 tracking-tight drop-shadow-md">Bem-vindo ao Atendimento</h1>
            <p class="text-xl text-slate-300 font-light">Selecione o serviço desejado:</p>
          </header>

          <div v-if="loadingServicos" class="flex items-center justify-center py-16">
            <span class="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full"></span>
          </div>

          <div v-else-if="servicos.length === 0" class="text-slate-400 py-16">
            <p class="text-2xl">Nenhum serviço disponível no momento.</p>
          </div>

          <section v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              v-for="servico in servicos"
              :key="servico.id"
              @click="selecionarServico(servico)"
              class="group relative min-h-48 bg-gradient-to-br from-indigo-500/80 to-blue-600/80 rounded-[2rem] border border-white/20 shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] focus:outline-none"
            >
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <div class="flex flex-col items-center justify-center h-full gap-4 z-10 relative p-6">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                </div>
                <h2 class="text-xl font-bold tracking-wide">{{ servico.nome }}</h2>
                <p v-if="servico.descricao" class="text-indigo-100 text-sm italic text-center opacity-80">{{ servico.descricao }}</p>
              </div>
            </button>
          </section>
        </template>

        <!-- STEP 2: Selecionar Prioridade -->
        <template v-else-if="step === 'prioridade'">
          <button @click="voltarParaServicos" class="absolute top-6 left-6 text-white/60 hover:text-white flex items-center gap-2 transition-colors group">
            <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            Voltar
          </button>
          
          <header class="mb-12">
            <div class="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-indigo-200 mb-4">Serviço selecionado: <strong>{{ servicoSelecionado?.nome }}</strong></div>
            <h1 class="text-5xl font-black mb-4 tracking-tight">Como você prefere ser atendido?</h1>
            <p class="text-xl text-slate-300 font-light">Selecione o tipo de atendimento:</p>
          </header>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              @click="gerarSenha('NORMAL')"
              :disabled="loading"
              class="group relative h-64 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] border border-white/20 shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] focus:outline-none disabled:opacity-50 disabled:scale-100"
            >
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <div class="flex flex-col items-center justify-center h-full gap-4 z-10 relative">
                <svg class="w-20 h-20 text-white/90 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <h2 class="text-3xl font-bold tracking-wide uppercase">Normal</h2>
              </div>
            </button>

            <button
              @click="gerarSenha('PREFERENCIAL')"
              :disabled="loading"
              class="group relative h-64 bg-gradient-to-br from-amber-500 to-orange-500 rounded-[2rem] border border-white/20 shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] focus:outline-none disabled:opacity-50 disabled:scale-100"
            >
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <div class="flex flex-col items-center justify-center h-full gap-4 z-10 relative">
                <span class="text-6xl group-hover:scale-110 transition-transform duration-300">🤰♿👴</span>
                <h2 class="text-3xl font-bold tracking-wide uppercase">Preferencial</h2>
                <p class="text-amber-50 text-sm italic">Idosos, Gestantes e PNE</p>
              </div>
            </button>
          </section>
        </template>

      </div>
    </main>

    <!-- Modal de Impressão (Sucesso) -->
    <div v-if="ticketEmitido" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col gap-6 items-center justify-center">
      <div class="bg-white rounded-3xl p-12 text-center text-slate-900 max-w-sm w-full shadow-2xl animate-[bounceIn_0.5s_ease-out]">
        <h3 class="text-slate-500 uppercase tracking-widest font-semibold mb-2">Sua Senha</h3>
        <div class="text-7xl font-black text-slate-800 mb-4 drop-shadow-sm border-b-2 border-slate-200 pb-4">
          {{ ticketEmitido.senha }}
        </div>
        <p class="text-base font-medium text-slate-600 mb-1">Serviço: <strong>{{ servicoSelecionado?.nome }}</strong></p>
        <p class="text-sm text-slate-500">{{ ticketEmitido.prioridade === 'NORMAL' ? 'Atendimento Normal' : 'Atendimento Preferencial' }}</p>
        <p class="text-sm text-slate-400 mt-2">Aguarde ser chamado no painel.</p>
        
        <div class="mt-8 flex justify-center">
          <svg class="w-12 h-12 text-emerald-500 animate-[pulse_2s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        </div>
        <p class="text-xs text-slate-400 mt-2 font-semibold tracking-wider">IMPRIMINDO...</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { API_BASE } from '@/config.js';

const route = useRoute();
const localId = route.query.localId || null;
const COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';

const step = ref('servico'); // 'servico' | 'prioridade'
const servicos = ref([]);
const loadingServicos = ref(true);
const servicoSelecionado = ref(null);
const loading = ref(false);
const ticketEmitido = ref(null);

const carregarServicos = async () => {
  loadingServicos.value = true;
  try {
    // Usa o novo endpoint de triagem que filtra por local
    const url = localId
      ? `${API_BASE}/triagem/servicos?localId=${localId}`
      : `${API_BASE}/admin/servicos?companyId=${COMPANY_ID}`;
    const res = await fetch(url);
    if (res.ok) servicos.value = await res.json();
  } catch (e) {
    console.error('Erro ao carregar serviços', e);
  } finally {
    loadingServicos.value = false;
  }
};

const selecionarServico = (servico) => {
  servicoSelecionado.value = servico;
  step.value = 'prioridade';
};

const voltarParaServicos = () => {
  step.value = 'servico';
  servicoSelecionado.value = null;
};

const gerarSenha = async (prioridade) => {
  if (loading.value || !servicoSelecionado.value) return;
  loading.value = true;
  try {
    const response = await fetch(API_BASE + '/triagem/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: COMPANY_ID,
        servicoId: servicoSelecionado.value.id,
        prioridade,
        localId: localId || undefined,   // envia localId se disponível
      })
    });
    if (response.ok) {
      const data = await response.json();
      ticketEmitido.value = data;
      setTimeout(() => {
        ticketEmitido.value = null;
        step.value = 'servico';
        servicoSelecionado.value = null;
      }, 5000);
    } else {
      const err = await response.json();
      alert(`Erro: ${err.message}`);
    }
  } catch(e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(carregarServicos);
</script>

<style>
@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
