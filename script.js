const defaultExpenseItems = [
  { description: "Bhouse", amount: 5000, type: "expense", id: 1 },
  { description: "Electric", amount: 1200, type: "expense", id: 2 },
  { description: "Water", amount: 300, type: "expense", id: 3 },
  { description: "Wifi", amount: 800, type: "expense", id: 4 },
  { description: "Salary", amount: 30000, type: "income", id: 5 },
  { description: "Bonus", amount: 5000, type: "income", id: 6 },
  { description: "Freelance", amount: 2000, type: "income", id: 7 },
  { description: "Savings", amount: 3000, type: "income", id: 8 }
];

  const currencySelect = document.getElementById("currency-select");

  // Load saved currency or default to PHP
  let selectedCurrency = localStorage.getItem("currency") || "PHP";

  currencySelect.value = selectedCurrency;

  // Format function
  function formatMoney(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency
    }).format(amount);
  }

  // When user changes currency
  currencySelect.addEventListener("change", () => {
    selectedCurrency = currencySelect.value;
    localStorage.setItem("currency", selectedCurrency);

    renderItems();
    updateTotals();
  });

const container = document.getElementById("transaction-list")
const filters = document.querySelectorAll(".filters .filter")
const active_filter = document.querySelector(".filterValue")

if (!localStorage.getItem('money-items')) {
  localStorage.setItem('money-items', JSON.stringify(defaultExpenseItems));
}

let storedItems = JSON.parse(localStorage.getItem('money-items'));

const typeOrder = ["income", "expense",];

const sortedItems = storedItems.sort((a, b) => {
  const indexA = typeOrder.indexOf(a.type);
  const indexB = typeOrder.indexOf(b.type);

  // 1️⃣ Sort by type (income first)
  if (indexA !== indexB) {
    return indexA - indexB;
  }

});

let filterValue = "All";
let newFilterValue = filterValue.toLowerCase()


filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filterValue = filter.textContent;
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");
    renderItems();
  });
});

