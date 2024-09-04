import tensorflow as tf
from tensorflow.keras.models import load_model
import tensorflow_hub as hub

# Define the custom objects used in the model
custom_objects = {'KerasLayer': hub.KerasLayer}
print("TensorFlow version:", tf.__version__)
# Load the model with custom objects
loaded_model2 = load_model('./sequential_model.h5', custom_objects=custom_objects)
