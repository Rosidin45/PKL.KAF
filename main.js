 import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyA4efARScuzhAEPHFXlLo6Hz-VR8cXc0pU",
  authDomain: "insan-cemerlang-ada6b.firebaseapp.com",
  projectId: "insan-cemerlang-ada6b",
  storageBucket: "insan-cemerlang-ada6b.firebasestorage.app",
  messagingSenderId: "1087270227153",
  appId: "1:1087270227153:web:ae10658d015d84c6b609f0",
  measurementId: "G-8T590J6KS7"
};

// inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// --- Fungsi untuk Inventaris (Barang) ---

export async function ambilDaftarInventory() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("tanggal_masuk", "desc"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      no: dokumen.data().no, // Nomor Kolom
      tanggal_masuk: dokumen.data().tanggal_masuk, // Tanggal Masuk
      item: dokumen.data().item, // Nama Barang
      jumlah: dokumen.data().jumlah, // Stok Barang
      keterangan: dokumen.data().keterangan // Keterangan
    })
  })
  
  return hasilKueri;
}

export async function tambahInventory(no, tanggal_masuk, item, jumlah, keterangan) {
  try {
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      no: no,
      tanggal_masuk: tanggal_masuk, 
      item: item, 
      jumlah: jumlah,
      keterangan: keterangan
    })
    console.log('berhasil menyimpan data inventory')
  } catch (error) {
    console.log('gagal menyimpan data inventory', error)
  }
}

export async function hapusInventory(id) {
  await deleteDoc(doc(basisdata, "inventory", id))
}

export async function ubahInventory(id, no_baru, tanggal_baru, item_baru, jumlah_baru, keterangan_baru) {
  await updateDoc(
    doc(basisdata, "inventory", id),
    { 
      no: no_baru,
      tanggal_masuk: tanggal_baru,
      item: item_baru, 
      jumlah: jumlah_baru,
      keterangan: keterangan_baru
    }
  )
}

export async function ambilInventory(id) {
  const refDokumen = await doc(basisdata, "inventory", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}


// --- Fungsi untuk Pemasukan (Transaksi) ---

export async function ambilDaftarPemasukan() {
  const refDokumen = collection(basisdata, "pemasukan");
  const kueri = query(refDokumen, orderBy("tanggal_transaksi", "desc"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      tanggal_transaksi: dokumen.data().tanggal_transaksi,
      nama_barang: dokumen.data().nama_barang,
      jumlah_masuk: dokumen.data().jumlah_masuk,
      keterangan: dokumen.data().keterangan
    })
  })
  
  return hasilKueri;
}

export async function tambahPemasukan(tanggal_transaksi, nama_barang, jumlah_masuk, keterangan) {
  try {
    await addDoc(collection(basisdata, "pemasukan"), {
      tanggal_transaksi: tanggal_transaksi, 
      nama_barang: nama_barang, 
      jumlah_masuk: jumlah_masuk,
      keterangan: keterangan
    })
    console.log('berhasil menyimpan data pemasukan')
  } catch (error) {
    console.log('gagal menyimpan data pemasukan', error)
  }
}

export async function hapusPemasukan(id) {
  await deleteDoc(doc(basisdata, "pemasukan", id))
}

export async function ubahPemasukan(id, tanggal_baru, nama_barang_baru, jumlah_masuk_baru, keterangan_baru) {
  await updateDoc(
    doc(basisdata, "pemasukan", id),
    { 
      tanggal_transaksi: tanggal_baru, 
      nama_barang: nama_barang_baru, 
      jumlah_masuk: jumlah_masuk_baru,
      keterangan: keterangan_baru
    }
  )
}

export async function ambilPemasukan(id) {
  const refDokumen = await doc(basisdata, "pemasukan", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}

  