const renderItems = () => {
  container.innerHTML = '';

  let itemsToRender = sortedItems;

  if (filterValue !== "All") {
    itemsToRender = sortedItems.filter(item =>
      item.type === filterValue.toLowerCase()
    );
  }

  itemsToRender.forEach((item, index) => {
    const checkbox = item.type === "expense"
      ? `<input type="checkbox" ${item.paid ? 'checked' : ''} onchange="toggleComplete(${index})"/>`
      : "";
    const icon = 
      item.type == "income" 
     ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00ff4c"><g id="SVGRepo_bgCa#00ff4c#00ff4cie#00ff4c" st#00ff4coke-width="0"></g><g id="SVGRepo_t#00ff4cace#00ff4cCa#00ff4c#00ff4cie#00ff4c" st#00ff4coke-linecap="#00ff4cound" st#00ff4coke-linejoin="#00ff4cound"></g><g id="SVGRepo_iconCa#00ff4c#00ff4cie#00ff4c"> <path d="M5 15C2.79 15 1 16.79 1 19C1 19.75 1.21 20.46 1.58 21.06C2.27 22.22 3.54 23 5 23C6.46 23 7.73 22.22 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15ZM6.97 18.67L4.84 20.64C4.7 20.77 4.51 20.84 4.33 20.84C4.14 20.84 3.95 20.77 3.8 20.62L2.81 19.63C2.52 19.34 2.52 18.86 2.81 18.57C3.1 18.28 3.58 18.28 3.87 18.57L4.35 19.05L5.95 17.57C6.25 17.29 6.73 17.31 7.01 17.61C7.29 17.91 7.27 18.39 6.97 18.67Z" fill="#00ff4c"></path> <path d="M21.5 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H21.5C21.78 16.5 22 16.28 22 16V13C22 12.72 21.78 12.5 21.5 12.5Z" fill="#00ff4c"></path> <path d="M16.5292 5.40016C16.8292 5.69016 16.5792 6.14016 16.1592 6.14016L7.87923 6.13016C7.39923 6.13016 7.15923 5.55016 7.49923 5.21016L9.24923 3.45016C10.7292 1.98016 13.1192 1.98016 14.5992 3.45016L16.4892 5.36016C16.4992 5.37016 16.5192 5.39016 16.5292 5.40016Z" fill="#00ff4c"></path> <path d="M21.8694 18.66C21.2594 20.72 19.4994 22 17.0994 22H10.5994C10.2094 22 9.95938 21.57 10.1194 21.21C10.4194 20.51 10.6094 19.72 10.6094 19C10.6094 15.97 8.13938 13.5 5.10938 13.5C4.34938 13.5 3.60938 13.66 2.92938 13.96C2.55938 14.12 2.10938 13.87 2.10938 13.47V12C2.10938 9.28 3.74938 7.38 6.29938 7.06C6.54938 7.02 6.81937 7 7.09937 7H17.0994C17.3594 7 17.6094 7.01 17.8494 7.05C19.8694 7.28 21.3294 8.51 21.8694 10.34C21.9694 10.67 21.7294 11 21.3894 11H19.0994C16.9294 11 15.2094 12.98 15.6794 15.23C16.0094 16.87 17.5294 18 19.1994 18H21.3894C21.7394 18 21.9694 18.34 21.8694 18.66Z" fill="#00ff4c"></path> </g></svg>`
        : item.type == "expense"
          ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9392 2.21178L9.52922 7.82178H7.11922C6.71922 7.82178 6.32922 7.85178 5.94922 7.93178L6.94922 5.53178L6.98922 5.44178L7.04922 5.28178C7.07922 5.21178 7.09922 5.15178 7.12922 5.10178C8.28922 2.41178 9.58922 1.57178 11.9392 2.21178Z" fill="#dc2626"></path> <path d="M18.7311 8.08953L18.7111 8.07953C18.1111 7.90953 17.5011 7.81953 16.8811 7.81953H10.6211L12.8711 2.58953L12.9011 2.51953C13.0411 2.56953 13.1911 2.63953 13.3411 2.68953L15.5511 3.61953C16.7811 4.12953 17.6411 4.65953 18.1711 5.29953C18.2611 5.41953 18.3411 5.52953 18.4211 5.65953C18.5111 5.79953 18.5811 5.93953 18.6211 6.08953C18.6611 6.17953 18.6911 6.25953 18.7111 6.34953C18.8611 6.85953 18.8711 7.43953 18.7311 8.08953Z" fill="#dc2626"></path> <path d="M12.5195 17.6581H12.7695C13.0695 17.6581 13.3195 17.3881 13.3195 17.0581C13.3195 16.6381 13.1995 16.5781 12.9395 16.4781L12.5195 16.3281V17.6581Z" fill="#dc2626"></path> <path d="M18.2883 9.52031C17.8383 9.39031 17.3683 9.32031 16.8783 9.32031H7.11828C6.43828 9.32031 5.79828 9.45031 5.19828 9.71031C3.45828 10.4603 2.23828 12.1903 2.23828 14.2003V16.1503C2.23828 16.3903 2.25828 16.6203 2.28828 16.8603C2.50828 20.0403 4.20828 21.7403 7.38828 21.9503C7.61828 21.9803 7.84828 22.0003 8.09828 22.0003H15.8983C19.5983 22.0003 21.5483 20.2403 21.7383 16.7403C21.7483 16.5503 21.7583 16.3503 21.7583 16.1503V14.2003C21.7583 11.9903 20.2883 10.1303 18.2883 9.52031ZM13.2783 15.5003C13.7383 15.6603 14.3583 16.0003 14.3583 17.0603C14.3583 17.9703 13.6483 18.7003 12.7683 18.7003H12.5183V18.9203C12.5183 19.2103 12.2883 19.4403 11.9983 19.4403C11.7083 19.4403 11.4783 19.2103 11.4783 18.9203V18.7003H11.3883C10.4283 18.7003 9.63828 17.8903 9.63828 16.8903C9.63828 16.6003 9.86828 16.3703 10.1583 16.3703C10.4483 16.3703 10.6783 16.6003 10.6783 16.8903C10.6783 17.3103 10.9983 17.6603 11.3883 17.6603H11.4783V15.9703L10.7183 15.7003C10.2583 15.5403 9.63828 15.2003 9.63828 14.1403C9.63828 13.2303 10.3483 12.5003 11.2283 12.5003H11.4783V12.2803C11.4783 11.9903 11.7083 11.7603 11.9983 11.7603C12.2883 11.7603 12.5183 11.9903 12.5183 12.2803V12.5003H12.6083C13.5683 12.5003 14.3583 13.3103 14.3583 14.3103C14.3583 14.6003 14.1283 14.8303 13.8383 14.8303C13.5483 14.8303 13.3183 14.6003 13.3183 14.3103C13.3183 13.8903 12.9983 13.5403 12.6083 13.5403H12.5183V15.2303L13.2783 15.5003Z" fill="#dc2626"></path> <path d="M10.6797 14.1391C10.6797 14.5591 10.7997 14.6191 11.0597 14.7191L11.4797 14.8691V13.5391H11.2297C10.9197 13.5391 10.6797 13.8091 10.6797 14.1391Z" fill="#dc2626"></path> </g></svg>`
            : null 
    container.innerHTML += `
      <div draggable="true" data-index="${index}" class="item ${item.type}">
        <div class="money-inputs ${item.paid ? "paid" : ""}">
          ${icon}
          <input type="text" value="${item.description}" readonly class="item-input"/>
          <input type="number" value="${item.amount}" readonly class="amount-input"/>
        </div>
        <div class="money-item-btn-wrapper">
          ${checkbox}
          <button ${item.paid ? "disabled" : ""}  onclick="editItem(${index}, this)" class="edit-btn">Edit</button>
          <button onclick="deleteItem(${index})" class="delete-btn">Delete</button>
        </div>
      </div>
    `;
  });
};

