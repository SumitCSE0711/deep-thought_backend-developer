## Event Management API Documentation

This API allows users to manage event information through a RESTful interface. It supports creating, reading, updating, and deleting (CRUD) event entries in a MongoDB database. Each event includes details such as name, description, schedule, and other information.

### Base URL
- Local Development: `http://localhost:3000/api/v3/app`

### GET /api/v3/app/events?id=:event_id
- **Description**: Retrieve an event by its unique ID.
- **Method**: GET
- **Query Parameters**:
  - `id` (string, required): The unique identifier of the event to retrieve.
  
#### b) **GET /api/v3/app/events/latest**


### GET /api/v3/app/events/latest
- **Description**: Retrieve a paginated list of the latest events.
- **Method**: GET
- **Query Parameters**:
  - `limit` (integer, optional): Number of events to return per page. Default is 5.
  - `page` (integer, optional): Page number to retrieve. Default is 1.
  

GET /api/v3/app/events/latest?limit=5&page=1


---

#### c) **POST /api/v3/app/events**

markdown
### POST /api/v3/app/events
- **Description**: Create a new event.
- **Method**: POST
- **Request Body**:
  - JSON object with the event details.

---

#### d) **PUT /api/v3/app/events/:id**


### PUT /api/v3/app/events/:id
- **Description**: Update an existing event by its ID.
- **Method**: PUT
- **Path Parameter**:
  - `id` (string, required): The unique identifier of the event to update.
- **Request Body**:
  - JSON object with the updated fields.


---

#### e) **DELETE /api/v3/app/events/:id**


### DELETE /api/v3/app/events/:id
- **Description**: Delete an event by its ID.
- **Method**: DELETE
- **Path Parameter**:
  - `id` (string, required): The unique identifier of the event to delete.




  


