import time
import json
from locust import HttpUser, TaskSet, task

class UserBehaviour(TaskSet):
    def on_start(self):
        self.login()

    def login(self):
        self.client.post("/api/user/login", {'email': 'newmail@mail.com', 'password': 'Test1234!'})

    @task(1)
    def post_login(self):
        self.login()

    @task(1)
    def get_by_id(self):
        self.client.get(url="/api/user/id/5")

class User(HttpUser):
    tasks=[UserBehaviour]
    host='https://localhost:3000'