const addBtn = document.getElementById("add-btn")
const type_button = document.querySelectorAll('.type-btn');

let type = ""

type_button.forEach((item) => {
  item.addEventListener("click", () => {
    type_button.forEach(btn => btn.classList.remove("selected"));
    item.classList.add("selected");
    type = item.textContent.toLowerCase();
  });
});


// if using id instead
// const itemIndex = sortedItems.findIndex(item => item.id === id);
// item.paid = !item.paid;

const toggleComplete = (index) => {
  sortedItems[index].paid = !sortedItems[index].paid;
  localStorage.setItem('money-items', JSON.stringify(sortedItems));

  if (sortedItems[index].paid) {
    const input = document.querySelectorAll('.money-inputs')[index];
    input.classList.add("paid")
  }
  renderItems();
}

addBtn.addEventListener(("click"), () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');

  if (description.value.trim() && Number(amount.value)) {
    sortedItems.push({ description: description.value, amount: Number(amount.value), type: type, id: sortedItems.length + 1 })
    sortItems();
    localStorage.setItem("money-items", JSON.stringify(sortedItems))
    description.value = "";
    amount.value = "";
    type = "";
    type_button.forEach(btn => btn.classList.remove("selected"));
    renderItems()
    updateTotals()
    updateSavingsInput()

  }
})


// if using id instead
// const itemIndex = sortedItems.findIndex(item => item.id === id);
// item.paid = !item.paid;

const deleteItem = (id) => {
  sortedItems.splice(id, 1)
  localStorage.setItem("money-items", JSON.stringify(sortedItems))
  renderItems()
  updateTotals()
    updateSavingsInput()

}


// if using id instead
// const itemIndex = sortedItems.findIndex(item => item.id === id);
// item.paid = !item.paid;

