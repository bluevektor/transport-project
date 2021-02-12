const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
  if (user) {
      loggedInLinks.forEach(link => link.style.display = 'block');
      loggedOutLinks.forEach(link => link.style.display = 'none');
  } else {
    loggedInLinks.forEach(link => link.style.display = 'none');
    loggedOutLinks.forEach(link => link.style.display = 'block');
  }
}

// Signup

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  console.log(email, password);

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();

      // close the modal
      $("#signupModal").hide();
      $(".modal-backdrop").remove();

      console.log("sign up");
    });
});

// Signin

const signinform = document.querySelector('#login-form');

signinform.addEventListener('submit', e => {
e.preventDefault();

  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();

      // close the modal
      $("#signinModal").hide();
      $(".modal-backdrop").remove();

      console.log("sign in");
    })

});

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('sign out')
  })
})


// posts

const postList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.description}</p>
      </li>
      <br>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '';
  }
};

// eventos
// listar datos para usuarios autenticados
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
    fs.collection("posts")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log("signout");
    setupPosts([]);
    loginCheck(user);
  }
});