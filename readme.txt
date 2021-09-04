new hyperloop ui


signOut() {
return new Promise((resolve, reject) => {
gapi.auth2.getAuthInstance().signOut().then(resolve, reject);
});
}


Calling function
handleSignoutClick() {
this.handler.signOut().then((result) => {
localStorage.removeItem('userinfo');
this.router.navigateByUrl('/login');
});
}


40.112.165.32
username : hyperlooptt
password:Hyperloop@567 



