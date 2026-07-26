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

tampilkanSaldo();

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
  const nominal = Number(amountInput.value);

  const category = categoryInput.value;

  const account = accountInput.value;

  const transaction = {
    type: mode,
    amount: nominal,
    category: category,
    account: account
  };

transactions.push(transaction);

  localStorage.setItem(
    "transaction",
    JSON.stringify(transactions)
  );

  console.log(transactions);

  if (!nominal || nominal <= 0) return;
  
  if (mode === "income") {
    balance += nominal;
  } 
  else if (mode === "expense") {
    balance -= nominal;
  }

localStorage.setItem("balance", balance);

  const item = document.createElement("div");

  item.textContent = `${mode} - Rp ${nominal.toLocaleString("id-ID")}`;

  historyList.appendChild(item);
  
  tampilkanSaldo();
  
  amountInput.value = "";

  categoryInput.value = "";

  modal.style.display = "none";

});