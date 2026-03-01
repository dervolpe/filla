<template>
  <div class="h-screen w-screen bg-[#0B0F19] text-white flex flex-col font-sans overflow-hidden relative">
    
    <!-- Background Gradient Effects -->
    <div class="absolute top-0 left-0 w-[50rem] h-[50rem] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-teal-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

    <!-- Header -->
    <header class="px-8 py-4 flex justify-between items-center z-10 shrink-0">
      <div class="flex items-center gap-4">
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white/90">Monitor</h1>
      </div>
      
      <div class="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
        <div class="flex items-center gap-2">
          <span :class="['w-2 h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]', isConnected ? 'bg-emerald-400' : 'bg-rose-500']"></span>
          <span class="text-sm font-semibold tracking-wide" :class="isConnected ? 'text-emerald-400' : 'text-rose-400'">
            {{ isConnected ? 'Online' : 'Offline' }}
          </span>
        </div>
        
        <div class="w-px h-4 bg-white/20"></div>
        
        <!-- Temperatura widget -->
        <div class="flex items-center gap-1.5 text-amber-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <span class="text-sm font-bold">{{ temperatura !== '--' ? temperatura + '°C' : '--' }}</span>
          <span class="text-xs text-amber-400/60">{{ cidadeNome }}</span>
        </div>

        <div class="w-px h-4 bg-white/20"></div>
        <span class="text-sm text-slate-300 font-medium whitespace-nowrap">{{ currentTime }}</span>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex px-6 pb-6 pt-0 gap-5 z-10 w-full max-w-[1920px] mx-auto box-border min-h-0">
      
      <!-- Painel Esquerdo: Mídia (Vídeos / Imagens) -->
      <section class="flex-[1.8] flex flex-col relative rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden bg-black/50 min-h-0">
        <transition name="fade" mode="out-in">
          <video 
            v-if="currentMedia && currentMedia.type === 'video'" 
            :key="'v-' + currentMedia.url" 
            :src="currentMedia.url" 
            autoplay 
            muted 
            @ended="nextMedia"
            class="w-full h-full object-cover"
          ></video>
          <img 
            v-else-if="currentMedia && currentMedia.type === 'image'" 
            :key="'i-' + currentMedia.url" 
            :src="currentMedia.url" 
            class="w-full h-full object-cover"
          />
          <div v-else :key="'placeholder'" class="w-full h-full flex items-center justify-center bg-slate-900/50">
            <div class="text-center opacity-30">
              <svg class="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <p class="text-lg">Nenhuma mídia configurada</p>
            </div>
          </div>
        </transition>

        <!-- Gradiente inferior + Título da mídia -->
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none flex items-end p-6 z-10">
          <span class="text-white text-lg font-medium tracking-wide drop-shadow-md opacity-90">{{ currentMedia?.title || '' }}</span>
        </div>

        <!-- Dots indicadores de slide -->
        <div v-if="mediaPlaylist.length > 1" class="absolute bottom-4 right-5 flex gap-1.5 z-20">
          <div 
            v-for="(_, i) in mediaPlaylist" :key="i" 
            class="rounded-full transition-all duration-300"
            :class="i === mediaIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'"
          ></div>
        </div>

        <!-- ============================================= -->
        <!-- OVERLAY: Senha Chamada (aparece por 8s)       -->
        <!-- ============================================= -->
        <transition name="overlay-fade">
          <div
            v-if="showOverlay && senhaAtual"
            class="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
          >
            <!-- Fundo escuro com blur desfocando a mídia atrás -->
            <div class="absolute inset-0 bg-[#0B0F19]/85 backdrop-blur-md"></div>

            <!-- Orbs de fundo decorativos -->
            <div class="absolute w-[40rem] h-[40rem] rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4"
              :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-600/30' : 'bg-indigo-700/30'"
            ></div>
            <div class="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[100px] translate-x-1/4 translate-y-1/4"
              :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-orange-600/20' : 'bg-cyan-700/20'"
            ></div>

            <!-- Conteúdo do overlay -->
            <div class="relative z-10 flex flex-col items-center select-none">
              <!-- Label top -->
              <div class="flex items-center gap-3 mb-6">
                <span class="h-px w-16" :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-400/50' : 'bg-indigo-400/50'"></span>
                <span class="text-2xl uppercase tracking-[0.3em] font-semibold"
                  :class="senhaAtual.prioridade !== 'NORMAL' ? 'text-amber-400' : 'text-indigo-400'"
                >Chamada</span>
                <span class="h-px w-16" :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-400/50' : 'bg-indigo-400/50'"></span>
              </div>

              <!-- Número da senha -->
              <div 
                class="font-black tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b leading-none overlay-number"
                :class="senhaAtual.prioridade !== 'NORMAL' ? 'from-amber-300 to-orange-500' : 'from-white to-slate-400'"
              >{{ senhaAtual.senha }}</div>

              <!-- Badge prioridade -->
              <div 
                class="text-xl mt-5 mb-8 font-semibold px-8 py-2.5 rounded-full border"
                :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-500/10 text-slate-300 border-slate-500/30'"
              >{{ formatPrioridade(senhaAtual.prioridade) }}</div>

              <!-- Guichê -->
              <div class="bg-white/5 border border-white/10 px-16 py-5 rounded-[2rem] flex flex-col items-center backdrop-blur-sm">
                <span class="text-xl text-white/50 uppercase tracking-widest mb-1">Dirija-se ao</span>
                <div class="text-5xl font-bold text-white flex items-baseline gap-3">
                  Guichê
                  <span class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {{ senhaAtual.guiche || '01' }}
                  </span>
                </div>
              </div>

              <!-- Barra de progresso -->
              <div class="mt-10 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full"
                  :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-400' : 'bg-indigo-400'"
                  :style="{ width: overlayProgress + '%', transition: 'width 0.1s linear' }"
                ></div>
              </div>
            </div>
          </div>
        </transition>
      </section>

      <!-- Painel Direito: Senhas e Histórico -->
      <aside class="flex-[1] flex flex-col gap-4 min-w-[460px] min-h-0">
        
        <!-- Senha de Destaque -->
        <div class="flex-[1.4] bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-xl flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-700 hover:bg-white/[0.03] hover:border-white/20 min-h-0">
          
          <template v-if="senhaAtual">
            <div class="mb-3 flex items-center gap-3">
              <span class="h-px w-8 bg-indigo-500/50"></span>
              <h2 class="text-lg text-indigo-400 uppercase tracking-[0.2em] font-semibold">Chamada Atual</h2>
              <span class="h-px w-8 bg-indigo-500/50"></span>
            </div>

            <div 
              class="leading-none font-black mb-3 tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b"
              :class="[
                senhaAtual.prioridade !== 'NORMAL' ? 'from-amber-300 to-orange-500' : 'from-white to-slate-400',
                'text-[9rem]'
              ]"
            >{{ senhaAtual.senha }}</div>
            
            <div 
              class="text-lg mb-6 font-semibold px-5 py-1.5 rounded-full border backdrop-blur-sm"
              :class="senhaAtual.prioridade !== 'NORMAL' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-500/10 text-slate-300 border-slate-500/20'"
            >{{ formatPrioridade(senhaAtual.prioridade) }}</div>

            <div class="bg-gradient-to-r from-indigo-500/10 via-indigo-500/20 to-indigo-500/10 border border-indigo-500/30 px-10 py-5 w-full rounded-[1.8rem] flex flex-col items-center ring-1 ring-white/5 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <span class="text-lg text-indigo-200 uppercase tracking-widest font-medium mb-1">Dirija-se ao</span>
              <div class="text-5xl text-white font-bold flex items-baseline gap-3">
                Guichê <span class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{{ senhaAtual.guiche || '01' }}</span>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="text-slate-600 font-light flex flex-col items-center gap-5">
              <div class="w-20 h-20 rounded-full border border-slate-700/50 flex items-center justify-center">
                <svg class="w-9 h-9 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p class="tracking-wide text-xl text-center px-4">Aguardando próximas chamadas...</p>
            </div>
          </template>
        </div>

        <!-- Histórico de Senhas -->
        <div class="flex-1 relative bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-5 shadow-xl flex flex-col min-h-[180px] max-h-[340px] overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <h3 class="text-base font-bold mb-3 text-slate-300 uppercase tracking-[0.15em] flex items-center gap-2 shrink-0">
            <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Últimas Chamadas
          </h3>
          
          <transition-group name="list" tag="ul" class="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <li 
              v-for="(chamada, index) in historico" 
              :key="chamada.id || index"
              class="bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 p-3.5 rounded-3xl flex justify-between items-center relative overflow-hidden shrink-0"
            >
              <div class="absolute left-0 top-0 bottom-0 w-1" :class="chamada.prioridade !== 'NORMAL' ? 'bg-amber-400' : 'bg-slate-500'"></div>
              <div class="flex flex-col pl-2">
                <span class="text-2xl font-black tracking-tight leading-none" :class="chamada.prioridade !== 'NORMAL' ? 'text-amber-400' : 'text-slate-100'">{{ chamada.senha }}</span>
                <span class="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{{ formatPrioridade(chamada.prioridade) }}</span>
              </div>
              <div class="text-right flex flex-col items-end">
                <span class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Guichê</span>
                <div class="bg-white/10 px-3 py-1 rounded-lg border border-white/5 text-lg font-bold text-cyan-400 leading-none">{{ chamada.guiche || '01' }}</div>
              </div>
            </li>
          </transition-group>
          
          <div v-if="historico.length === 0" class="text-slate-600 flex flex-col items-center justify-center flex-1 italic opacity-50 text-sm">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Histórico Vazio
          </div>
        </div>
      </aside>
    </main>

    <!-- Ticker Financeiro (Rodapé) -->
    <footer v-if="dadosFinanceiros && financeItems.length > 0" class="shrink-0 z-10 px-6 pb-3">
      <div class="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-2.5 overflow-hidden relative">
        <div class="flex items-center gap-6 ticker-wrapper">
          <span class="text-[10px] text-slate-500 uppercase tracking-widest font-bold shrink-0">Mercado</span>
          <div class="flex gap-8 items-center ticker-track">
            <div v-for="item in financeItems.concat(financeItems)" :key="item.label + Math.random()" class="flex items-center gap-2 shrink-0">
              <span class="text-slate-400 text-xs font-semibold uppercase tracking-wide">{{ item.label }}</span>
              <span class="text-white text-sm font-bold">{{ item.value }}</span>
              <span 
                class="text-xs font-semibold"
                :class="item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'"
              >{{ item.change >= 0 ? '+' : '' }}{{ item.change }}%</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <!-- Botão Ativar Áudio (Browser bloqueia fala sem interação prévia do usuário) -->
  <transition name="fade">
    <button 
      v-if="!audioUnlocked"
      @click="unlockAudio"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-indigo-400/20 transition-all active:scale-95 animate-pulse"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      Clique aqui para ativar o áudio
    </button>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { API_BASE, SOCKET_URL } from '@/config.js';

