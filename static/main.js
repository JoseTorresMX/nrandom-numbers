document.getElementById("randomForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const lowerBound = parseFloat(document.getElementById("lowerBound").value);
    const upperBound = parseFloat(document.getElementById("upperBound").value);
    const numDecimals = parseInt(document.getElementById("numDecimals").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lower_bound: lowerBound,
                upper_bound: upperBound,
                num_decimals: numDecimals,
                quantity: quantity
            })
        });

        const result = await response.json();

        if (response.ok) {
            const resultList = document.getElementById("resultList");
            resultList.innerHTML = "";  // Limpiar la lista antes de agregar nuevos elementos

            // Crear un elemento de lista por cada número aleatorio
            result.numbers.forEach(number => {
                const listItem = document.createElement("li");
                listItem.textContent = number;
                resultList.appendChild(listItem);
            });
        } else {
            document.getElementById("resultList").textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById("resultList").textContent = `Error: ${error.message}`;
    }
});

// Copiar números generados al portapapeles
document.getElementById("copyButton").addEventListener("click", () => {
    const resultList = document.getElementById("resultList");
    const copyMessage = document.getElementById("copyMessage");

    // Tomar el texto de los números generados y unirlos en una cadena
    const numbersText = Array.from(resultList.children)
        .map(item => item.textContent)
        .join("\n");

    navigator.clipboard.writeText(numbersText)
        .then(() => {
            // Mostrar mensaje de éxito temporalmente
            copyMessage.style.display = "block";
            setTimeout(() => copyMessage.style.display = "none", 2000);
        })
        .catch(error => {
            console.error("Error al copiar al portapapeles:", error);
        });
});
