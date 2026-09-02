document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '6281249575363';

  initMobileNav();
  initShowcaseFilter();
  initDetailModal();

  function initMobileNav() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.textContent = navLinks.classList.contains('active') ? '[ TUTUP ]' : '[ MENU ]';
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileBtn.textContent = '[ MENU ]';
        });
      });
    }
  }

  function initShowcaseFilter() {
    const filterBtns = document.querySelectorAll('.showcase-tabs .tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    const emptyNotice = document.getElementById('showcaseEmptyNotice');

    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-status-filter');
        let visibleCount = 0;

        productCards.forEach(card => {
          const cardStatus = card.getAttribute('data-status');
          if (filterValue === 'all' || cardStatus === filterValue) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (emptyNotice) {
          emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  function initDetailModal() {
    const dialog = document.getElementById('detailModal');
    const detailButtons = document.querySelectorAll('.btn-detail-trigger');
    const detailTitle = document.getElementById('detailModalTitle');
    const detailBody = document.getElementById('detailModalContent');
    const closeBtn = document.getElementById('modalCloseBtn');

    if (!dialog) return;

    const productsData = {
      'sakupos': {
        title: 'SakuPos - Modern Point of Sale System',
        statusText: 'SEDANG DIKEMBANGKAN',
        statusClass: 'status-coming-soon',
        tag: '#POS_SYSTEM',
        overview: 'Aplikasi kasir (Point of Sale) modern dan offline-first untuk transaksi penjualan, pencatatan kas harian, inventaris stok produk, dan laporan laba-rugi usaha secara realtime.',
        features: [
          'Antarmuka kasir responsif untuk perangkat PC, tablet, maupun ponsel.',
          'Dukungan cetak struk kasir melalui printer thermal Bluetooth dan USB.',
          'Manajemen inventaris stok barang dan notifikasi stok menipis.',
          'Pencatatan kas masuk/keluar harian dan pembukuan laba-rugi.',
          'Arsitektur offline-first: tetap dapat bertransaksi saat offline dan sinkronisasi otomatis saat online.'
        ],
        targetUsers: 'UMKM, Toko Retail, Cafe, Restoran, dan Bisnis Jasa.',
        techStack: ['Laravel / Next.js', 'Vanilla Web Engine', 'IndexedDB', 'Thermal Printing Protocol']
      },
      'lembar': {
        title: 'Lembar - Ubah Google Sheets Jadi REST API Instan',
        statusText: 'PUBLISH / LIVE',
        statusClass: 'status-publish',
        tag: '#DEVELOPER_API',
        liveUrl: 'https://lembar.atnan.my.id/',
        overview: 'Platform pengubah spreadsheet Google Sheets menjadi REST API instan siap pakai dalam 30 detik tanpa perlu setup Cloud Console atau Service Account manual yang rumit. Hubungkan formulir web, aplikasi mobile, otomasi workflow no-code, dan data logger IoT langsung ke spreadsheet dengan aman.',
        features: [
          'Auto Create Tab & Header: Buat tab baru dan inisialisasi baris kolom header otomatis via endpoint REST API.',
          'Single Google OAuth Flow: Izin akses spreadsheet terhubung otomatis saat login pertama tanpa file JSON key.',
          'Operasi CRUD Lengkap: GET Read Rows, POST Append Row, POST Create Tab, dan query data format JSON terstandar.',
          'Keamanan & Proteksi: Dilengkapi sanitasi pencegahan Formula Injection dan enkripsi token AES-256-GCM.',
          'Pilihan Paket Fleksibel: Free Tier 1.000 request/bulan dan upgrade PRO 50.000 request/bulan via QRIS instan.'
        ],
        targetUsers: 'Frontend Developer, Web/Mobile App Developer, Pengembang No-Code (FlutterFlow, Glide, Webflow), Praktisi IoT, dan UMKM.',
        techStack: ['Next.js App Router', 'REST API Platform', 'Google Sheets OAuth 2.0', 'AES-256-GCM Encryption', 'TailwindCSS Neo-Brutalist', 'JSON Schema Engine']
      }
    };

    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productKey = btn.getAttribute('data-product-key');
        const data = productsData[productKey];

        if (data) {
          if (detailTitle) detailTitle.textContent = `[ SPESIFIKASI: ${data.title} ]`;
          
          if (detailBody) {
            detailBody.innerHTML = `
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                  <span class="product-status-pill ${data.statusClass}">
                    STATUS: ${data.statusText}
                  </span>
                  <span class="product-tag">${data.tag}</span>
                </div>
                <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.65; margin-bottom: 1.25rem;">
                  ${data.overview}
                </p>
              </div>

              <div style="margin-bottom: 1.5rem; background: var(--bg-secondary); border: 2px solid #000; padding: 1.25rem;">
                <h4 style="font-size: 0.9rem; margin-bottom: 0.75rem; font-family: var(--font-heading); text-transform: uppercase;">
                  FITUR UTAMA:
                </h4>
                <ul style="list-style: none; padding: 0;">
                  ${data.features.map(f => `
                    <li style="display: flex; align-items: flex-start; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.875rem;">
                      <span style="color: var(--accent-red); font-weight: 800; line-height: 1.4;">[+]</span>
                      <span>${f}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.8125rem; margin-bottom: 0.5rem; font-family: var(--font-mono); text-transform: uppercase;">
                  TARGET PENGGUNA:
                </h4>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">
                  ${data.targetUsers}
                </p>

                <h4 style="font-size: 0.8125rem; margin-bottom: 0.5rem; font-family: var(--font-mono); text-transform: uppercase;">
                  ARSITEKTUR & TECH STACK:
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                  ${data.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
              </div>

              <div style="border-top: 2px dashed #000; padding-top: 1.25rem; margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                ${data.liveUrl ? `
                  <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow" style="flex: 1; min-width: 200px; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
                    <span>KUNJUNGI WEBSITE LIVE</span> <span>↗</span>
                  </a>
                ` : ''}
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Atnan,%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(data.title)}*.%20Boleh%20tahu%20informasi%20lebih%20lanjut?" target="_blank" class="btn ${data.liveUrl ? 'btn-secondary' : 'btn-yellow'}" style="flex: 1; min-width: 200px; text-align: center; display: inline-flex; align-items: center; justify-content: center;">
                  HUBUNGI VIA WHATSAPP
                </a>
              </div>
            `;
          }

          dialog.showModal();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => dialog.close());
    }

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) dialog.close();
    });
  }
});