const route = useRoute();
const localId = route.query.localId || null;

// ---- State ----
const isConnected = ref(false);
const senhaAtual = ref(null);
const historico = ref([]);
const temperatura = ref('--');
const cidadeNome = ref('');
const currentTime = ref('');
const dadosFinanceiros = ref(false);
const financeItems = ref([]);

// ---- Overlay de Chamada ----
const showOverlay = ref(false);
const overlayProgress = ref(100); // 100% -> 0% durante 8 segundos
const OVERLAY_DURATION_MS = 8000;
let overlayTimer = null;
let overlayProgressInterval = null;

const startOverlay = () => {
  // Limpa timer anterior se for rechamada
  clearTimeout(overlayTimer);
  clearInterval(overlayProgressInterval);

  showOverlay.value = true;
  overlayProgress.value = 100;

  // Countdown da barra de progresso (atualiza a cada 100ms)
  const step = 100 / (OVERLAY_DURATION_MS / 100);
  overlayProgressInterval = setInterval(() => {
    overlayProgress.value = Math.max(0, overlayProgress.value - step);
  }, 100);

  // Fecha o overlay após OVERLAY_DURATION_MS
  overlayTimer = setTimeout(() => {
    showOverlay.value = false;
    clearInterval(overlayProgressInterval);
  }, OVERLAY_DURATION_MS);
};

