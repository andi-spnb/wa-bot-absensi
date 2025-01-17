function initCharts() {
    // Grafik Notifikasi Harian
    const dailyCtx = document.getElementById('dailyChart');
    if (dailyCtx) {
      new Chart(dailyCtx, {
        type: 'line',
        data: {
          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
          datasets: [{
            label: 'Notifikasi Berhasil',
            data: [120, 150, 100, 200, 180, 220, 250],
            borderColor: '#22c55e',
            tension: 0.1
          }, {
            label: 'Notifikasi Gagal',
            data: [10, 15, 20, 25, 30, 35, 40],
            borderColor: '#ef4444',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Notifikasi Harian'
            }
          }
        }
      });
    }
  
    // Grafik Distribusi Jenis Notifikasi
    const typesCtx = document.getElementById('typesChart');
    if (typesCtx) {
      new Chart(typesCtx, {
        type: 'doughnut',
        data: {
          labels: ['Absensi', 'Reminder', 'Broadcast'],
          datasets: [{
            data: [300, 150, 100],
            backgroundColor: ['#4f46e5', '#22c55e', '#f59e0b']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Distribusi Jenis Notifikasi'
            }
          }
        }
      });
    }
  }
  
  // Jalankan fungsi inisialisasi grafik saat halaman dimuat
  document.addEventListener('DOMContentLoaded', initCharts);