const editItem = (id, button) => {
  const input = document.querySelectorAll('.item-input')[id];
  const inputAmount = document.querySelectorAll('.amount-input')[id];

  if (!input || !inputAmount) return;

  const isEditing = button.textContent === "Done";

  // 🟢 If currently editing → SAVE
  if (isEditing) {
    sortedItems[id].description = input.value.trim();
    sortedItems[id].amount = Number(inputAmount.value) || 0;

    localStorage.setItem('money-items', JSON.stringify(sortedItems));

    input.setAttribute("readonly", true);
    inputAmount.setAttribute("readonly", true);

    input.classList.remove("editing");
    inputAmount.classList.remove("editing");

    button.textContent = "Edit";

    renderItems();
    updateTotals();
    updateSavingsInput()

  } else {
    // 🔵 If not editing → ENABLE edit mode
    input.removeAttribute("readonly");
    inputAmount.removeAttribute("readonly");

    input.classList.add("editing");
    inputAmount.classList.add("editing");

    input.focus();

    button.textContent = "Done";
  }
};

// total balance const totalBalance = incomeSum - expenseSum;
// const balanceSpan = document.getElementById("balance-total");
// balanceSpan.textContent = totalBalance.toFixed(2);


const expenseTotalSpan = document.getElementById("expense-total");
const incomeTotalSpan = document.getElementById("income-total");
const incomeSavingsTotalSpan = document.getElementById("income-savings-total");


// create a function to handle state when updates
const updateTotals = () => {

  const expenseSum = sortedItems
    .filter(item => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const incomeSum = sortedItems
    .filter(item => item.type === "income" &&
      !item.description.toLowerCase().includes("savings"))
    .reduce((acc, item) => acc + item.amount, 0);

  // ✅ Get current month
  const now = new Date();
  const currentMonth = now.getFullYear() + "-" + (now.getMonth() + 1);

  // ✅ Lifetime savings (for display / graph only)
  const lifetimeSavings =
    Number(localStorage.getItem("savingsTotal")) || 0;

  // ✅ This month's savings (for income deduction)
  const monthlySavings =
    Number(localStorage.getItem(`monthlySavings-${currentMonth}`)) || 0;

  const incomeLine = document.querySelector(".income-line");
  const expenseLine = document.querySelector(".expenses-line");
  const savingsLine = document.querySelector(".savings-line");

  // Graph compares lifetime savings
  const largest = Math.max(incomeSum, expenseSum, lifetimeSavings);

  let incomePercent = 0;
  let expensePercent = 0;
  let savingsPercent = 0;

  if (largest > 0) {
    incomePercent = (incomeSum / largest) * 100;
    expensePercent = (expenseSum / largest) * 100;
    savingsPercent = (lifetimeSavings / largest) * 100;
  }

  incomeLine.style.height = incomePercent + "%";
  expenseLine.style.height = expensePercent + "%";
  savingsLine.style.height = savingsPercent + "%";

  // ✅ Subtract ONLY this month's savings
  const incomeMinusSavings = incomeSum - monthlySavings;

  const totalBalance = incomeSum - expenseSum;

  document.getElementById("expense-total").textContent =
    formatMoney(expenseSum);

  document.getElementById("income-total").textContent =
    formatMoney(incomeSum);

  document.getElementById("balance-total").textContent =
    formatMoney(totalBalance);

  document.getElementById("income-savings-total").textContent =
    formatMoney(incomeMinusSavings);

  // ===== Save Monthly Data =====
  const storedMonth = localStorage.getItem("current-month");
  const monthlyData =
    JSON.parse(localStorage.getItem("monthly-data")) || {};

  if (storedMonth && storedMonth !== currentMonth) {
    monthlyData[storedMonth] = {
      income: incomeSum,
      expense: expenseSum,
      savings: monthlySavings
    };

    localStorage.setItem("monthly-data", JSON.stringify(monthlyData));
  }

  localStorage.setItem("current-month", currentMonth);
};

function renderPreviousMonth() {
  const container = document.getElementById("previous-month-summary");
  const monthlyData = JSON.parse(localStorage.getItem("monthly-data")) || {};

  const now = new Date();
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const prevMonthKey =
    prevDate.getFullYear() + "-" + (prevDate.getMonth() + 1);

  const prevData = monthlyData[prevMonthKey];

  if (!prevData) {
    container.innerHTML = "<p>No previous month data.</p>";
    return;
  }

  const monthName = prevDate.toLocaleString("default", { month: "long" });
  const year = prevDate.getFullYear();
  const savings = Number(prevData.savings) || 0;
  console.log(savings)


  container.innerHTML = `
    <div class="month-summary">
      <h3>${monthName} ${year} </h3>
      <p>Income: <span class="green">${formatMoney(prevData.income)}</span></p>
      <p>Expenses: <span class="red">${formatMoney(prevData.expense)}</span></p>
      <p>Savings: <span class="blue">${formatMoney(savings)}</span></p>
    </div>
  `;
}


// renderTotalIncome()
// renderTotalExpenses()
function sortItems() {
  sortedItems.sort((a, b) => {
    const indexA = typeOrder.indexOf(a.type);
    const indexB = typeOrder.indexOf(b.type);

    // Only sort by type
    return indexA - indexB;
  });
}

const savings_btn = document.getElementById("savings-btn");
const clear_btn = document.getElementById("clear-btn");

const savings_input = document.querySelector(".total-savings-input");
const savings_display = document.querySelector(".total-savings");

// Get current month helper
const getCurrentMonth = () => {
  const now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1);
};