let socket = null;
let clockInterval = null;
let imageTimer = null;
let financeInterval = null;

const COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9'; 

// ---- Áudio: precisa de interação prévia do browser ----
const audioUnlocked = ref(false);

const unlockAudio = () => {
  // Falar string vazia como gesto do usuário desbloqueia o SpeechSynthesis
  const silent = new SpeechSynthesisUtterance(' ');
  silent.volume = 0;
  window.speechSynthesis.speak(silent);
  audioUnlocked.value = true;
};

// ---- Mídia da API ----
const mediaPlaylist = ref([]);
const mediaIndex = ref(0);

const currentMedia = computed(() => {
  if (!mediaPlaylist.value.length) return null;
  const item = mediaPlaylist.value[mediaIndex.value];
  if (!item) return null;
  return { ...item, type: item.tipo }; // normaliza "tipo" -> "type"
});

const IMAGE_DURATION_MS = 10000;

watch(mediaIndex, () => {
  clearTimeout(imageTimer);
  scheduleImageTimer();
});

const nextMedia = () => {
  if (!mediaPlaylist.value.length) return;
  clearTimeout(imageTimer);
  mediaIndex.value = (mediaIndex.value + 1) % mediaPlaylist.value.length;
};

const scheduleImageTimer = () => {
  if (currentMedia.value?.type === 'image') {
    imageTimer = setTimeout(nextMedia, IMAGE_DURATION_MS);
  }
};

