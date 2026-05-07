from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

app = FastAPI()

# 1. РАЗРЕШАЕМ СВЯЗЬ С FRONTEND (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. ОПРЕДЕЛЯЕМ МОДЕЛЬ ДАННЫХ
# Мы используем Optional[str], чтобы сервер не "падал", 
# если у какого-то слова в JSON временно нет категории.
class Word(BaseModel):
    id: int
    en: str
    ru: str
    kz: str
    definition: str
    category: Optional[str] = None 

# 3. ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ
def load_data():
    try:
        with open('dictionary.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# 4. МАРШРУТЫ (ENDPOINTS)
@app.get("/")
def read_root():
    return {"status": "Сервер работает", "project": "Military Dictionary"}

@app.get("/words")
def get_words():
    return load_data()