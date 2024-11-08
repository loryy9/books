cd ..
call venv\Scripts\activate
cd backend

uvicorn main:app --reload