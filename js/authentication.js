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
    var accounts = initializeAccountsDb();
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

// encrypt password
function encryptPassword(password) {
    return btoa(password);
}

// decrypt password
function decryptPassword(encryptedPassword) {
    return atob(encryptedPassword);
}

// regex to validate email
function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const AccountsDb = {
    getAccounts: getAccounts,
    addAccount: addAccount,
    getAccountByEmail: getAccountByEmail,
};

const Security = {
    encryptPassword: encryptPassword,
    decryptPassword: decryptPassword,
};


// login button handler
function handleLoginSubmit(event) {
    event.preventDefault();
    var form = document.getElementById("loginForm");

    var email = form.elements["email"].value;
    var password = form.elements["password"].value;

    var account = AccountsDb.getAccountByEmail(email);
    if (!account || Security.decryptPassword(account.password) != password) {
        var errorDiv = document.getElementById("error");
        var successDiv = document.getElementById("success");
        
        errorDiv.textContent = "Invalid email or password";
        errorDiv.style.display = "block";
        successDiv.style.display = "none"; // Hide success message
        return;
    }

    // Save user's information in session storage
    sessionStorage.setItem("currentUser", JSON.stringify(account));

    // Redirect to the home page
    window.location.href = '../home.html';
}

// register button handler
function handleRegisterSubmit(event) {
    event.preventDefault();

    var form = document.getElementById("registerForm");
    var name = form.elements["name"].value;
    var email = form.elements["email"].value;
    var password = form.elements["password"].value;

    var errorDiv = document.getElementById("error");
    var successDiv = document.getElementById("success");

    if(!validateEmail(email)){
        errorDiv.textContent = "Invalid email. Enter valid email address";
        errorDiv.style.display = "block";
        successDiv.style.display = "none"; // Hide success message
        return;
    }

    if (name.length < 5) {
        errorDiv.textContent = "Name must be at least 5 characters long";
        errorDiv.style.display = "block";
        successDiv.style.display = "none"; // Hide success message
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = "Password must be at least 6 characters long";
        errorDiv.style.display = "block";
        successDiv.style.display = "none"; // Hide success message
        return;
    }

    var account = AccountsDb.getAccountByEmail(email);
    if (account) {
        // If the account already exists, show a popup saying "Username already exists"
        alert("Username already exists");
        return;
    }

    var newAccount = {
        name: name,
        email: email,
        password: Security.encryptPassword(password),
    };

    errorDiv.textContent = "";
    errorDiv.style.display = "none"; // Hide error message

    successDiv.textContent = "Registration successful. Proceed to login";
    successDiv.style.display = "block";
    
    addAccount(newAccount);
    var formsubmitsuccess = document.getElementById("registerForm");
    formsubmitsuccess.reset()
}
