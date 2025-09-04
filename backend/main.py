from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import Subscriber
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
import os
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic schema
class SubscribeRequest(BaseModel):
    email: EmailStr

# Subscribe endpoint
@app.post("/subscribe/")
def subscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    if db.query(Subscriber).filter(Subscriber.email == request.email).first():
        raise HTTPException(status_code=400, detail="Email already subscribed")
    new_sub = Subscriber(email=request.email)
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    try:
        msg = MIMEText("Thank you for subscribing! You'll get Dashain countdown updates.")
        msg["Subject"] = "Subscription Confirmed"
        msg["From"] = os.environ.get("EMAIL_USER")
        msg["To"] = request.email

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(os.environ.get("EMAIL_USER"), os.environ.get("EMAIL_PASS"))
            server.sendmail(os.environ.get("EMAIL_USER"), request.email, msg.as_string())
    except Exception as e:
        print(f"Failed to send confirmation email to {request.email}: {e}")

    return {"message": "Subscribed successfully!"}

# Function to calculate days left
def get_days_left():
    today = datetime.now()
    dashain_date = datetime(2025, 10, 2)
    return (dashain_date - today).days

# Function to send emails
def send_daily_email():
    db = SessionLocal()
    subscribers = db.query(Subscriber).all()
    days_left = get_days_left()

    for sub in subscribers:
        msg = MIMEText(f"Hello! Only {days_left} days left for Dashain 🎉")
        msg["Subject"] = "Dashain Countdown"
        msg["From"] = os.environ.get("EMAIL_USER")
        msg["To"] = sub.email

        try:
            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(os.environ.get("EMAIL_USER"), os.environ.get("EMAIL_PASS"))
                server.sendmail(os.environ.get("EMAIL_USER"), sub.email, msg.as_string())
        except Exception as e:
            print(f"Failed to send email to {sub.email}: {e}")

    db.close()

# Schedule daily email at server startup
scheduler = BackgroundScheduler()
scheduler.add_job(send_daily_email, "interval", days=1)
scheduler.start()


load_dotenv() 