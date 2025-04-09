from flask import Flask, request, jsonify
from flask_cors import CORS
    
app = Flask(__name__)
CORS(app)
    
class DataSave:
    def __init__(self, value):
        self.value = value
    
    def process_data(self):
        return f"Processed: {self.value}"
    
@app.route('/order-form-save', methods=['POST'])
def process():
    data = request.get_json()
    input_value = data.get('input')
    if input_value is None:
        return jsonify({"error": "Input is required"}), 400
    my_instance = DataSave(input_value)
    result = my_instance.process_data()
    return jsonify({"result": result})
    
if __name__ == '__main__':
     app.run(debug=True)