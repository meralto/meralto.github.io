document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const claims = document.getElementById("claims");
const claimOutput = document.getElementById("claimOutput");
const recoveryValue = document.getElementById("recoveryValue");

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}

function updateROI() {
  const monthlyClaims = Number(claims.value);
  const annualBillings = monthlyClaims * 150 * 12;
  const low = annualBillings * 0.03;
  const high = annualBillings * 0.05;
  claimOutput.textContent = monthlyClaims.toLocaleString("en-US");
  recoveryValue.textContent = `${money(low)}–${money(high)}`;
}
claims.addEventListener("input", updateROI);
updateROI();
