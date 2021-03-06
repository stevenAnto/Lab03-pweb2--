document.addEventListener("DOMContentLoaded", () => {
  showHome();
});

function showHome() {
  const notes = document.querySelector("#notes");
  notes.innerHTML = `
    <h2>Presentation</h2>
    <p>Este sistema fue desarrollado por alumnos del primer año de la Escuela Profesional de Ingeniería de Sistemas, de la Universidad Nacional de San Agustín de Arequipa</p>
    <p>El sistema fué desarrollado usando estas tecnologías:</p>
    <ul class="skills">
      <li class="skills_skill">HTML y CSS</li>
      <li class="skills_skill">NodeJS para el backend</li>
      <li class="skills_skill">Javascript para el frontend</li>
      <li class="skills_skill">Las páginas se escriben en lenguaje Markdown</li>
      <li class="skills_skill">La comunicación entre el cliente y el servidor se hizo usando JSON de manera asíncrona</li>
    </ul>
  `;
}

function showNotes() {
  var notes = document.querySelector("#notes");
  notes.innerHTML = "<h2>List of Notes</h2>";
  mostrarLis();
}

function showCreateView() {
  const notes = document.querySelector("#notes");
  notes.innerHTML = `
    <h2>Create Note</h2>
    <form id="createNoteForm">
      <input type="text" id="title" placeholder="Titulo">
      <textarea id="markdownContent" placeholder="Contenido en Markdown"></textarea>
      <input type="submit" value="Crear">
    </form>
  `;

  document.querySelector("#createNoteForm").onsubmit = function () {
    const titulo = document.querySelector("#title").value;
    const texto = document.querySelector("#markdownContent").value;

    const url = "http://localhost:3000/crear";
    const noteData = {titulo, texto};
    //console.log(noteData)
    const request = {
      method: "POST",
      headers: {
	"Content-Type": "application/json"
      },
      body: JSON.stringify(noteData),
    };

    fetch(url, request)
      .then(response => {return response.text()})
      .then(data =>{alert(data)})
      .catch(error => console.log(error));

    return false;
  }
}
function mostrarLis() {
  console.log("entro");
  const url = 'http://localhost:3000/enlistar';
  fetch(url).then(
    response => response.json()
  ).then(
    data => {
      document.querySelector("#notes").innerHTML= data.text;
      var txt= document.querySelector("#notes").innerHTML;
      console.log(txt);
      txt= "<h2>List of Notes</h2><br><ol><li>" +txt.replace(/,/g, "</li><li>") + "</li></ol>";
      console.log(txt);
      document.querySelector("#notes").innerHTML= txt;
    }
  )
  
  //document.querySelector("#notes").innerHTML
}
