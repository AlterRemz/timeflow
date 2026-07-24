let balance = Number(localStorage.getItem("balance")) || 1000;

const balanceText = document.getElementById("balance");

const incomeBtn = document.getElementById("incomeBtn");

function tampilkanSaldo() {
  balanceText.innerHTML = `Rp ${balance.toLocaleString("id-ID")}<span class="cents">.00</span>`;
}

tampilkanSaldo();

incomeBtn.addEventListener("click", () => {
  const nominal = Number(prompt("Masukkan nominal income"));

  if (!nominal || nominal <= 0) return;

  balance += nominal;

localStorage.setItem("balance", balance);

  tampilkanSaldo();

})