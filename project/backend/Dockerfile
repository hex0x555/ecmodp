# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt .

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY app /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# FOR LATER W/ FLASK 
# Run the application
# CMD ["python", "main.py"]


# Define the command to run the application
CMD ["python", "-m", "http.server", "8000"]
