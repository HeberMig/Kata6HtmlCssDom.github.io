document.addEventListener('DOMContentLoaded', function() {
    try {
        const productos = [
            { nombre: 'Aqua', precio: 200 },
            { nombre: 'Emoción', precio: 180 },
            { nombre: 'Alegría', precio: 160 },
            { nombre: 'Frescura', precio: 150 }
        ];

        const vendedores = {
            Juana: { nombre: 'Juana', ventas: { Aqua: 0, Emoción: 0, Alegría: 0, Frescura: 0 }, comision: 4 },
            Pedro: { nombre: 'Pedro', ventas: { Aqua: 0, Emoción: 0, Alegría: 0, Frescura: 0 }, comision: 4 }
        };

        function registrarVenta() {
            const nombreVendedor = document.getElementById('nombre').value;
            const cantidadAqua = parseInt(document.getElementById('aqua').value) || 0;
            const cantidadEmocion = parseInt(document.getElementById('emocion').value) || 0;
            const cantidadAlegria = parseInt(document.getElementById('alegria').value) || 0;
            const cantidadFrescura = parseInt(document.getElementById('frescura').value) || 0;

            if (isNaN(cantidadAqua) || isNaN(cantidadEmocion) || isNaN(cantidadAlegria) || isNaN(cantidadFrescura)) {
                alert('Por favor, ingrese un valor numérico para las cantidades.');
                return;
            }

            if (vendedores[nombreVendedor]) {
                vendedores[nombreVendedor].ventas.Aqua += cantidadAqua;
                vendedores[nombreVendedor].ventas.Emoción += cantidadEmocion;
                vendedores[nombreVendedor].ventas.Alegría += cantidadAlegria;
                vendedores[nombreVendedor].ventas.Frescura += cantidadFrescura;

                alert('Venta registrada con éxito.');
            } else {
                alert('Vendedor no válido.');
            }
        }

        function calcularVentasTotales(vendedor) {
            return Object.values(vendedor.ventas).reduce((total, cantidad, index) => total + cantidad * productos[index].precio, 0);
        }

        function calcularComision(ventasTotales, porcentajeComision) {
            return ventasTotales * (porcentajeComision / 100);
        }

        function mostrarResultados() {
            const resultadosContainer = document.getElementById('resultados');
            resultadosContainer.innerHTML = '';

            let hayVentas = false;

            for (const vendedor in vendedores) {
                for (const producto in vendedores[vendedor].ventas) {
                    if (vendedores[vendedor].ventas[producto] > 0) {
                        hayVentas = true;
                        break;
                    }
                }
            }

            if (!hayVentas) {
                resultadosContainer.innerHTML = `<p>No hay ventas registradas. Por favor, registre ventas antes de calcular al Empleado del Mes.</p>`;
                return;
            }

            let maxVentas = 0;
            let empleadoDelMes = '';

            for (const vendedor in vendedores) {
                resultadosContainer.innerHTML += `<p>${vendedor}: </p>`;
                let totalVentas = 0;

                for (const producto in vendedores[vendedor].ventas) {
                    const cantidad = vendedores[vendedor].ventas[producto];
                    resultadosContainer.innerHTML += `<p>${producto}: ${cantidad}</p>`;
                    totalVentas += cantidad * getProductPrecio(producto);
                }

                resultadosContainer.innerHTML += `<p>Total Ventas: ${totalVentas} USD</p>`;

                if (totalVentas > maxVentas) {
                    maxVentas = totalVentas;
                    empleadoDelMes = vendedor;
                } else if (totalVentas === maxVentas) {
                    empleadoDelMes = 'Empate';
                }

                resultadosContainer.innerHTML += `<hr>`;
            }

            if (empleadoDelMes) {
                const comision = calcularComision(maxVentas, vendedores[empleadoDelMes].comision);
                resultadosContainer.innerHTML += `<p>${empleadoDelMes} es el Empleado del Mes con una comisión de ${comision} USD, Felicidades</p>`;
            } else {
                resultadosContainer.innerHTML += `<p>No hay empleado del mes</p>`;
            }
        }

        function getProductPrecio(productoNombre) {
            const producto = productos.find(p => p.nombre === productoNombre);
            return producto ? producto.precio : 0;
        }

        document.getElementById('registrarVentaBtn').addEventListener('click', registrarVenta);
        document.getElementById('calcularEmpleadoBtn').addEventListener('click', mostrarResultados);
    } catch (error) {
        console.error('Error during DOMContentLoaded:', error);
    }
});
