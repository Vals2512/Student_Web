let codeSubject = "";
function loadSubject() {
    let localStorageSubject = localStorage.getItem("subjectData");;
    let subjectData = JSON.parse(localStorageSubject);
    codeSubject = subjectData.codeSubject;

    document.getElementById("input-name-subject").value = subjectData.name;
    document.getElementById("input-number-credits").value = subjectData.numbercredits;

}
loadSubject();

function updateSubjects() {

    let name = document.getElementById("input-name-subject").value;
    let creditNumber = document.getElementById("input-number-credits").value;

    let subjectData = {
        codeSubject: codeSubject,
        name: name,
        numbercredits: creditNumber,

    };

    let url = 'http://localhost:8080/Student_Web_Project/rest/ManagementSubject/updateSubjectAttribute';
    fetch(url, {
        method: 'PUT',
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
            alert("Subject updated succesfully.");
            window.location.href = "./dashboard.html";
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
}