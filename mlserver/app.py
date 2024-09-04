from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io
import tensorflow as tf
from tensorflow.keras.models import load_model
import tensorflow_hub as hub
from flask_cors import CORS
from flask_cors import cross_origin
app = Flask(__name__)
import time
CORS(app)



class_names = []

class_names.append("Battery")
class_names.append("Keyboard")
class_names.append("Microwave")
class_names.append("Mobile")
class_names.append("Mouse")
class_names.append("PCB")
class_names.append("Player")
class_names.append("Printer")
class_names.append("Television")
class_names.append("Washing Machine")
class_names.append("cardboard")
class_names.append("glass")
class_names.append("metal")
class_names.append("paper")
class_names.append("plastic")
class_names.append("trash")


custom_objects = {'KerasLayer': hub.KerasLayer}
loaded_model= load_model('./updated_efficientnet_model.h5', custom_objects=custom_objects)

def detect_objects(image):
   pred = loaded_model.predict(tf.expand_dims(image, axis=0))

  # Get the predicted class
   if len(pred[0]) > 1: # check for multi-class
    pred_class = class_names[pred.argmax()] # if more than one output, take the max
   else:
    pred_class = class_names[int(tf.round(pred)[0][0])] # if only one output, round

   return pred_class


# Create a function to import an image and resize it to be able to be used with our model
def load_and_prep_image(image, img_shape=256, scale=True):
    """
    Reads in an image, turns it into a tensor, and reshapes it to (224, 224, 3).

    Parameters
    ----------
    image (PIL.Image): PIL Image object
    img_shape (int): size to resize target image to, default 256
    scale (bool): whether to scale pixel values to range(0, 1), default True
    """
    # Resize the image
    image = image.resize((img_shape, img_shape))
    
    # Convert PIL image to numpy array
    img_array = np.array(image)
    
    if scale:
        # Rescale the image (get all values between 0 and 1)
        img_array = img_array / 255.0

    return img_array

@app.route('/detect', methods=['POST'])
@cross_origin()
def detect():
   
    image_file = request.files['image']
    img = Image.open(image_file)
    # Check if the image is successfully loaded
    if img is None:
        return jsonify({'error': 'Failed to load the image'})
    image = load_and_prep_image(img)

    # Perform object detection
    detections = detect_objects(image)
    print(detections)
    
    # Return the detection results
    return jsonify(detections)


if __name__ == '__main__':
    app.run(debug=True)
