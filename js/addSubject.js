function addSubjects() {
    let codeSubject = document.getElementById("input-code-subject").value;
    let name = document.getElementById("input-name-subject").value;
    let numberCredits = document.getElementById("input-numbercredits").value;
    let codeStudent = document.getElementById("input-code-student").value;

    let subjectData = {
        codeSubject: codeSubject,
        name: name,
        numberCredits: numberCredits,
        codeStudent: codeStudent,
    };

    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementSubject/createSubject';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subjectData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Subject added succesfully.");
            window.location.href = "./dashboard.html";
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}