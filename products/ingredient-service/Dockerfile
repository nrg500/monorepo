FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
COPY ./app /app
ENV MONGO_URI "mongodb://mongo:27017/ingredients"
RUN python3 -m pip install motor