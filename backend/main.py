#! /usr/bin/env python3

from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from pydantic import BaseModel # type: ignore
from typing import Optional, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Modello pydantic per il libro
class Book(BaseModel):
    id: int
    title: str
    author: str

# Modello pydantic per la risposta standard
class StandardResponse(BaseModel):
    data: Optional[Any] = None
    error: Optional[Dict[str, Any]] = None

# Database simulato
books = []

@app.get("/", response_model = StandardResponse)
async def _root():
    return StandardResponse(data={"message": "Welcome to the Book API"})

# Endpoint CREATE
@app.post("/books/add", response_model = StandardResponse)
async def _create_book(book: Book):
    books.append(book)
    return StandardResponse(data = book)

@app.get("/books/clear", response_model = StandardResponse)
async def _clear():
    books.clear()
    return StandardResponse(data={"message": "Books cleared"})

@app.get("/books/list", response_model = StandardResponse)
async def _read_books():
    return StandardResponse(data=books)

@app.get("/books/{book_id}", response_model = StandardResponse)
async def _read_book(book_id: int):
    for book in books: 
        if book.id == book_id:
            return StandardResponse(data=book)
        
    return StandardResponse(error={"message": "Book not found", "code": "404"})

@app.delete("/books/del/{book_id}", response_model = StandardResponse )
async def _delete_book(book_id: int):
    for i, book in enumerate(books):
        if book.id == book_id:
            del books[i]
            return StandardResponse(data={"deleted": True})
    
    return StandardResponse(data={"deleted": False})