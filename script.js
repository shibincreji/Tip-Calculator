// DOM
const tipBtns = document.querySelectorAll(".tip-btn");
const tipInput = document.querySelector("#tip");
const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const tipAmount = document.querySelector(".tip .amount");
const totalAmount = document.querySelector(".total .amount");
const resetBtn = document.querySelector(".reset-btn");

let values = {
    tip: 0,
    bill: 0,
    people: 1,
};

// Utility functions

const calculate = () => {
    if (values.bill) {
        const tip = (values.tip * values.bill) / 100;
        const total = tip + values.bill;
        tipAmount.textContent = `$${(tip / (values.people || 1)).toFixed(2)}`;
        totalAmount.textContent = `$${(total / (values.people || 1)).toFixed(2)}`;
    } else {
        tipAmount.textContent = `$0.00`;
        totalAmount.textContent = `$0.00`;
    }
};

const setError = (data, flag) => {
    if (flag) {
        document.querySelector(`label[for='${data}'] span`).classList.add("error");
        document.querySelector(`#${data}`).classList.add("error");
    } else {
        document.querySelector(`label[for='${data}'] span`).classList.remove("error");
        document.querySelector(`#${data}`).classList.remove("error");
    }
};

const setTipFromBtn = (e) => {
    e.preventDefault();
    document.querySelector(".tip-btn.active")?.classList.remove("active");
    e.target.classList.add("active");
    values.tip = +e.target.textContent.replace("%", "");
    calculate();
};

const setFromInput = (e, data) => {
    if (e.target.value === "0") {
        setError(data, true);
        return;
    }
    setError(data, false);
    if (data === "tip")
        document.querySelector(".tip-btn.active")?.classList.remove("active");
    values[data] = +e.target.value;
    calculate();
};

const reset = () => {
    tipInput.value = "";
    billInput.value = "";
    peopleInput.value = "";
    values = {
        tip: 0,
        bill: 0,
        people: 1,
    };
    document.querySelector(".tip-btn.active")?.classList.remove("active");
    setError("tip", false);
    setError("bill", false);
    setError("people", false);
    calculate();
};

// Event listeners

tipBtns.forEach((tipBtn) => tipBtn.addEventListener("click", setTipFromBtn));
resetBtn.addEventListener("click", reset);
tipInput.addEventListener("input", (e) => setFromInput(e, "tip"));
billInput.addEventListener("input", (e) => setFromInput(e, "bill"));
peopleInput.addEventListener("input", (e) => setFromInput(e, "people"));