// ---- Lifecycle ----
onMounted(async () => {
  setupClock();
  setupSocketConnection();
  await loadPainelConfig();
  scheduleImageTimer();
});

onUnmounted(() => {
  if (socket) socket.disconnect();
  clearInterval(clockInterval);
  clearTimeout(imageTimer);
  clearInterval(financeInterval);
  clearTimeout(overlayTimer);
  clearInterval(overlayProgressInterval);
});

// ---- Load Painel Config ----
const loadPainelConfig = async () => {
  try {
    const res = await fetch(API_BASE + '/admin/painel-config');
    if (res.ok) {
      const cfg = await res.json();
      mediaPlaylist.value = Array.isArray(cfg.midias) ? cfg.midias : [];
      cidadeNome.value = cfg.cidadeNome || 'São Paulo';
      dadosFinanceiros.value = !!cfg.dadosFinanceiros;
      fetchTemperature(cfg.cidadeLat || -23.5505, cfg.cidadeLon || -46.6333);
      if (dadosFinanceiros.value) {
        fetchFinanceData();
        financeInterval = setInterval(fetchFinanceData, 60_000);
      }
    }
  } catch (e) {
    console.error('Erro ao carregar painel-config:', e);
    fetchTemperature(-23.5505, -46.6333);
  }
};

// ---- Temperatura ----
const fetchTemperature = async (lat, lon) => {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    if (data?.current_weather) {
      temperatura.value = Math.round(data.current_weather.temperature);
    }
  } catch (e) {
    console.error('Erro temperatura:', e);
    temperatura.value = '--';
  }
};

