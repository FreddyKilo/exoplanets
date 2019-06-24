# exoplanets
A program that downloads and displays a catalog of exoplanet data

To start API server, run `npm start` from project root directory

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

    * **Code:** 404 NOT FOUND 
    * **Content:** { error : "User doesn't exist" }
    
    OR

    * **Code:** 401 UNAUTHORIZED 
    * **Content:** { error : "You are unauthorized to make this request." }
    * **Sample Call:**
    
          $.ajax({
            url: "/users/1",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
          });