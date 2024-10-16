from flask import Flask, jsonify
from flask_cors import CORS
import pymsql

app = Flask(__name__)
CORS(app)

@app.route('/kpi-data/<compay>', methods=['GET'])
def get_kpi_data(company):
    return jsonify(kpi_data)