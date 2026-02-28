<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
    
    <!-- Background Decorators -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
    <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
    
    <div class="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10">
      
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
        </div>
        <h1 class="text-3xl font-black text-white tracking-tight">Filla SaaS</h1>
        <p class="text-indigo-200 mt-2 font-medium">Acesso restrito à unidade</p>
      </div>

      <form @submit.prevent="fazerLogin" class="space-y-6">
        
        <!-- Error Alert -->
        <div v-if="erroMessage" class="bg-rose-500/20 border border-rose-500/50 text-rose-200 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ erroMessage }}
        </div>

        <div>
          <label class="block text-sm font-semibold text-indigo-100 mb-2">E-mail corporativo</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <input v-model="form.email" required type="email" class="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" placeholder="nome@empresa.com" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-indigo-100 mb-2">Senha de acesso</label>
          <div class="relative">
             <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <input v-model="form.senha" required type="password" class="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
          <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
          {{ loading ? 'Autenticando...' : 'Entrar no Sistema' }}
        </button>

      </form>
      
      <div class="mt-8 text-center text-sm text-slate-400">
        Problemas para acessar? <a href="#" class="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Contate o suporte</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { API_BASE } from '@/config.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({ email: '', senha: '' });
const loading = ref(false);
const erroMessage = ref('');

const fazerLogin = async () => {
  if (loading.value) return;
  loading.value = true;
  erroMessage.value = '';

  try {
    const res = await fetch(API_BASE + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (res.ok) {
      const data = await res.json();
      
      // Save Token & Payload
      localStorage.setItem('filas_token', data.access_token);
      localStorage.setItem('filas_user', JSON.stringify(data.user));

      // Redirect by Role
      if (data.user.role === 'ADMIN' || data.user.role === 'GERENTE') {
        router.push('/admin');
      } else {
        router.push('/atendente');
      }
    } else {
      erroMessage.value = 'Email ou senha inválidos. Tente novamente.';
    }
  } catch (error) {
    erroMessage.value = 'Falha de conexão com o servidor.';
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
