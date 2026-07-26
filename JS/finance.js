let balance = Number(localStorage.getItem("balance")) || 1000;

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let mode = "";

const balanceText = document.getElementById("balance");

const incomeBtn = document.getElementById("incomeBtn");

const expenseBtn = document.getElementById("expenseBtn");

const modal = document.getElementById("modal");

const cancelBtn = document.getElementById("cancelBtn");

const saveBtn = document.getElementById("saveBtn");

const amountInput = document.getElementById("amountInput");

const categoryInput = document.getElementById("categoryInput");

const accountInput = document.getElementById("accountInput");

const historyList = document.getElementById("historyList");

function tampilkanSaldo() {
  balanceText.innerHTML = `Rp ${balance.toLocaleString("id-ID")}<span class="cents">.00</span>`;
}

function renderHistory() {
  historyList.innerHTML = "";

  const recentTransactions = transactions.slice(-3).reverse();
  
  recentTransactions.forEach(function(trx) {
    
    const item = document.createElement("div");
    item.classList.add("history-item"); 

    item.innerHTML = `
      <div style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
        <p style="text-transform: capitalize; font-weight: bold; color: #fff;">${trx.type}</p>
        <p style="color: #8e8e93;">${trx.category}</p>
        <p style="color: #8e8e93;">${trx.account}</p>
        <p style="color: #fff;">Rp ${trx.amount.toLocaleString("id-ID")}</p>
        <p style="color: #8e8e93; font-size: 12px;">${trx.date}</p>
      </div>
    `;

    historyList.appendChild(item);
  });
}
renderHistory();

function tampilkanHistory() {

  historyList.innerHTML = "";

transactions.forEach((transaction) => {

  const card = document.createElement("div");

  card.innerHTML = `<strong>${transaction.category}</strong><br>Rp ${transaction.amount.toLocaleString("id-ID")}`;

  historyList.appendChild(card);

  });

}

tampilkanSaldo();

tampilkanHistory();

incomeBtn.addEventListener("click", () => {

  mode = "income";

  modal.style.display = "flex"

});

expenseBtn.addEventListener("click", () => {

  mode = "expense";

  modal.style.display = "flex";
  
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  // 1. Ambil nilai dari form input
  const nominal = Number(amountInput.value);
  const category = categoryInput.value;
  const account = accountInput.value;

  // 2. Validasi: Cegah simpan jika nominal kosong/minus
  // (Posisinya dipindah ke atas agar lebih aman)
  if (!nominal || nominal <= 0) {
    alert("Masukkan nominal yang valid!");
    return;
  }

  // 3. Buat data tanggal hari ini
  const today = new Date();
  const dateString = today.toLocaleDateString("id-ID"); 

  // 4. Susun objek transaksi lengkap dengan tanggal
  const transaction = {
    type: mode,
    amount: nominal,
    category: category,
    account: account,
    date: dateString
  };

  // 5. Masukkan data baru ke dalam array
  transactions.push(transaction);

  // 6. Simpan ke localStorage dengan nama "transactions" yang benar
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // 7. Hitung kalkulasi saldo (balance)
  if (mode === "income") {
    balance += nominal;
  } else if (mode === "expense") {
    balance -= nominal;
  }

  // 8. Simpan saldo terbaru
  localStorage.setItem("balance", balance);

  // 9. Perbarui tampilan
  tampilkanSaldo();
  renderHistory(); // Fungsi yang baru kita buat untuk mencetak HTML

  // 10. Bersihkan form dan tutup modal
  amountInput.value = "";
  categoryInput.value = "";
  accountInput.value = "";
  modal.style.display = "none";
});