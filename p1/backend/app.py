import sys
sys.path.append('/path/to/flask_cors/directory')
from flask_cors import CORS
from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///historial.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de base de datos para el historial
class Analisis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    texto = db.Column(db.Text, nullable=False)
    polaridad = db.Column(db.Float, nullable=False)
    sentimiento = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)

# Crear la base de datos si no existe
with app.app_context():
    db.create_all()

# Endpoint para analizar el sentimiento
@app.route('/analizar', methods=['POST'])
def analizar_sentimiento():
    data = request.get_json()
    texto = data.get('texto', '')
    blob = TextBlob(texto)
    polaridad = blob.sentiment.polarity

    # Ajuste de umbral para "Neutral"
    if -0.2 < polaridad < 0.2:
        sentimiento = "Neutral 😐"
    elif polaridad > 0:
        sentimiento = "Positivo 😀"
    else:
        sentimiento = "Negativo 😞"

    # Guardar en la base de datos el análisis
    nuevo_analisis = Analisis(
        texto=texto,
        polaridad=polaridad,
        sentimiento=sentimiento
    )
    db.session.add(nuevo_analisis)
    db.session.commit()

    return jsonify({
        'texto': texto,
        'sentimiento': sentimiento,
        'polaridad': polaridad
    })

# Endpoint para mostrar el historial
@app.route('/historial', methods=['GET'])
def obtener_historial():
    analisis = Analisis.query.all()  # Obtiene todos los análisis
    historial = [{
        'id': a.id,
        'texto': a.texto,
        'sentimiento': a.sentimiento,
        'polaridad': a.polaridad,
        'fecha': a.fecha.strftime('%Y-%m-%d %H:%M:%S')
    } for a in analisis]
    return jsonify(historial)

if __name__ == '__main__':
    app.run(debug=True, port=8000)