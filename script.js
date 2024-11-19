let tot = document.querySelector('#tot');
let btnShow = document.querySelector('#btnShow');

let rubrica = {
    'contacts': [
        {'nome': 'Michele', 'numero': 3331111111},
        {'nome': 'Matteo', 'numero': 3332222222},
        {'nome': 'Luca', 'numero': 3333333333},
        {'nome': 'Davide', 'numero': 3334444444}
    ],
    'totContacts': function() {
        tot.innerHTML = this.contacts.length;
    },
    'showContacts': function() {
        // Reset del corpo della tabella
        tbody.innerHTML = '';

        // creare le righe della tabella con i contatti
        this.contacts.forEach((contact) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td scope="row">${contact.nome}</td>
                <td>${contact.numero}</td>
            `;
            tbody.appendChild(tr);
        })

        this.totContacts();
    },
    'addContact': function(nameContact, numberContact) {
        this.contacts.push({'nome': nameContact, 'numero': numberContact});
    }
}

let table = document.querySelector('.table');
let tbody = document.querySelector('tbody');
let isHidden = false;

rubrica.showContacts();

rubrica.totContacts();

btnShow.addEventListener('click', () => {
    if (!isHidden) {
        table.classList.add('d-none');
        btnShow.innerHTML = `Mostra <i class="bi bi-eye-fill"></i>`;
        isHidden = true;        
    } else {
        table.classList.remove('d-none');
        btnShow.innerHTML = `Nascondi <i class="bi bi-eye-slash-fill"></i>`;  
        isHidden = false;
    }
})

let inputName = document.querySelector('#inputName');
let inputNumber = document.querySelector('#inputNumber');
let btnAdd = document.querySelector('#btnAdd');
let btnDelete = document.querySelector('#btnDelete');

btnAdd.addEventListener('click', () => {
    rubrica.addContact(inputName.value, inputNumber.value);
    console.log(rubrica.contacts);
    rubrica.showContacts();
})

btnDelete.addEventListener('click', () => {
    rubrica.contacts = rubrica.contacts.filter((contact) => contact.nome!== inputName.value);
    rubrica.showContacts();
})

