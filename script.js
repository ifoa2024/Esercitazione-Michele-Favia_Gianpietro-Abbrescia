let tot = document.querySelector('#tot');
let btnShow = document.querySelector('#btnShow');
let table = document.querySelector('.table');
let tbody = document.querySelector('tbody');
let inputName = document.querySelector('#inputName');
let inputNumber = document.querySelector('#inputNumber');
let inputDelete = document.querySelector('#inputDelete');
let btnAdd = document.querySelector('#btnAdd');
let btnDelete = document.querySelector('#btnDelete');
let isHidden = false;

// Modal e Toast
let modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
let formEdit = document.getElementById('formEdit');
let editName = document.getElementById('editName');
let editNumber = document.getElementById('editNumber');
let contattoSelezionato = null;

let rubrica = {
    'contacts': [
        { 'nome': 'Michele', 'numero': 3331111111 },
        { 'nome': 'Matteo', 'numero': 3332222222 },
        { 'nome': 'Luca', 'numero': 3333333333 },
        { 'nome': 'Davide', 'numero': 3334444444 }
    ],
    'totContacts': function () {
        tot.innerHTML = this.contacts.length;
    },
    'showContacts': function () {
        tbody.innerHTML = '';
        this.contacts.forEach(contact => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${contact.nome}</td>
                <td>${contact.numero}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="apriModifica('${contact.nome}')">Modifica</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        this.totContacts();
    },
    'addContact': function (nameContact, numberContact) {
        this.contacts.push({ 'nome': nameContact, 'numero': numberContact });
    }
};

// Funzioni per il modal
function apriModifica(nome) {
    contattoSelezionato = rubrica.contacts.find(contact => contact.nome === nome);
    if (contattoSelezionato) {
        editName.value = contattoSelezionato.nome;
        editNumber.value = contattoSelezionato.numero;
        modalEdit.show();
    }
}

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contattoSelezionato) {
        contattoSelezionato.nome = editName.value;
        contattoSelezionato.numero = editNumber.value;
        rubrica.showContacts();
        mostraToast('Modifica avvenuta');
        modalEdit.hide();
    }
});

// Funzione Toast
function mostraToast(messaggio) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${messaggio}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.getElementById('toastContainer').appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Eventi
btnAdd.addEventListener('click', () => {
    rubrica.addContact(inputName.value, inputNumber.value);
    rubrica.showContacts();
    mostraToast('Contatto aggiunto');
    inputName.value = '';
    inputNumber.value = '';
});

btnDelete.addEventListener('click', () => {
    const nomeEliminato = inputDelete.value;
    const contactsFiltrati = rubrica.contacts.filter(contact => contact.nome !== nomeEliminato);
    if (contactsFiltrati.length < rubrica.contacts.length) {
        rubrica.contacts = contactsFiltrati;
        rubrica.showContacts();
        mostraToast(`Contatto "${nomeEliminato}" Eliminato`);
    } else {
        mostraToast(`Nessun contatto "${nomeEliminato}"`);
    }
});

btnShow.addEventListener('click', () => {
    isHidden = !isHidden;
    table.classList.toggle('d-none', isHidden);
    btnShow.innerHTML = isHidden
        ? `Mostra <i class="bi bi-eye-fill"></i>`
        : `Nascondi <i class="bi bi-eye-slash-fill"></i>`;
});

// Avvio
rubrica.showContacts();
rubrica.totContacts();



