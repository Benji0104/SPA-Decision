from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos MySQL
def get_db_connection():
    connection = pymysql.connect(
        host='localhost',
        user='dante',       # Cambia esto por tu usuario de MySQL
        password='jackpot', # Cambia esto por tu contraseña de MySQL
        db='proyecto_sig',   # Cambia esto por el nombre de tu base de datos
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

# Ruta para obtener datos KPI de la empresa
@app.route('/kpi-data/<company>', methods=['GET'])
def get_kpi_data(company):
    try:
        # Establecer conexión a la base de datos
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Consulta de datos KPI según la empresa
            sql = "SELECT * FROM kpi_table WHERE company_name = %s"
            cursor.execute(sql, (company,))
            result = cursor.fetchall()
        
        # Cerrar la conexión
        connection.close()

        # Si no se encuentran datos, retornar un error
        if not result:
            return jsonify({"error": "No se encontraron datos para la empresa especificada."}), 404

        return jsonify(result)
    
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
