const button = document.querySelector('button#btn-salvar')
const userListContainer = document.querySelector('.list-group')

const apiUrl = 'https://modalexample2.onrender.com'

// Id que está sendo atualizado
let idAtual = null

button.addEventListener('click', async (batata) => {
  const emailElement = document.querySelector('input#exampleFormControlInput1').value
  const textareaElement = document.querySelector('textarea#exampleFormControlTextarea1').value

  const data = {
    email: emailElement,
    description: textareaElement
  }

  if (idAtual) {
    await updateUser(idAtual, data)
    idAtual = null
  } else {
    await createUser(data)
  }
  
  location.reload(true)
})

async function createUser(user) {
  await fetch(apiUrl + '/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      // do tipo de dado que estou enviando
      'Content-Type': 'application/json',
      // qual é o tipo de resposta que quero receber
      'Accept': 'application/json'
    }
  })
}

async function updateUser(id, user) {
  await fetch(apiUrl + '/users/' + id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      // do tipo de dado que estou enviando
      'Content-Type': 'application/json',
      // qual é o tipo de resposta que quero receber
      'Accept': 'application/json'
    }
  })
}

async function getAllUsers() {
  const response = await fetch(apiUrl + '/users');
  const users = await response.json();

  imprimirUsuarios(users)
}

async function getUserById(id) {
  const response = await fetch(apiUrl + '/users/' + id);
  return response.json();
}

async function deleteUser(id) {
  await fetch(apiUrl + '/users/' + id, {
    method: 'DELETE',
  })  
  location.reload(true)
}

// chamado sempre que clicar no botao "editar"
async function handleUpdateUser(id) {
  const usuarioAtual = await getUserById(id)

  const emailElement = document.querySelector('input#exampleFormControlInput1')
  const textareaElement = document.querySelector('textarea#exampleFormControlTextarea1')

  emailElement.value = usuarioAtual.email
  textareaElement.value = usuarioAtual.description

  // Atribuindo o id para ser atualizado no evento de click do botao
  idAtual = id
} 

function imprimirUsuarios(usuarios) {
  usuarios.forEach((usuario) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between">
        ${usuario.email} - ${usuario.description}
        <div>
          <button class="btn btn-danger" onclick="deleteUser(${usuario.id})">excluir</button>
          <button class="btn btn-warning" onclick="handleUpdateUser(${usuario.id})">editar</button>
        </div>
      </li>
    `

    userListContainer.innerHTML += html
  })
}

window.addEventListener('DOMContentLoaded', async () => {
  await getAllUsers()
})
