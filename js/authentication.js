const databaseKey = "accounts";

// initialize accounts database
function initializeAccountsDb() {
  if (!localStorage.getItem(databaseKey)) {
    localStorage.setItem(databaseKey, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(databaseKey));
}

// insert account into db
function addAccount(value) {
    console.log(value)
  var accounts = initializeAccountsDb();
  console.log(accounts);
  accounts.push(value);
  localStorage.setItem(databaseKey, JSON.stringify(accounts));
}

// fetch all accounts
function getAccounts() {
  var database = initializeAccountsDb();
  return database;
}

// filter account by email
function getAccountByEmail(email) {
  var database = initializeAccountsDb();
  return database.find(
    (account) => account.email.toLowerCase() == email.toLowerCase()
  );
}

function encryptPassword(password) {
  return btoa(password);
}

function decryptPassword(encryptedPassword) {
  return atob(encryptedPassword);
}

function handleLoginSubmit(event) {
  event.preventDefault();
  var form = document.getElementById("loginForm");

  var email = form.elements["email"].value;
  var password = form.elements["password"].value;

  var account = getAccountByEmail(email);
  if (!account || decryptPassword(account.password) != password) {
    var errorDiv = document.getElementById("error");
    errorDiv.textContent = "Invalid email or password";
    errorDiv.style.display = "block";
  }
}

function handleRegisterSubmit(event) {
  event.preventDefault();

  var form = document.getElementById("registerForm");
  var name = form.elements["name"].value;
  var email = form.elements["email"].value;
  var password = form.elements["password"].value;

  var errorDiv = document.getElementById("error");


  if(name.length < 5){
    errorDiv.textContent = 'Name must be at least 5 characters long';
    errorDiv.style.display = 'block';
    return;
  }

  if(password.length < 6){
    errorDiv.textContent = 'Password must be at least 6 characters long';
    errorDiv.style.display = 'block';
    return;
  }

  var account = getAccountByEmail(email);
  if (account) {
    errorDiv.textContent = "Email already in use";
    errorDiv.style.display = "block";
    return;
  }

  var newAccount = {
    name: name,
    email: email,
    password: encryptPassword(password),
  };

  errorDiv.textContent = '';
  errorDiv.style.display = 'none';

  var successDiv = document.getElementById("success");
  successDiv.textContent = "Registration successful. Proceed to login";
  successDiv.style.display = 'block';

  addAccount(newAccount);
}