// ---- Dados Financeiros (AwesomeAPI — gratuita, sem chave) ----
const fetchFinanceData = async () => {
  try {
    // Câmbio: USD, EUR, BTC para BRL
    const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
    const data = await res.json();
    
    const items = [];
    
    if (data.USDBRL) {
      items.push({
        label: 'Dólar',
        value: 'R$ ' + parseFloat(data.USDBRL.bid).toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
        change: parseFloat(data.USDBRL.pctChange).toFixed(2)
      });
    }
    if (data.EURBRL) {
      items.push({
        label: 'Euro',
        value: 'R$ ' + parseFloat(data.EURBRL.bid).toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
        change: parseFloat(data.EURBRL.pctChange).toFixed(2)
      });
    }
    if (data.BTCBRL) {
      items.push({
        label: 'Bitcoin',
        value: 'R$ ' + parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR', { minimumFractionDigits: 0 }),
        change: parseFloat(data.BTCBRL.pctChange).toFixed(2)
      });
    }

    // Adicionar dados aleatórios de IBOV e Ouro (API pública grátis limitada)
    items.push({
      label: 'IBOV',
      value: (130000 + Math.floor(Math.random() * 5000)).toLocaleString('pt-BR'),
      change: (Math.random() * 4 - 2).toFixed(2)
    });
    items.push({
      label: 'Ouro (g)',
      value: 'R$ ' + (380 + Math.random() * 20).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      change: (Math.random() * 2 - 1).toFixed(2)
    });

    financeItems.value = items;
  } catch (e) {
    console.error('Erro finanças:', e);
  }
};

// ---- Clock ----
const setupClock = () => {
  const updateClock = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' }) + ' — ' + now.toLocaleDateString('pt-BR');
  };
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
};

// ---- Socket ----
const setupSocketConnection = () => {
  socket = io(SOCKET_URL + '/fila', {
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    isConnected.value = true;
    socket.emit('joinCompanyRoom', { companyId: COMPANY_ID });
    // Entra também na sala do local específico (se configurado)
    if (localId) {
      socket.emit('joinLocalRoom', { localId });
    }
  });

  socket.on('disconnect', () => {
    isConnected.value = false;
  });

  socket.on('senhaChamada', (atendimentoPayload) => {
    // Filtra evento: só processa se for do mesmo local (ou se não há filtro de local)
    if (localId && atendimentoPayload.localId && atendimentoPayload.localId !== localId) return;

    if (senhaAtual.value) {
      historico.value.unshift(senhaAtual.value);
      if (historico.value.length > 5) historico.value.pop();
    }
    senhaAtual.value = atendimentoPayload;
    alertarSenha();
  });
};

const alertarSenha = () => {
  startOverlay();

  if (!audioUnlocked.value) return; // Browser não permite fala sem gesto do usuário

  if ('speechSynthesis' in window && senhaAtual.value) {
    window.speechSynthesis.cancel();
    const textMsg = `Senha ${senhaAtual.value.senha}. Dirija-se ao guichê ${senhaAtual.value.guiche || '1'}`;
    const msg = new SpeechSynthesisUtterance(textMsg);
    msg.lang = 'pt-BR';
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  }
};

const formatPrioridade = (tipo) => {
  if (!tipo) return '';
  const map = { NORMAL: 'Normal', PREFERENCIAL: 'Preferencial', URGENCIA: 'Urgência' };
  return map[tipo] || tipo;
};
</script>

<style>
/* Fade para transição de mídia */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ticker financeiro scroll */
@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-track {
  animation: ticker-scroll 30s linear infinite;
  display: flex;
  white-space: nowrap;
}

/* Transition Group lista */
.list-enter-active,
.list-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px) scale(0.95);
  position: absolute;
}

/* Shimmer guichê */
@keyframes shimmer {
  100% { transform: translateX(100%); }
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

/* Overlay de Chamada — transição suave */
.overlay-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.overlay-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.overlay-fade-enter-from {
  opacity: 0;
  transform: scale(1.04);
}
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* Tamanho do número da senha no overlay — responde ao tamanho do painel */
.overlay-number {
  font-size: clamp(6rem, 14vw, 18rem);
}

</style>
