document.getElementById("randomForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const lowerBound = parseFloat(document.getElementById("lowerBound").value);
    const upperBound = parseFloat(document.getElementById("upperBound").value);
    const numDecimals = parseInt(document.getElementById("numDecimals").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const comment = document.getElementById("comment").value;

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
                quantity: quantity,
                comment: comment
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            document.getElementById("result").textContent = 
                `Números Aleatorios Generados:\n${result.numbers.join(", ")}\n\nArchivo Excel: ${result.file}`;
        } else {
            document.getElementById("result").textContent = 
                `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
});