// ✅ Initialize default savings (ONLY once)
if (localStorage.getItem("savingsTotal") === null) {
  localStorage.setItem("savingsTotal", 3000);
}

// ✅ Update displayed savings
const updateSavingsDisplay = () => {
  const totalSavings =
    Number(localStorage.getItem("savingsTotal")) || 0;

  savings_display.textContent = formatMoney(totalSavings);
  savings_input.value = totalSavings; // preload value when editing
};

updateSavingsDisplay();


// ==============================
// EDIT / ADD SAVINGS
// ==============================
savings_btn.addEventListener("click", () => {

  const isEditing = savings_btn.textContent === "Done";

  if (isEditing) {

    const newInputTotal = Number(savings_input.value) || 0;

    const currentMonth = getCurrentMonth();

    const currentTotal =
      Number(localStorage.getItem("savingsTotal")) || 0;

    const currentMonthSavings =
      Number(localStorage.getItem(`monthlySavings-${currentMonth}`)) || 0;

    // Calculate difference
    const difference = newInputTotal - currentTotal;

    // Update lifetime total
    localStorage.setItem("savingsTotal", newInputTotal);

    // Update this month's savings (ONLY difference)
    let updatedMonthSavings = currentMonthSavings + difference;

    // Prevent negative monthly savings
    if (updatedMonthSavings < 0) {
      updatedMonthSavings = 0;
    }

    localStorage.setItem(
      `monthlySavings-${currentMonth}`,
      updatedMonthSavings
    );

    savings_input.setAttribute("readonly", true);
    savings_btn.textContent = "Edit/Add Savings";

    updateSavingsDisplay();
    updateTotals();

  } else {
    savings_input.removeAttribute("readonly");
    savings_input.focus();
    savings_btn.textContent = "Done";
  }

});


// ==============================
// CLEAR SAVINGS
// ==============================
clear_btn.addEventListener("click", () => {

  const currentMonth = getCurrentMonth();

  localStorage.setItem("savingsTotal", 0);
  localStorage.setItem(`monthlySavings-${currentMonth}`, 0);

  updateSavingsDisplay();
  updateTotals();
});

renderItems()
sortItems()
updateSavingsDisplay()
getCurrentMonth()
updateTotals()
renderPreviousMonth()


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("SW registration failed:", err));
  });
}

// if using id instead
// const itemIndex = sortedItems.findIndex(item => item.id === id);
// item.paid = !item.paid;