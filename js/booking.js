let peluqueroSeleccionado = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;

function seleccionarPeluquero(element, id) {
    document.querySelectorAll('.peluquero').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    peluqueroSeleccionado = id;
    document.getElementById('peluquero-seleccionado').innerText = `Peluquero ${id} seleccionado`;
}

function cargarHoras() {
    fechaSeleccionada = document.getElementById('fecha').value;
    document.getElementById('fecha-seleccionada').innerText = fechaSeleccionada ? `Fecha: ${fechaSeleccionada}` : "Selecciona una fecha";

    const horas = ["10:00", "11:00", "12:00", "14:00", "15:00"];
    const contenedorHoras = document.getElementById("horas");
    contenedorHoras.innerHTML = "";

    horas.forEach(hora => {
        let div = document.createElement("div");
        div.className = "hour";
        div.innerText = hora;
        div.onclick = function () {
            document.querySelectorAll('.hour').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            horaSeleccionada = hora;
        };
        contenedorHoras.appendChild(div);
    });
}

function confirmarReserva() {
    if (!peluqueroSeleccionado || !fechaSeleccionada || !horaSeleccionada) {
        alert("Por favor, selecciona un peluquero, una fecha y una hora.");
        return;
    }
    alert(`Reserva confirmada para Peluquero ${peluqueroSeleccionado} el ${fechaSeleccionada} a las ${horaSeleccionada}.`);
}