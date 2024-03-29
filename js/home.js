// check if user is logged in or not
function isAuthenticated(){
    var currentUser = localStorage.getItem('currentUser');
    return currentUser ? true : false;
}


// logout button handler
function handleLogoutButton(){
    localStorage.removeItem('currentUser');
    window.location.href = '../html/login.html';
}


window.onload = function(){
    if(isAuthenticated()){
        var logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.style.display = 'block';
    }
    else{
        var loginBtn = document.getElementById('loginBtn');
        loginBtn.style.display = 'block';
    }
}
