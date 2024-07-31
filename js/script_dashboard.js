document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.getElementById('button-student').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */
    loadStudents();

});

document.getElementById('button-subject').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */

});

document.getElementById('button-user').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */

});


function loadStudents() {
    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addStudent.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resource/icons/student.png';

    imgAdd.style.width = '80px'; // Ancho de 80 píxeles
    imgAdd.style.height = '80px';


    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Add a new student!';

    /** Se agrega el ícono el botón */
    btnAdd.appendChild(imgAdd);

    /** Se agrega botón y título al cuerpo de la carta */
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);

    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/Student_Web_Project/rest/ManagementStudent/getStudents')
        .then(response => response.json())
        .then((data) => {
            const content = document.getElementById('content');
            data.forEach(student => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                /** Se hace la creación de cada componente */
                /** Creamos la sección de id */
                const id = document.createElement('h2');
                id.className = 'card-title';
                id.textContent = `ID:${student.id}`;

                /** Creamos la sección del nombre */
                const name = document.createElement('p');
                name.className = 'card-text';
                name.textContent = `Name: ${student.name}`;

                /** Creamos la sección de apellido */
                const lastName = document.createElement('p');
                lastName.className = 'card-text';
                lastName.textContent = `Last name: ${student.lastName}`;

                /** Creamos la sección de code */
                const code = document.createElement('p');
                code.className = 'card-text';
                code.textContent = `Code: ${student.code}`;

                /** Sección de la cantidad de páginas del libro */
                const career = document.createElement('p');
                career.className = 'card-text';
                career.textContent = `Career: ${student.career}`;

                /** Sección del año de publicación */
                const email = document.createElement('p');
                email.className = 'card-text';
                email.textContent = `Email: ${student.email}`;


                /* Creación de botones de eliminar */
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn-danger';
                btnEliminar.id = `btn-delete-${student.code}`;
                btnEliminar.textContent = `Delete`;
                btnEliminar.setAttribute('data-code', student.code);

                // Agregar event listener al botón
                btnEliminar.addEventListener('click', function () {
                    const studentCode = this.getAttribute('data-code');
                    deleteStudentByCode(studentCode);
                });

                /* Creación del botón de actualizar */
                const btnActualizar = document.createElement('a');
                btnActualizar.className = 'btn-success margin';
                btnActualizar.id = `btn-delete-${student.code}`;
                btnActualizar.textContent = `Update`;

                // Agregar event listener al botón
                btnActualizar.addEventListener('click', function () {
                    localStorage.setItem("studentData", JSON.stringify(student));
                    window.location.href = "./updatepage.html";
                });

                /** Agregamos los componentes al body */
                cardBody.appendChild(id);
                cardBody.appendChild(name);
                cardBody.appendChild(lastName);
                cardBody.appendChild(code);
                cardBody.appendChild(career);
                cardBody.appendChild(email);

                /* Agregamos el botón eliminar */
                cardBody.appendChild(btnEliminar);

                /* Agregamos el botón eliminar */
                cardBody.appendChild(btnActualizar);

                /** Agregamos el body al card */
                card.appendChild(cardBody);

                /** Agregamos el card al content */
                content.appendChild(card);
            })
        })
        .catch(error => console.error('Error:', error));
}

loadStudents();

function cleanContent() {
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteStudentByCode(code) {
    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementStudent/deleteStudentByCode?code=' + code;
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Student deleted");
            cleanContent();
            loadStudents();
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}