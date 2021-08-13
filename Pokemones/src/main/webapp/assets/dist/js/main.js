var listar = [];
listar.push({
    "nombre":"Nathaly",
    "apellidoP":"Escalona",
    "apellidoM":"Ruiz",
    "pokemonF":"Pikachu"
});

function findDatas(){
    document.getElementById("body").innerHTML = '';
    let contador = 0;
    for (let pokemon of listar){
        document.getElementById("body").innerHTML +=
        `
            <tr>
           <td>${pokemon.nombre}</td>
           <td>${pokemon.apellidoP}</td>
           <td>${pokemon.apellidoM}</td>
           <td>${pokemon.pokemonF}</td>
           <td>
           <button  type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update" onclick="consultar2('${contador}');"><i class="fas fa-edit"></i> Modificar</button>                
           <button  type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick="consultar('${contador}');"><i class="fas fa-trash"></i> Eliminar</button>
           </td>
           </tr> 
            `
        contador++;
    }
}
findDatas();

function findPokemones(){
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }) .done(function (res){
        let form = document.querySelector('#form');
        form.innerHTML = `<h3>Registro</h3>
            <label>Nombre:</label>
            <input class="form-control" type="text" name="nombre"  id="nombre">
            <br>
            <label>Apellido Paterno:</label>
            <input class="form-control" type="text" name="apellidoP"  id="apellidoPa">
            <br>
            <label>Apellido Materno:</label>
            <input class="form-control" type="text" name="apellidoM"  id="apellidoMa">
            <br>
            <label>Pokemón favorito:</label>
            <select class="form-select" name="type" id="pokemon">
            </select>
            <br>
            `;
        let listPokemones = res.results;
        let result = document.querySelector('#pokemon');
        result.innerHTML = '';
        for (let pokemon of listPokemones){
            result.innerHTML += `<option value="${pokemon.name}">${pokemon.name}</option>`
        }
    })
}

function create(){
    let name = document.getElementById("nombre").value;
    let apellidoP = document.getElementById("apellidoPa").value;
    let apellidoM = document.getElementById("apellidoMa").value;
    let pokemonF = document.getElementById("pokemon").value;
    listar.push({
        "nombre":name,
        "apellidoP": apellidoP,
        "apellidoM":apellidoM,
        "pokemonF":pokemonF
    });
    findDatas();
}

function consultar(id){
    let creacion = listar[id];
    document.getElementById("id").value = id;
    document.getElementById("nombre3").innerHTML = creacion.nombre;
    
}

function deleteUser(){
    listar.splice(document.getElementById("id").value, 1);
    findDatas();
}


function consultar2(id){
    let creacion = listar[id];
    document.getElementById("id1").value = id;
    document.getElementById("nombre1").value = creacion.nombre;
    document.getElementById("apellidoPa1").value = creacion.apellidoP;
    document.getElementById("apellidoMa1").value = creacion.apellidoM;
    document.getElementById("pokemon1").value = creacion.pokemonF;
    findPokemones2();
}


function findPokemones2(){
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }) .done(function (res){
        let listPokemones = res.results;
        let result = document.querySelector('#pokemon1');
        result.innerHTML = '';
        for (let pokemon of listPokemones){
            result.innerHTML += `<option value="${pokemon.name}">${pokemon.name}</option>`
        }
    })
}

function modifyUser(){
    let id = document.getElementById("id1").value;
    let nombre = document.getElementById("nombre1").value;
    let apellidoP = document.getElementById("apellidoPa1").value ;
    let apellidoM = document.getElementById("apellidoMa1").value ;
    let pokemonF = document.getElementById("pokemon1").value ;
    listar[id] = {
        "nombre": nombre,
        "apellidoP": apellidoP,
        "apellidoM":apellidoM,
        "pokemonF":pokemonF
    };
    findDatas();
}