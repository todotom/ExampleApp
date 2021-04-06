from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS

import os

import json
import mariadb

database_config = {
    'host': 'database',
    'port': 3306,
    'user': 'root',
    'password': os.environ['DB_PASSWORD'],
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
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']

@api.route('/items', methods=['GET'])
def handle_items_get():
    if request.method == "GET":
        #connection = mariadb.connect(**database_config)
        connection = connect_database()
    
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM items")

        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))

        return json.dumps(json_data)

app.register_blueprint(api, url_prefix='/api')

def connect_database():
    return mariadb.connect(**database_config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5050)