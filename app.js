const customer = {
    fullName: 'James Carlo Vincent Roa',
    customerCode: 'CUST-1001',
    balance: 500,
    contactNumber: '09957734707',
    transactions: [
        { id: '1001', type: 'DEPOSIT', amount: 500, date: 'September 21, 2026' }
    ]
};

function formatMoney(amount) { return `PHP ${Number(amount).toFixed(2)}`; }
function renderCustomer() {
    document.querySelectorAll('.customer-name').forEach(element => { element.textContent = customer.fullName; });
    document.querySelectorAll('.customer-code').forEach(element => { element.textContent = customer.customerCode; });
    document.querySelector('.contact-number').textContent = customer.contactNumber;
    document.querySelector('.balance').textContent = Number(customer.balance).toFixed(2);
    renderTransactions(document.querySelector('.recent-list'), 5);
    renderTransactions(document.querySelector('.all-list'));
}
function renderTransactions(container, limit) {
    if (!container) return;
    const transactions = customer.transactions.slice(0, limit);
    container.innerHTML = transactions.length ? transactions.map(transaction => `<div class="transaction-row ${transaction.type === 'DEPOSIT' ? 'deposit' : ''}"><span><strong>${transaction.type === 'DEPOSIT' ? 'Money added' : 'Laundry payment'}</strong><small>#${transaction.id} - ${transaction.date}</small></span><strong>${transaction.type === 'DEPOSIT' ? '+' : '-'}${formatMoney(transaction.amount)}</strong></div>`).join('') : '<p class="muted">No transactions yet.</p>';
}
function route() {
    const viewName = window.location.hash.replace('#', '') || 'dashboard';
    const validView = ['dashboard', 'transactions', 'profile'].includes(viewName) ? viewName : 'dashboard';
    document.querySelectorAll('.content-view').forEach(view => { view.hidden = view.id !== `${validView}-view`; });
    document.querySelectorAll('.nav-tabs a').forEach(link => { link.classList.toggle('active', link.dataset.view === validView); });
}
document.querySelector('#refresh-button').addEventListener('click', () => { renderCustomer(); window.alert(`Balance refreshed: ${formatMoney(customer.balance)}`); });
document.querySelector('#deposit-button').addEventListener('click', () => { window.alert('Online deposits are coming soon. Please wait for the new update.'); });
window.addEventListener('hashchange', route);
renderCustomer();
route();
