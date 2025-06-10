<template>
  <div class="min-h-screen flex flex-col justify-between bg-brand-cream font-sans relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-40 left-10 w-40 h-40 bg-brand-sage/15 rounded-full blur-2xl animate-float-delay"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-forest/5 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
    
    <!-- Header Component -->
    <Header />    <!-- Main Content -->
    <div class="flex-1 main-content p-4 sm:p-8 flex flex-col items-center relative z-10">
      <!-- Hero Section -->
      <div class="text-center mb-12 w-full" data-aos="fade-down">
        <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-forest via-brand-sage to-brand-forest bg-clip-text text-transparent">
          Dompet Jagat
        </h1>
        <p class="text-brand-forest text-lg sm:text-xl mb-8 max-w-md mx-auto">
          Tukar poin Anda dengan hadiah menarik dan nikmati reward dari usaha ramah lingkungan!
        </p>
      </div>

      <!-- Total Poin Card -->
      <div class="mb-12 w-full max-w-md" data-aos="zoom-in" data-aos-delay="200">
        <div class="glass-card p-8 relative overflow-hidden group hover:scale-105 transition-all duration-500">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-yellow/30 to-brand-sage/30 rounded-full blur-xl"></div>
          <div class="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-sage/20 to-brand-forest/20 rounded-full blur-lg"></div>
          
          <div class="relative z-10 text-center">            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-sage to-brand-forest shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="space-y-2">
              <p class="text-brand-forest/70 text-sm font-medium uppercase tracking-wider">Total Poin Anda</p>
              <div class="text-4xl font-bold bg-gradient-to-r from-brand-forest to-brand-sage bg-clip-text text-transparent counter-animation">
                {{ totalPoin.toLocaleString('id-ID') }}
              </div>
              <div class="flex items-center justify-center gap-2 text-brand-sage">
                <div class="w-2 h-2 bg-brand-sage rounded-full animate-pulse"></div>
                <span class="text-sm font-medium">Poin Aktif</span>
                <div class="w-2 h-2 bg-brand-sage rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Redemption Methods -->
      <div class="w-full max-w-4xl mb-12" data-aos="fade-up" data-aos-delay="300">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-brand-forest mb-2">Pilih Metode Penukaran</h2>
          <p class="text-brand-forest/70">Tukar poin dengan berbagai pilihan reward yang tersedia</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <!-- E-Wallet Card -->
          <div class="redeem-card group" @click="openModal('ewallet')" data-aos="flip-left" data-aos-delay="400">
            <div class="relative overflow-hidden h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-yellow to-brand-sage opacity-90"></div>
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl transform translate-x-6 -translate-y-6"></div>
              
              <div class="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">E-Wallet</h3>
                <p class="text-white/80 text-sm">DANA, OVO, GoPay, ShopeePay</p>
                <div class="mt-4 px-4 py-2 bg-white/20 rounded-full">
                  <span class="text-white text-xs font-medium">Mulai 500 Poin</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pulsa Card -->
          <div class="redeem-card group" @click="openModal('pulsa')" data-aos="flip-left" data-aos-delay="500">
            <div class="relative overflow-hidden h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-sage to-brand-forest opacity-90"></div>
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl transform translate-x-6 -translate-y-6"></div>
              
              <div class="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Pulsa</h3>
                <p class="text-white/80 text-sm">Semua Provider</p>
                <div class="mt-4 px-4 py-2 bg-white/20 rounded-full">
                  <span class="text-white text-xs font-medium">Mulai 600 Poin</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Token Listrik Card -->
          <div class="redeem-card group" @click="openModal('token')" data-aos="flip-left" data-aos-delay="600">
            <div class="relative overflow-hidden h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-forest to-brand-sage opacity-90"></div>
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl transform translate-x-6 -translate-y-6"></div>
              
              <div class="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Token Listrik</h3>
                <p class="text-white/80 text-sm">PLN Prepaid</p>
                <div class="mt-4 px-4 py-2 bg-white/20 rounded-full">
                  <span class="text-white text-xs font-medium">Mulai 700 Poin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      <!-- Modal E-Wallet -->
      <div v-if="showModal === 'ewallet'" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-20 pb-4" @click.self="closeModal">
        <div class="modal-card w-full max-w-md relative my-auto" @click.stop data-aos="zoom-in" data-aos-duration="300">
          <button class="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10" @click="closeModal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-yellow to-brand-sage">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-brand-forest mb-2">Redeem E-Wallet</h2>
              <div class="px-4 py-2 bg-brand-cream rounded-full inline-block">
                <span class="text-sm text-brand-forest">Sisa: <span class="font-bold text-brand-sage">{{ totalPoin.toLocaleString('id-ID') }} poin</span></span>              </div>
            </div>            <div class="space-y-6 pb-4">
              <div class="form-group">
                <label class="form-label">Pilih E-Wallet</label>
                <select v-model="selectedEwallet" class="form-select">
                  <option disabled value="">-- Pilih E-Wallet --</option>
                  <option value="dana">DANA</option>
                  <option value="ovo">OVO</option>
                  <option value="gopay">GoPay</option>
                  <option value="shopeepay">ShopeePay</option>
                </select>
              </div>

              <div v-if="selectedEwallet" class="form-group">
                <label class="form-label">Nomor E-Wallet</label>
                <input v-model="ewalletNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="20" placeholder="Masukkan nomor e-wallet" class="form-input" />
              </div>

              <div v-if="selectedEwallet" class="form-group">
                <label class="form-label">Nominal E-Wallet</label>
                <select v-model="selectedEwalletNominal" class="form-select">
                  <option disabled value="">-- Pilih Nominal --</option>
                  <option v-for="nom in ewalletNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point" :class="{ 'text-gray-400': totalPoin < nom.point }">
                    {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
                  </option>
                </select>
              </div><div v-if="selectedEwallet" class="flex justify-center py-6">
                <div class="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <img :src="ewalletLogos[selectedEwallet]" alt="Logo E-Wallet" class="w-16 h-16 object-contain" />
                </div>
              </div>              <button v-if="selectedEwallet && selectedEwalletNominal" @click="handleRedeem('ewallet')" class="btn-submit w-full" :disabled="totalPoin < (ewalletNominals.find(n => n.value === selectedEwalletNominal)?.point || 0)">
                <div class="btn-submit-content">
                  <svg class="btn-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  <div class="btn-submit-text">
                    <span class="btn-submit-title">Tukar E-Wallet</span>
                    <span class="btn-submit-subtitle">{{ (ewalletNominals.find(n => n.value === selectedEwalletNominal)?.point || 0).toLocaleString('id-ID') }} Poin diperlukan</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>      <!-- Modal Pulsa -->
      <div v-if="showModal === 'pulsa'" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-20 pb-4" @click.self="closeModal">
        <div class="modal-card w-full max-w-md relative my-auto" @click.stop data-aos="zoom-in" data-aos-duration="300">
          <button class="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10" @click="closeModal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-sage to-brand-forest">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-brand-forest mb-2">Redeem Pulsa</h2>
              <div class="px-4 py-2 bg-brand-cream rounded-full inline-block">
                <span class="text-sm text-brand-forest">Sisa: <span class="font-bold text-brand-sage">{{ totalPoin.toLocaleString('id-ID') }} poin</span></span>              </div>
            </div>            <div class="space-y-6 pb-4">
              <div class="form-group">
                <label class="form-label">Pilih Provider</label>
                <select v-model="selectedPulsaProvider" class="form-select">
                  <option disabled value="">-- Pilih Provider --</option>
                  <option v-for="prov in pulsaProviders" :key="prov.value" :value="prov.value">{{ prov.label }}</option>
                </select>
              </div>

              <div v-if="selectedPulsaProvider" class="form-group">
                <label class="form-label">Nomor HP</label>
                <input v-model="pulsaNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="15" placeholder="Masukkan nomor HP" class="form-input" />
              </div>

              <div v-if="selectedPulsaProvider" class="form-group">
                <label class="form-label">Nominal Pulsa</label>
                <select v-model="selectedPulsaNominal" class="form-select">
                  <option disabled value="">-- Pilih Nominal --</option>
                  <option v-for="nom in pulsaNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point" :class="{ 'text-gray-400': totalPoin < nom.point }">
                    {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
                  </option>
                </select>
              </div><div v-if="selectedPulsaProvider" class="flex justify-center py-6">
                <div class="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <img :src="pulsaProviderLogos[selectedPulsaProvider]" alt="Logo Provider" class="w-16 h-16 object-contain" />
                </div>
              </div>              <button v-if="selectedPulsaProvider && selectedPulsaNominal" @click="handleRedeem('pulsa')" class="btn-submit w-full" :disabled="totalPoin < (pulsaNominals.find(n => n.value === selectedPulsaNominal)?.point || 0)">
                <div class="btn-submit-content">
                  <svg class="btn-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div class="btn-submit-text">
                    <span class="btn-submit-title">Tukar Pulsa</span>
                    <span class="btn-submit-subtitle">{{ (pulsaNominals.find(n => n.value === selectedPulsaNominal)?.point || 0).toLocaleString('id-ID') }} Poin diperlukan</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>      <!-- Modal Token Listrik -->
      <div v-if="showModal === 'token'" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-20 pb-4" @click.self="closeModal">
        <div class="modal-card w-full max-w-md relative my-auto" @click.stop data-aos="zoom-in" data-aos-duration="300">
          <button class="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10" @click="closeModal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-forest to-brand-sage">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-brand-forest mb-2">Redeem Token Listrik</h2>
              <div class="px-4 py-2 bg-brand-cream rounded-full inline-block">
                <span class="text-sm text-brand-forest">Sisa: <span class="font-bold text-brand-sage">{{ totalPoin.toLocaleString('id-ID') }} poin</span></span>              </div>
            </div>            <div class="space-y-6 pb-4">
              <div class="form-group">
                <label class="form-label">Nominal Token</label>
                <select v-model="selectedTokenNominal" class="form-select">
                  <option disabled value="">-- Pilih Nominal --</option>
                  <option v-for="nom in tokenNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point" :class="{ 'text-gray-400': totalPoin < nom.point }">
                    {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Nomor Meter/kWh</label>
                <input v-model="tokenNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="20" minlength="20" placeholder="Masukkan nomor meter/kWh (20 digit)" class="form-input" />
              </div><div class="flex justify-center py-6">
                <div class="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <img src="/logo/token-listrik/pln.png" alt="Logo PLN" class="w-16 h-16 object-contain" />
                </div>
              </div>              <button v-if="selectedTokenNominal" @click="handleRedeem('token')" class="btn-submit w-full" :disabled="totalPoin < (tokenNominals.find(n => n.value === selectedTokenNominal)?.point || 0)">
                <div class="btn-submit-content">
                  <svg class="btn-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <div class="btn-submit-text">
                    <span class="btn-submit-title">Tukar Token Listrik</span>
                    <span class="btn-submit-subtitle">{{ (tokenNominals.find(n => n.value === selectedTokenNominal)?.point || 0).toLocaleString('id-ID') }} Poin diperlukan</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>      <!-- History Penukaran -->
      <div class="w-full max-w-4xl mb-12" data-aos="fade-up" data-aos-delay="700">
        <div class="glass-card p-8 relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-brand-sage to-brand-forest rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-brand-forest">Riwayat Penukaran</h3>
                <p class="text-brand-forest/70 text-sm">Lihat semua transaksi penukaran poin Anda</p>
              </div>
            </div>

            <div class="space-y-3">
              <div v-if="redeemLoading" class="text-center py-12">
                <div class="inline-flex flex-col items-center gap-4">
                  <div class="w-12 h-12 border-4 border-brand-sage/30 border-t-brand-sage rounded-full animate-spin"></div>
                  <p class="text-brand-forest/70">Memuat riwayat penukaran...</p>
                </div>
              </div>
              
              <div v-else-if="redeemError" class="text-center py-12">
                <div class="inline-flex flex-col items-center gap-4">
                  <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <p class="text-red-600">{{ redeemError }}</p>
                </div>
              </div>
              
              <div v-else-if="mappedHistory.length === 0" class="text-center py-12">
                <div class="inline-flex flex-col items-center gap-4">
                  <div class="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-brand-forest/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-brand-forest/70 font-medium">Belum ada riwayat penukaran</p>
                    <p class="text-brand-forest/50 text-sm">Mulai tukar poin Anda dengan reward menarik!</p>
                  </div>
                </div>
              </div>
              
              <div v-else class="space-y-3">
                <div v-for="(item, idx) in mappedHistory" :key="idx" class="history-item group" data-aos="fade-up" :data-aos-delay="idx * 100">
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-gradient-to-br from-brand-yellow to-brand-sage rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-brand-forest group-hover:text-brand-sage transition-colors">{{ item.tipe }}</h4>
                        <p class="text-brand-forest/70 text-sm">{{ item.nominal }}</p>
                        <p class="text-brand-forest/50 text-xs">{{ item.tanggal }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center gap-1 text-brand-sage font-bold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"/>
                        </svg>
                        <span>{{ item.poin }} poin</span>
                      </div>
                      <div class="mt-1">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          ✅ Berhasil
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingIndicator :visible="globalLoading" :message="globalLoadingMsg" />
    <BottomNav active="redeem" />
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserProfile } from '../models/userprofileModel.js'
import { redeem, getRedeemHistory } from '../services/api.js'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()

const selectedEwallet = ref('')
const selectedEwalletNominal = ref('')
const selectedPulsaNominal = ref('')
const selectedPulsaProvider = ref('')
const selectedTokenNominal = ref('')
const ewalletNumber = ref('')
const pulsaNumber = ref('')
const tokenNumber = ref('')
const dummyHistory = ref([])

// Modal logic
const showModal = ref('')
function openModal(type) {
  showModal.value = type
}
function closeModal() {
  showModal.value = ''
  // Reset pilihan saat modal ditutup
  selectedEwallet.value = ''
  selectedEwalletNominal.value = ''
  selectedPulsaProvider.value = ''
  selectedPulsaNominal.value = ''
  selectedTokenNominal.value = ''
  ewalletNumber.value = ''
  pulsaNumber.value = ''
  tokenNumber.value = ''
}

const ewalletLogos = {
  dana: '/logo/e-wallet/dana.png',
  ovo: '/logo/e-wallet/ovo.png',
  gopay: '/logo/e-wallet/gopay.png',
  shopeepay: '/logo/e-wallet/shopeepay.png',
}

const ewalletNominals = [
  { value: '5.000', label: '5.000', point: 500 },
  { value: '10.000', label: '10.000', point: 900 },
  { value: '20.000', label: '20.000', point: 1700 },
  { value: '50.000', label: '50.000', point: 4000 },
  { value: '100.000', label: '100.000', point: 7500 },
]
const pulsaNominals = [
  { value: '5.000', label: '5.000', point: 600 },
  { value: '10.000', label: '10.000', point: 1100 },
  { value: '20.000', label: '20.000', point: 2000 },
  { value: '50.000', label: '50.000', point: 4800 },
  { value: '100.000', label: '100.000', point: 9000 },
]
const pulsaProviders = [
  { value: 'telkomsel', label: 'Telkomsel' },
  { value: 'indosat', label: 'Indosat' },
  { value: 'xl', label: 'XL' },
  { value: 'axis', label: 'Axis' },
  { value: 'tri', label: 'Tri' },
  { value: 'smartfren', label: 'Smartfren' },
]
const pulsaProviderLogos = {
  telkomsel: ' /logo/provider/telkomsel.png',
  indosat: ' /logo/provider/indosat.png',
  xl: ' /logo/provider/xl.png',
  axis: ' /logo/provider/axis.png',
  tri: ' /logo/provider/3.png',
  smartfren: ' /logo/provider/smartfren.png',
}
const tokenNominals = [
  { value: '5.000', label: '5.000', point: 700 },
  { value: '10.000', label: '10.000', point: 1300 },
  { value: '20.000', label: '20.000', point: 2500 },
  { value: '50.000', label: '50.000', point: 6000 },
  { value: '100.000', label: '100.000', point: 11000 },
]

const showToast = ref(false)
const toastMsg = ref('')
// Tambahkan state untuk type dan icon toast
const toastType = ref('success')
const toastIcon = ref('✔️')

// Total poin statis
const { userProfile, fetchUserProfile } = useUserProfile()

const totalPoin = computed(() => userProfile.value?.points ?? 0)

// Riwayat redeem
const redeemHistory = ref([])
const redeemLoading = ref(false)
const redeemError = ref('')

async function fetchRedeemHistory() {
  globalLoading.value = true
  globalLoadingMsg.value = 'Memuat riwayat penukaran...'
  redeemLoading.value = true
  redeemError.value = ''
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Sesi login habis, silakan login ulang.')
    const data = await getRedeemHistory(token)
    redeemHistory.value = Array.isArray(data) ? data : []
  } catch (err) {
    redeemError.value = err?.message || 'Gagal mengambil riwayat penukaran.'
    redeemHistory.value = []
  } finally {
    redeemLoading.value = false
    globalLoading.value = false
    globalLoadingMsg.value = ''
  }
}

onMounted(() => {
  AOS.init({ 
    once: true, 
    duration: 800,
    offset: 100,
    easing: 'ease-out-cubic'
  })
  fetchUserProfile(localStorage.getItem('token'))
  fetchRedeemHistory()
})

// Gantikan dummyHistory dengan computed yang memetakan redeemHistory
const mappedHistory = computed(() => {
  return redeemHistory.value.map(item => ({
    tipe: item.type === 'ewallet' ? `E-Wallet (${item.provider || '-'})` : item.type === 'pulsa' ? `Pulsa (${item.provider || '-'})` : 'Token Listrik',
    nominal: item.amount ? `Rp${item.amount.toLocaleString('id-ID')}` : '-',
    tanggal: item.date || (item.created_at ? item.created_at.slice(0,10) : '-'),
    poin: item.points || '-',
    status: item.status || 'success',
  }))
})

const globalLoading = ref(false)
const globalLoadingMsg = ref('')

async function handleRedeem(type) {
  let token = localStorage.getItem('token')
  if (!token || token === 'null' || token === 'undefined') {
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    toastMsg.value = 'Sesi login habis, silakan login ulang.'
    setTimeout(() => router.push('/login'), 1500)
    return
  }
  token = token.trim()
  if (!/^eyJ/.test(token)) { // JWT harus diawali eyJ
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    toastMsg.value = 'Token tidak valid, silakan login ulang.'
    setTimeout(() => router.push('/login'), 1500)
    return
  }
  let payload = {}
  if (type === 'ewallet') {
    // Validasi nomor e-wallet 11-15 digit
    if (!/^\d{11,15}$/.test(ewalletNumber.value)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Nomor e-wallet harus 11-15 digit!'
      return
    }
    const selected = ewalletNominals.find(n => n.value === selectedEwalletNominal.value)
    const amount = Number(selectedEwalletNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!selectedEwallet.value || !ewalletNumber.value || !amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data e-wallet tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'ewallet',
      provider: selectedEwallet.value,
      amount,
      points,
      target: ewalletNumber.value
    }
  } else if (type === 'pulsa') {
    // Validasi nomor pulsa 11-15 digit
    if (!/^\d{11,15}$/.test(pulsaNumber.value)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Nomor HP harus 11-15 digit!'
      return
    }
    const selected = pulsaNominals.find(n => n.value === selectedPulsaNominal.value)
    const amount = Number(selectedPulsaNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!selectedPulsaProvider.value || !pulsaNumber.value || !amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data pulsa tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'pulsa',
      provider: selectedPulsaProvider.value,
      amount,
      points,
      target: pulsaNumber.value
    }
  } else if (type === 'token') {
    if (!/^\d{20}$/.test(tokenNumber.value)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Nomor meter/kWh harus 20 digit angka!'
      return
    }
    const selected = tokenNominals.find(n => n.value === selectedTokenNominal.value)
    const amount = Number(selectedTokenNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data token listrik tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'token',
      provider: '', // provider harus selalu ada sesuai handler backend
      amount,
      points,
      target: tokenNumber.value
    }
  }
  // Tidak perlu hapus field provider, selalu ada (string kosong jika token listrik)
  // Debug log payload dan tipe data
  console.log('Payload redeem:', payload, JSON.stringify(payload), {
    type: typeof payload.type,
    provider: typeof payload.provider,
    amount: typeof payload.amount,
    points: typeof payload.points,
    target: typeof payload.target,
  })
  globalLoading.value = true
  globalLoadingMsg.value = 'Memproses penukaran...'
  try {
    await redeem(payload, token)
    showToast.value = true
    toastType.value = 'success'
    toastIcon.value = '✔️'
    toastMsg.value = 'Redeem berhasil!'
    await fetchUserProfile(token)
    await fetchRedeemHistory() // refresh riwayat setelah redeem
    closeModal()
  } catch (err) {
    let msg = err?.response?.data?.message || err?.message || 'Redeem gagal!'
    // Jika error karena token, redirect ke login
    if (msg.toLowerCase().includes('token')) {
      toastMsg.value = 'Sesi login habis/invalid, silakan login ulang.'
      setTimeout(() => router.push('/login'), 1800)
    } else {
      toastMsg.value = msg
    }
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    console.error('Redeem error:', err?.response || err)
  } finally {
    globalLoading.value = false
    globalLoadingMsg.value = ''
  }
}
</script>

<style scoped>
/* Glass morphism cards */
.glass-card {
  background: rgba(254, 250, 224, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(164, 180, 101, 0.2);
  box-shadow: 
    0 20px 40px rgba(98, 111, 71, 0.1),
    0 15px 12px rgba(98, 111, 71, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 32px 64px rgba(98, 111, 71, 0.15),
    0 20px 24px rgba(98, 111, 71, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Redeem cards with gradients */
.redeem-card {
  border-radius: 20px;
  box-shadow: 
    0 10px 30px rgba(98, 111, 71, 0.15),
    0 1px 8px rgba(98, 111, 71, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  min-height: 200px;
}

.redeem-card:hover {
  transform: translateY(-12px) scale(1.05);
  box-shadow: 
    0 25px 50px rgba(98, 111, 71, 0.25),
    0 10px 20px rgba(98, 111, 71, 0.15);
}

.redeem-card:active {
  transform: translateY(-8px) scale(1.02);
}

/* Modal styling */
.modal-card {
  background: rgba(254, 250, 224, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(164, 180, 101, 0.3);
  box-shadow: 
    0 25px 50px rgba(98, 111, 71, 0.25),
    0 15px 25px rgba(98, 111, 71, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  margin: auto;
  width: 100%;
  max-width: 520px; /* Diperbesar dari 28rem ke 32.5rem */
}

/* Ensure modal doesn't overlap with header */
@media (min-width: 768px) {
  .modal-card {
    max-height: calc(100vh - 120px);
    margin-top: 60px;
    margin-bottom: 60px;
  }
}

@media (min-width: 1024px) {
  .modal-card {
    max-height: calc(100vh - 140px);
    margin-top: 70px;
    margin-bottom: 70px;
  }
}

/* Hide scrollbar but keep functionality */
.modal-card {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.modal-card::-webkit-scrollbar {
  display: none; /* WebKit browsers */
}

/* Form styling */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #626F47;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(164, 180, 101, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #626F47;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #A4B465;
  box-shadow: 
    0 0 0 3px rgba(164, 180, 101, 0.15),
    0 4px 12px rgba(164, 180, 101, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.form-input::placeholder {
  color: rgba(98, 111, 71, 0.5);
}

/* Clean Submit Button Styling - High Specificity */
.btn-submit.w-full {
  background: linear-gradient(135deg, #A4B465 0%, #7C8557 50%, #626F47 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  border-radius: 18px !important;
  padding: 0 !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 
    0 10px 30px rgba(98, 111, 71, 0.25),
    0 5px 15px rgba(98, 111, 71, 0.15) !important;
  position: relative !important;
  overflow: hidden !important;
  min-height: 75px !important;
  max-height: none !important;
  height: auto !important;
  width: 100% !important;
  margin-top: 1.75rem !important;
  display: block !important;
}

.btn-submit.w-full:hover {
  transform: translateY(-2px) !important;
  box-shadow: 
    0 12px 35px rgba(98, 111, 71, 0.3),
    0 6px 20px rgba(98, 111, 71, 0.2) !important;
  background: linear-gradient(135deg, #626F47 0%, #7C8557 50%, #A4B465 100%) !important;
}

.btn-submit.w-full:active {
  transform: translateY(0) !important;
  transition: all 0.1s ease !important;
}

.btn-submit.w-full:disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
  transform: none !important;
  background: linear-gradient(135deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%) !important;
}

.btn-submit.w-full:disabled:hover {
  transform: none !important;
  box-shadow: 
    0 8px 25px rgba(98, 111, 71, 0.25),
    0 4px 12px rgba(98, 111, 71, 0.15) !important;
}

.btn-submit-content {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 1.25rem !important;
  padding: 1.5rem 2.25rem !important;
  position: relative !important;
  z-index: 2 !important;
  width: 100% !important;
  min-height: 75px !important;
}

.btn-submit-icon {
  width: 28px !important;
  height: 28px !important;
  flex-shrink: 0 !important;
  stroke-width: 2.5 !important;
}

.btn-submit-text {
  text-align: center !important;
  flex: 1 !important;
}

.btn-submit-title {
  display: block !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  margin-bottom: 3px !important;
}

.btn-submit-subtitle {
  display: block !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  opacity: 0.9 !important;
  line-height: 1.2 !important;
}

/* Mobile Responsive Styles */
@media (max-width: 640px) {
  .btn-submit {
    min-height: 78px;
    margin-top: 1.5rem;
    border-radius: 18px;
  }
  
  .btn-submit-content {
    padding: 1.5rem 2rem;
    gap: 1rem;
  }
  
  .btn-submit-icon {
    width: 24px;
    height: 24px;
  }
    .btn-submit-title {
    font-size: 1.125rem;
  }
  
  .btn-submit-subtitle {
    font-size: 0.875rem;
  }
}

/* Animation for smooth button appearance */
@keyframes btn-appear {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.btn-submit {
  animation: btn-appear 0.4s ease-out;
}

/* Mobile Responsive Styles for Submit Button */
@media (max-width: 640px) {
  .btn-submit.w-full {
    min-height: 80px !important;
    margin-top: 1.5rem !important;
    border-radius: 16px !important;
  }
  
  .btn-submit-content {
    padding: 1.5rem 2rem !important;
    gap: 1rem !important;
    min-height: 80px !important;
  }
  
  .btn-submit-icon {
    width: 26px !important;
    height: 26px !important;
  }
  
  .btn-submit-title {
    font-size: 1.125rem !important;
  }
  
  .btn-submit-subtitle {
    font-size: 0.875rem !important;
  }
}

/* Button styling */
.btn-primary {
  background: linear-gradient(135deg, #A4B465, #626F47);
  color: white;
  font-weight: 700;
  border-radius: 16px;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(98, 111, 71, 0.25),
    0 4px 8px rgba(98, 111, 71, 0.15);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 12px 30px rgba(98, 111, 71, 0.3),
    0 6px 12px rgba(98, 111, 71, 0.2);
  background: linear-gradient(135deg, #626F47, #A4B465);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 8px rgba(98, 111, 71, 0.1);
}

/* History item styling */
.history-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(164, 180, 101, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(164, 180, 101, 0.3);
  transform: translateX(8px);
  box-shadow: 
    0 8px 20px rgba(98, 111, 71, 0.1),
    0 4px 8px rgba(98, 111, 71, 0.05);
}

/* Counter animation */
.counter-animation {
  background: linear-gradient(135deg, #626F47, #A4B465, #FFCF50);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(5deg); 
  }
}

@keyframes float-delay {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-15px) rotate(-3deg); 
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Modal backdrop */
.modal-backdrop {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.4);
}

/* Modal close button styling */
.modal-card button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 6px 16px rgba(239, 68, 68, 0.4),
    0 3px 6px rgba(239, 68, 68, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.9);
}

.modal-card button:hover {
  transform: scale(1.1);
  box-shadow: 
    0 8px 20px rgba(239, 68, 68, 0.5),
    0 4px 8px rgba(239, 68, 68, 0.4);
  border-color: rgba(255, 255, 255, 1);
}

.modal-card button:active {
  transform: scale(1.05);
}

/* Desktop close button */
@media (min-width: 1024px) {
  .modal-card button {
    width: 3.5rem !important; /* 56px */
    height: 3.5rem !important;
    top: -1rem !important;
    right: -1rem !important;
  }

  .modal-card button svg {
    width: 1.75rem !important; /* 28px */
    height: 1.75rem !important;
  }
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .glass-card {
    padding: 1.5rem !important;
    border-radius: 20px;
  }
  
  .redeem-card {
    min-height: 180px;
  }
  
  .modal-card {
    margin: 1rem;
    border-radius: 20px;
    max-height: calc(100vh - 80px) !important;
    max-width: calc(100vw - 2rem) !important;
  }
  
  .btn-primary {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
  }
  
  h2 {
    font-size: 1.5rem !important;
  }

  /* Mobile hero section */
  .main-content {
    padding-top: clamp(100px, 12vh, 140px) !important;
  }

  .hero-title {
    font-size: clamp(2rem, 8vw, 2.5rem) !important;
    line-height: 1.2 !important;
    padding: 1rem 0 !important;
    margin-bottom: 1rem !important;
  }
  .text-center.mb-12 {
    margin-bottom: 2rem !important;
  }

  /* Mobile modal close button */
  .modal-card button {
    width: 2.5rem !important; /* 40px */
    height: 2.5rem !important;
    top: -0.75rem !important;
    right: -0.75rem !important;
    border-width: 2px !important;
  }

  .modal-card button svg {
    width: 1.25rem !important; /* 20px */
    height: 1.25rem !important;
  }

  /* Mobile form styling */
  .form-input,
  .form-select {
    padding: 0.75rem 1rem !important;
    font-size: 0.9rem !important;
    border-radius: 12px !important;
  }

  .form-label {
    font-size: 0.875rem !important;
    margin-bottom: 0.5rem !important;
  }

  .form-group {
    margin-bottom: 1.25rem !important;
  }

  /* Mobile modal backdrop */
  .fixed.inset-0 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .modal-card {
    min-height: auto !important;
    max-height: calc(100vh - 100px) !important;  }

  .btn-primary {
    padding: 0.875rem 1.5rem !important;
    font-size: 0.875rem !important;
    min-height: auto !important;
    border-radius: 16px !important;
  }
}

/* Improved select dropdown */
.form-select option {
  background: #FEFAE0;
  color: #626F47;
  padding: 0.5rem;
}

.form-select option:disabled {
  color: rgba(98, 111, 71, 0.5);
  background: rgba(164, 180, 101, 0.1);
}

/* Success animations */
@keyframes success-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.success-animation {
  animation: success-bounce 0.6s ease;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced focus states */
.form-input:focus,
.form-select:focus,
.btn-primary:focus {
  outline: 2px solid rgba(164, 180, 101, 0.5);
  outline-offset: 2px;
}

/* Improved disabled states */
.form-select option:disabled,
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Better text selection */
::selection {
  background: rgba(164, 180, 101, 0.3);
  color: #626F47;
}

::-moz-selection {
  background: rgba(164, 180, 101, 0.3);
  color: #626F47;
}

/* Hero section specific styling */
.hero-title {
  line-height: 1.1;
  padding: 1rem 0;
  margin: 0;
  overflow: visible;
}

/* Ensure proper spacing for main content */
.main-content {
  min-height: calc(100vh - 80px);
  padding-top: clamp(120px, 15vh, 180px);
}

/* Desktop hero spacing */
@media (min-width: 1024px) {
  .main-content {
    padding-top: clamp(140px, 18vh, 200px);
  }
  
  .hero-title {
    font-size: clamp(3rem, 6vw, 4rem);
    padding: 1.5rem 0;
  }
}

/* Tablet hero spacing */
@media (min-width: 768px) and (max-width: 1023px) {
  .main-content {
    padding-top: clamp(130px, 16vh, 170px);
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    padding: 1.25rem 0;
  }
}
</style>
