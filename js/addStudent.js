function addStudent() {
    let id = document.getElementById("input-id-student").value;
    let name = document.getElementById("input-name-student").value;
    let lastName = document.getElementById("input-lastName-student").value;
    let code = document.getElementById("input-code-student").value;
    let career = document.getElementById("input-career-student").value;
    let email = document.getElementById("input-email-student").value;
    let studentData = {
        id: id,
        name: name,
        lastName: lastName,
        code: code,
        career: career,
        email: email,
    };

    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementStudent/createStudent';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Student added succesfully.");
            window.location.href = "./dashboard.html";
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}