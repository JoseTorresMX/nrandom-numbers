#Inicio del programa
from flask import Flask, request, jsonify, render_template
import random
import pandas as pd
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
    
    numbers = [round(random.uniform(lower_bound, upper_bound), num_decimals) for _ in range(n)]
    
    df = pd.DataFrame({
        'Fecha': [datetime.now().strftime("%Y-%m-%d %H:%M:%S")]*n,
        'Aleatorios': numbers,
        'Comentario': data.get('comment', 'Sin comentario')
    })
    
    file_name = f"random_numbers_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
    df.to_excel(file_name, index=False)
    
    return jsonify({
        'status': 'success',
        'numbers': numbers,
        'file': file_name
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
