
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
    getDatabase,
    set,
    ref,
}from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const signup = () => {
  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        const usersRef = ref(database, `users/ ${userCredentials.user.uid}/`);
        set(usersRef, {
            email: email,
            createAt: new Date().getTime()
        })
        .then((value) => {
            window.location.href = "../dist/home.html"
        })
        .catch((error) => {
            console.log("database error",error);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

const login = () => {
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};
onAuthStateChanged(auth, (user) => {
  const logoutBtn = document.getElementById("logout");
  if (user) {
    logoutBtn.style.display = "flex";
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth);
    });
  } else {
    logoutBtn.style.display = "none";
  }
});

const button = document.getElementById("signup-btn");
if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    signup();
  });
}
const loginbutton = document.getElementById("login-btn");
if (loginbutton) {
  loginbutton.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });
}