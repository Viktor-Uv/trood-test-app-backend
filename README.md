# A testing back-end application made with Node.js and a Firebase database for Trood

## YouTube Demo
<div style="text-align: center;">
  <a href="https://www.youtube.com/watch?v=mArHXdNxXoE">
    <img src="https://img.youtube.com/vi/mArHXdNxXoE/0.jpg" alt="Watch on YouTube">
  </a>
</div>

### Features
- **User Profile Management:** Allows creating, reading, updating, and deleting user profiles.
- **Avatar Upload:** Supports uploading avatar images (JPG, PNG, JPEG) and returns a URL pointing to the uploaded file.
- **Input Validation:** Validates profile data (e.g., email, phone number) before saving to the database.
- **Firestore Database:** Data is stored in Firestore for quick and scalable access.

### How to install

#### Clone the Project
```shell
# Clone the repository
git clone git@github.com:Viktor-Uv/trood-test-app-backend.git
# Navigate into the project directory
cd trood-test-app-backend
```

#### Set up Firestore Project
1. Create a Firebase project with a Firestore database
2. Generate the Service Account Key from the **Project Settings > Service Accounts > Generate new private key**
3. Place the serviceAccountKey.json file in the root of your project.

#### Option 1: Local Installation
```shell
# Install the project dependencies
npm install
# Start the application
npm start
```

#### Option 2: Docker Installation
```shell
docker-compose up
```

#### The application will be available at http://localhost:8000.

### API Endpoints

#### User Profile Endpoints
* POST /profiles - Create a new user profile.
* GET /profiles/:id - Retrieve a user profile by ID.
* GET /profiles - Retrieve all user profiles.
* PUT /profiles/:id - Update an existing user profile.
* DELETE /profiles/:id - Delete a user profile.

#### Avatar Endpoints
* POST /avatars - Upload a new avatar. Supports .jpg, .jpeg, and .png formats, with a maximum size of 5 MB.
* GET /avatars/:filename - Retrieve the uploaded avatar by filename.

### Dependencies
+ Node.js: v23.x or above
+ npm: v10.x or above
+ Firebase-admin: v13.v or above
+ Express.js: v4.x or above
+ Joi: v17.x or above
+ Multer: v1.x or above
+ cors: v2.x or above
+ morgan: v1.x or above
