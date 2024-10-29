# **CoolCuts**  

A full-stack web application built using **Django** for the backend and **React** for the frontend. CoolCuts offers a seamless and user-friendly experience, showcasing beautiful UI elements with responsive design.  

## **Features**  
- **Dynamic Home Page** with background images and responsive layout.  
- **Backend**: Django manages user data, authentication, and APIs.  
- **Frontend**: React handles the UI with state management.  
- **Deployment**: Successfully deployed using Django static file integration.  

---

## **Tech Stack**  
- **Frontend**: React, HTML, CSS  
- **Backend**: Django, Python  
- **Database**: PostgreSQL  
- **Deployment Platform**: Render  

---

## **Setup Instructions**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/Vishal18cse/CoolCuts
```
### **2. Install Backend Dependencies**
Ensure Python and pip are installed.
```
pip install -r requirements.txt
```
### **3. Install Frontend Dependencies**
Go to the frontend directory and install dependencies:
```
cd frontend
npm install
```
### **4. Build the React Frontend**
Generate static files to integrate into the Django backend:
```
npm run build
```
### **5. Setup Database**
Ensure PostgreSQL is installed and create a new database. Update your settings.py with the database credentials
```
python manage.py migrate
```
### **6. Serve Static Files and Run Server**
Collect static files and start the Django server:
```
python manage.py collectstatic --no-input'
python manage.py runserver
```
## **Screenshots**  
![Homepage](frontend/build/Images/screenShot1.png)
![Book Appointment](frontend/build/Images/screenShot2.png)
![Appointment List](frontend/build/Images/screenShot3.png)

