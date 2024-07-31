let codeStudent = "";
function loadStudent() {
    let localStorageStudent = localStorage.getItem("studentData");;
    let studentData = JSON.parse(localStorageStudent);
    codeStudent = studentData.code;
    document.getElementById("input-id-student").value = studentData.id;
    document.getElementById("input-name-student").value = studentData.name;
    document.getElementById("input-lastName-student").value = studentData.lastName;
    document.getElementById("input-career-student").value = studentData.career;
    document.getElementById("input-email-student").value = studentData.email;
}
loadStudent();

function updateStudent() {
    let id = document.getElementById("input-id-student").value;
    let name = document.getElementById("input-name-student").value;
    let lastName = document.getElementById("input-lastName-student").value;
    let career = document.getElementById("input-career-student").value;
    let email = document.getElementById("input-email-student").value;
    let studentData = {
        id: id,
        name: name,
        lastName: lastName,
        code: codeStudent,
        career: career,
        email: email,
    };

    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementStudent/updateStudentAttribute';
    fetch(url, {
        method: 'PUT',
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
            alert("Student updated succesfully.");
            window.location.href = "./dashboard.html";
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}