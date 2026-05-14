from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="Velocity | Luxury Cars Showroom")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/indian-cars")
async def indian_cars(request: Request):
    return templates.TemplateResponse("indian_cars.html", {"request": request})

@app.get("/ev-showroom")
async def ev_showroom(request: Request):
    return templates.TemplateResponse("ev_showroom.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
