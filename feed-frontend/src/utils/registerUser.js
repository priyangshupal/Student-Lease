import {
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { CLIENT_ID, POPULATE_ON_SIGNUP_URL, USER_POOL_ID } from "../constants";

export default function registerUser(useremail) {
  var userPoolData = {
    UserPoolId: USER_POOL_ID, // Replace with your user pool id
    ClientId: CLIENT_ID, // Replace with your app client id
  };
  var userPool = new CognitoUserPool(userPoolData);

  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  var attributeList = [];

  var dataEmail = {
    Name: "email",
    Value: email,
  };
  var dataName = {
    Name: "name",
    Value: name,
  };

  var attributeEmail = new CognitoUserAttribute(dataEmail);
  var attributeName = new CognitoUserAttribute(dataName);

  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  userPool.signUp(email, password, attributeList, null, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    alert("User successfully registered: " + cognitoUser.getUsername());
    const reqBody = { email: useremail };
    fetch(POPULATE_ON_SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reqBody }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  });
}
