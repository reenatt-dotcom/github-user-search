import React, { useState } from "react";
import "./styles.css";

function App() {
  //store the user's search query
  const [query, setQuery] = useState("");
  //store data of searched user from github api
  const [userData, setUserData] = useState(null);
  //store error message
  const [error, setError] = useState(null);

  const handleSearch = () => {
    //construct url for github api request
    const url = `https://api.github.com/users/${query}`;
    console.log(url);
    //make GET request to github api
    //convert response to json
    //if data.login exists a valid user was found
    //user data stored in userData
    //error reset to null
    //if not userData is set to null
    //empty string is set to error
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.login) {
          setUserData(data);
          setError(null);
        } else {
          setUserData(null);
          setError("");
        }
      })
      .catch((error) => {
        setError("An error occurred.");
      });
  };
  //value of input field is set to query
  //onChange updates query with entered value
  //if userData is not null div is rendered
  return (
    <div className="page-container">
      <div className="centered-div">
        <h2>Project 5: Github User Search</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter username or email"
        />
        <button onClick={handleSearch}>Search</button>
        <h3>Results</h3>
        {userData && (
          <div className="box">
            {/* <h2>{userData.name}</h2> */}
            <img src={userData.avatar_url} alt="User Avatar" />
            <br />
            <a href={userData.html_url}>{userData.login}</a>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default App;
