from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS

import json
import mariadb

database_config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'Password123!',
    'database': 'inventory'
}

app = Flask(__name__)
CORS(app)
api = Blueprint('api', __name__)

@api.route('/submit', methods=['POST'])
def handle_submit():
    if request.method == "POST":
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        job = request.form['job']
        print(f'first name : {first_name}')
        print(f'last name : {last_name}')
        print(f'job : {job}')

        # do your processing logic here.

        return jsonify({
            "firstName": first_name,
            "lastName": last_name,
            "job": job
        })
    
@api.route('/items', methods=['POST'])
def handle_item_post():
    if request.method == "POST":
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        job = request.form['job']
        print(f'first name : {first_name}')
        print(f'last name : {last_name}')
        print(f'job : {job}')

@api.route('/items', methods=['GET'])
def handle_items_get():
    if request.method == "GET":
        connection = mariadb.connect(**database_config)
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM items");

        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))

        return json.dumps(json_data)

app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5050)