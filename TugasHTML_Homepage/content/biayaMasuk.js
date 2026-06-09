// Fungsi untuk membuat dan menampilkan form kalkulator biaya masuk sekolah
function createSchoolFeeForm() {
    // 1. Membuat CSS secara dinamis
    const style = document.createElement('style');
    style.textContent = `
        #js-school-container {
            max-width: 450px;
            margin: 40px auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            border-top: 5px solid #0056b3;
        }
        #js-school-container h2 {
            margin-top: 0;
            color: #0056b3;
            text-align: center;
            font-size: 24px;
        }
        #js-school-container p.info {
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
            background: #f0f8ff;
            padding: 10px;
            border-radius: 5px;
        }
        .js-form-group {
            margin-bottom: 20px;
        }
        .js-form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }
        .js-form-group input[type="number"] {
            width: 100%;
            padding: 12px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        #js-total-display {
            font-size: 20px;
            font-weight: bold;
            color: #28a745;
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 5px;
        }
        #js-submit-btn {
            background-color: #28a745;
            color: white;
            padding: 14px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        #js-submit-btn:hover {
            background-color: #63ffc6;
        }
    `;
    document.head.appendChild(style);

    // 2. Membuat wadah utama (Container)
    const container = document.createElement('div');
    container.id = 'js-school-container';

    // 3. Membuat Judul dan Informasi
    const title = document.createElement('h2');
    title.textContent = 'Kalkulator Biaya Masuk';
    container.appendChild(title);

    const info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = 'Biaya pendaftaran untuk satu siswa adalah <strong>Rp 2.000.000</strong>';
    container.appendChild(info);

    // 4. Membuat Elemen Form
    const form = document.createElement('form');

    // Grup Input Jumlah Siswa
    const group = document.createElement('div');
    group.className = 'js-form-group';
    
    const label = document.createElement('label');
    label.textContent = 'Jumlah Calon Siswa:';
    
    const studentInput = document.createElement('input');
    studentInput.type = 'number';
    studentInput.name = 'jumlahSiswa';
    studentInput.min = '1';
    studentInput.placeholder = 'Masukkan jumlah siswa...';
    studentInput.required = true;

    group.appendChild(label);
    group.appendChild(studentInput);
    form.appendChild(group);

    // Area Tampilan Total Biaya
    const totalDisplay = document.createElement('div');
    totalDisplay.id = 'js-total-display';
    totalDisplay.textContent = 'Total Biaya: Rp 0';
    form.appendChild(totalDisplay);

    // Tombol Kirim / Daftar
    const submitBtn = document.createElement('button');
    submitBtn.id = 'js-submit-btn';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Konfirmasi Pendaftaran';
    form.appendChild(submitBtn);

    // Memasukkan form ke dalam container
    container.appendChild(form);

    // 5. Logika Kalkulasi (Berjalan otomatis saat angka diketik)
    const BIAYA_PER_SISWA = 2000000;

    // Fungsi bantuan untuk mengubah angka menjadi format Rupiah
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

    studentInput.addEventListener('input', function() {
        const jumlah = parseInt(studentInput.value) || 0;
        const total = jumlah * BIAYA_PER_SISWA;
        totalDisplay.textContent = `Total Biaya: ${formatRupiah(total)}`;
    });

    // 6. Logika Saat Form Dikirim (Submit)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah halaman reload

        const jumlah = parseInt(studentInput.value) || 0;
        const total = jumlah * BIAYA_PER_SISWA;

        // Menampilkan pesan sukses kepada pengguna
        alert(`Terima kasih! Pendaftaran untuk ${jumlah} siswa dengan total biaya ${formatRupiah(total)} sedang diproses.`);
        
        // Reset form dan tampilan total
        form.reset();
        totalDisplay.textContent = 'Total Biaya: Rp 0';
    });

    // 7. Memasukkan UI ke dalam body halaman web
    if (document.body) {
        document.body.appendChild(container);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(container);
        });
    }
}

// Menjalankan fungsi untuk menampilkan form
createSchoolFeeForm();