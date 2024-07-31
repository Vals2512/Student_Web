function addUsers() {
    let username = document.getElementById("input-username").value;
    let password = document.getElementById("input-password").value;
    let userData = {

        nameUser: username,
        password: password,

    };

    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementUser/createUser';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("User added succesfully.");
            window.location.href = "./dashboard.html";
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}