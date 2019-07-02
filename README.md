# exoplanets
A program that downloads and displays a catalog of exoplanet data

To start API server
* Run `npm start` from project root directory

    OR
    
* Run as a Docker container, i.e. `docker run -p <local port>:8000 -d exoplanets`

To run unit tests, run `npm test` from project root directory

* **URL**
    
    /exoplanets

* **Method:**

    GET

* **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

    * **Code:** 200 
    * **Content:** { id : 12, name : "Michael Bloom" }
    
* **Error Response:**

    * **Code:** 500 
    * **Content:** { message: "Internal call to exoplanets failed" }
    
* **Sample Call:**
    
          GET localhost:8000/exoplanets