let balance = Number(localStorage.getItem("balance")) || 1000;

let mode = "";

const balanceText = document.getElementById("balance");

const incomeBtn = document.getElementById("incomeBtn");

const expenseBtn = document.getElementById("expenseBtn");

const modal = document.getElementById("modal");

const cancelBtn = document.getElementById("cancelBtn");

const saveBtn = document.getElementById("saveBtn");

const amountInput = document.getElementById("amountInput");

function tampilkanSaldo() {
  balanceText.innerHTML = `Rp ${balance.toLocaleString("id-ID")}<span class="cents">.00</span>`;
}

tampilkanSaldo();

incomeBtn.addEventListener("click", () => {

  mode = "income";

  modal.style.display = "flex"

})

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  const nominal = Number(amountInput.value);

  if (!nominal || nominal <= 0) return;
  
  if (mode === "income") {
    balance += nominal;
  } 
  else if (mode === "expense") {
    balance -= nominal;
  }

localStorage.setItem("balance", balance);
  
  tampilkanSaldo();
  
  amountInput.value = "";

  modal.style.display = "none";
});

expenseBtn.addEventListener("click", () => {

  mode = "expense";

  modal.style.display = "flex";
  
});

