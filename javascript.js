//array y variables para los inputs
var arrayMaterias = [];
var inputTarea = $('#inputTarea');
var selectMateria = $('#selectMateria');

//listasHTML de cada materia
var uxHTML = $('#ux');
var programacionHTML = $('#programacion');
var vjHTML = $('#vj');
var musicaHTML = $('#musica');
var animacionHTML = $('#animacion');
var afterHTML = $('#after');

//lee los datos de los inputs y crea los <li>
function agregar(){
    var tarea = inputTarea.val();
    var materia = selectMateria.val();

    //comprueba si la tarea ya existe en el array
    var tareaExistente = arrayMaterias.find(function(elemento) {
        return elemento.tarea === tarea && elemento.materia === materia;
    });

    //si no hay nada escrito o la tarea ya existe activa la clase error al 'inputTareaLabel', haciendolo temblar y que se ponga rojo
    if (tarea == '' || tareaExistente){
      $('#inputTareaLabel').addClass('error-label');
    } else {
    //remueve la clase 'error-label' si la tarea es valida
    $('#inputTareaLabel').removeClass('error-label');
    //agrega la tarea al array
    arrayMaterias.push( { tarea: tarea, materia: materia } );
    inputTarea.val('');
    mostrarListas();
    localStorage.setItem('materias',  JSON.stringify(arrayMaterias));
    }
    //hace que cuando clickees el input se le remueva la clase 'error-label' para que el input se resetee a su estado original
    inputTarea.on('click', function () {
      inputTarea.val('');
      $('#inputTareaLabel').removeClass('error-label');
    });
}

function mostrarListas(){
    //limpia el contenido de los contenedores
    uxHTML.empty();
    programacionHTML.empty();
    vjHTML.empty();
    musicaHTML.empty();
    animacionHTML.empty();
    afterHTML.empty();

    //asigna la tarea del array a cada listaMateria
    for(var i = 0; i < arrayMaterias.length; i++){

        //crea el <li>
        var liMateria = $('<li></li>')
        .addClass('list-group-item tarea') //Asigna clase al <li>
        .attr('data-index', i) //Asigna atributo unico para la <li> y que pueda detectar cual array estoy clickeando
        .text(arrayMaterias[i].tarea); //Asigna la tarea del array al texto de la <li>

        //asigna el <li> a cada materia. Acomoda la tarea a la lista de cada materia correspondiente
        if( arrayMaterias[i].materia === 'ux' ){
            uxHTML.append( liMateria );
        } else if( arrayMaterias[i].materia === 'programacion' ){
            programacionHTML.append( liMateria );
        } else if( arrayMaterias[i].materia === 'vj' ){
            vjHTML.append( liMateria );
        } else if( arrayMaterias[i].materia === 'musica' ){
            musicaHTML.append( liMateria );
        } else if( arrayMaterias[i].materia === 'animacion' ){
            animacionHTML.append( liMateria );
        } else if( arrayMaterias[i].materia === 'after' ){
            afterHTML.append( liMateria );
        }
    }

  //agrega la funcion de click a los elementos <li> para borrar la lista y su contenido
  $('.tarea').on('click', function () {
    //busca el atributo del elemento al que le haces click y borra la tarea de la variable seleccionada
    var index = $(this).attr('data-index');
    borrarTarea(index);

    //pop up exito
    let timerInterval
    Swal.fire({
        icon: 'success',
      title: 'Tarea completada',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

  });
}

function leer(){
    var array = JSON.parse( localStorage.getItem('materias')) ;
    console.log(array);
    if( array ){
        arrayMaterias = array;
    } else {
        //si no hay datos en el localStorage, borra completamente los datos
        //para que cuando refreshee la pag no se guarde la info del localstorage si sacaste informacion
        localStorage.removeItem('materias');
    }
    //elimina la clase 'error-label' del label para cuando se carga la pag
    $('#inputTareaLabel').removeClass('error-label');
    mostrarListas();
}

//borra la info del array y del localstorage y dps actualiza la funcion mostrarlista para que no aparezca nada
function borrarTarea(pos){
    console.log(pos);
    arrayMaterias.splice(pos, 1);
    //para que tambien borre el localstorage dps cuando se aplique la funcion leer
    localStorage.setItem('materias', JSON.stringify(arrayMaterias));
    mostrarListas();
}

//refreshea el array y el localstorage para actualizar la info
leer();