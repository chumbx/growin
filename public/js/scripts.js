window.onload = () => {
  usersGet();
}

validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

usersGet = () => {
  fetch("/users", {
    method: 'GET'
  }).then((response) => {
    return response.json();
  })
    .then((json) => {
      console.log("JSON: ", json);
      //sort array by email
      json.sort((a, b) => {
        return a.email.localeCompare(b.email);
      });
      let html = '';
      for (let row of json) {
        html += '<tr>';
        html += '<td><input id="user-email-' + row.id + '" type="text" value="' + row.email + '" /></td>';
        html += '<td><input id="user-givenName-' + row.id + '" type="text" value="' + row.givenName + '" /></td>';
        html += '<td><input id="user-familyName-' + row.id + '" type="text" value="' + row.familyName + '" /></td>';
        html += '<td>' + row.created + '</td>';
        html += '<td>';
        html += ' <button onclick="usersEdit(' + row.id + ')">Save</button>';
        html += ' <button onclick="usersDelete(' + row.id + ',\'' + row.email + '\',\'' + row.givenName + '\',\'' + row.familyName + '\')">Remove</button>';
        html += '</td>';
        html += '</tr>';
      }
      document.getElementById('users').innerHTML = html;
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
}

usersInsert = () => {
  let email = document.getElementById('usersEmail').value.trim();
  if (!validateEmail(email)) {
    return alert("Error: Mail is invalid!");
  }
  let params = {
    email: email,
    givenName: document.getElementById('usersGivenName').value.trim(),
    familyName: document.getElementById('usersFamilyName').value.trim()
  }

  fetch("/users", {
    headers: { "Content-type": "application/json; charset=UTF-8" },
    method: 'POST',
    body: JSON.stringify(params)
  }).then((response) => {
    if (response.status == 200) {
      console.log('Inserted');
      usersGet();
    }
    else {
      console.log('Error(' + response.status + '):', response.statusText);
      alert("Error: Can't insert user!");
    }
  })
    .then((json) => {
      console.log("JSON: ", json);
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
}

usersDelete = (id, email, givenName, familyName) => {
  if (confirm("Are you sure you want to remove the user " + givenName + " " + familyName + " [" + email + "]?") == true) {
    let user = {
      id: id
    }
    fetch("/users", {
      headers: { "Content-type": "application/json; charset=UTF-8" },
      method: 'DELETE',
      body: JSON.stringify(user)
    }).then((response) => {
      if (response.status == 200) {
        console.log('Deleted');
        usersGet();
      }
      else {
        console.log('Error(' + response.status + '):', response.statusText);
        alert("Error: Can't delete user!");
      }
    })
      .then((json) => {
        console.log("JSON: ", json);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }
}

usersEdit = (id) => {
  let email = document.getElementById('user-email-' + id).value.trim();
  if (!validateEmail(email)) {
    return alert("Error: Mail is invalid!");
  }
  let params = {
    id: id,
    email: email,
    givenName: document.getElementById('user-givenName-' + id).value.trim(),
    familyName: document.getElementById('user-familyName-' + id).value.trim()
  }

  fetch("/users", {
    headers: { "Content-type": "application/json; charset=UTF-8" },
    method: 'PUT',
    body: JSON.stringify(params)
  }).then((response) => {
    if (response.status == 200) {
      console.log('Inserted');
      usersGet();
    }
    else {
      console.log('Error(' + response.status + '):', response.statusText);
      alert("Error: Can't insert user!");
    }
  })
    .then((json) => {
      console.log("JSON: ", json);
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
}