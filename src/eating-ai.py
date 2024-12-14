import socket
import numpy as np
from tensorflow.keras.models import load_model

# Load the trained model
model = load_model(r"C:\Users\edwz2\Downloads\hand_to_mouth_model.h5")
print("Model loaded successfully!")

# Server configuration
server_ip = "0.0.0.0"  # Listen on all available interfaces
server_port = 5173

# Start the server
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((server_ip, server_port))
server.listen(5)
print(f"Server listening on {server_ip}:{server_port}")

# Buffer for incoming data
buffer = ""
counter = 0

while True:
    conn, addr = server.accept()
    print(f"Connection established with {addr}")
   
    with conn:
        while True:
            try:
                data = conn.recv(1024).decode("utf-8")  # Receive data
                if not data:
                    break  # Exit if connection is closed
               
                buffer += data  # Append new data to buffer
                while "\n" in buffer:  # Process complete lines
                    line, buffer = buffer.split("\n", 1)
                    print(f"Received: {line.strip()}")
                   
                    try:
                        # Parse and reshape the data for prediction
                        values = list(map(float, line.split(",")))
                        reshaped_data = np.array(values).reshape(1, -1, 6)
                        prediction = model.predict(reshaped_data)
                   
                        # Check prediction and send message if needed
                        if prediction > 0.5:
                            print("Not eating detected!")
                            counter += 1
                            if counter > 100:
                                print("EAT")  # Print to console
                                conn.sendall(b"ON\n")  # Send "ON" message to Arduino
                        else:
                            counter = 0
                            print("Eating detected!")

                    except ValueError as e:
                        print(f"Error parsing line: {line} - {e}")
            except Exception as e:
                print(f"Error during data handling: {e}")
                break