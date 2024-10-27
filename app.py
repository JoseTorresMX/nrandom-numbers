from flask import Flask, request, jsonify, render_template
import random
from datetime import datetime

app = Flask(__name__)

# Ruta para la interfaz
@app.route('/')
def index():
    return render_template('index.html')

# Generar números aleatorios
@app.route('/generate', methods=['POST'])
def generate_numbers():
    data = request.get_json()
    
    lower_bound = data.get('lower_bound')
    upper_bound = data.get('upper_bound')
    num_decimals = data.get('num_decimals')
    n = data.get('quantity')
    comment = data.get('comment', 'Sin comentario')

    # Generar los números aleatorios
    numbers = [round(random.uniform(lower_bound, upper_bound), num_decimals) for _ in range(n)]
    
    # Devolver la respuesta como JSON
    return jsonify({
        'status': 'success',
        'numbers': numbers,
        'comment': comment,
        'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
