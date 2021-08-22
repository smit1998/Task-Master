function getAuthToken() {
  const authToken = sessionStorage.getItem('_auth');
  return authToken ? `Token ${authToken}` : '';
}

export default class API {
  static login(username, password) {
    return fetch('/auth/token/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        }),
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static signUp(first_name, last_name, username, email, password) {
    return fetch('/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'first_name': first_name,
          'last_name': last_name,
          'username': username,
          'email': email,
          'password': password
        }),
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static logout(username, password) {
    return fetch('/auth/token/logout', {
        method: 'POST',
        headers: {
          'Authorization': getAuthToken(),
          'Content-Type': 'application/json',
        }
      })
      .then(res => ({ status: res.status }));
  }

  static getLoggedInUser() {
    return fetch('/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static getUserProfile(username) {
    return fetch('/api/users/' + username + '/profile', {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static updateUser(firstName, lastName, email) {
    return fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
      }),
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getUserSearchList(search_term) {
    return fetch('/api/user/search/' + search_term, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static taskUpdate(taskID, projectID, description, name, state, storyPoints, deadline, assignedTo, priority) {
    let payload = {
      'name': name,
      'task_id': taskID,
      'project_id': projectID,
      'story_points': storyPoints,
      'assigned_to': assignedTo,
      'state': state,
      'priority': priority,
      'description': description,
      'deadline': deadline === '' ? null : deadline
    };

    return fetch('/api/task/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify(payload),
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static createProject(name) {
    return fetch('/api/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'name': name,
      }),
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getUserProjects() {
    return fetch('/api/project/me', {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getProjects(username) {
    return fetch('/api/project/user/' + username, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static createTask(name, projectID, description, storyPoints, assignedTo, priority, deadline) {
    let payload = { 'name': name, 'project_id': projectID, 'story_points': storyPoints };

    if (description) payload.description = description;
    if (assignedTo) payload.assigned_to = assignedTo;
    if (priority) payload.priority = priority;
    if (deadline) payload.deadline = deadline;

    return fetch('/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getTask(taskID) {
    return fetch('/api/task/' + taskID, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getAssignedTasks(username) {
    return fetch('/api/task/assigned/' + username, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getProjectUsers(projectID) {
    return fetch(`/api/project/${projectID}/members`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static addProjectMember(projectID, userID) {
    return fetch(`/api/project/${projectID}/members/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'user_id': userID
      }),
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getProjectTasks(projectID) {
    return fetch(`/api/project/${projectID}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static getProjectTaskSearchList(projectID, query) {
    // Return all tasks if search is empty
    if (query.length === 0) {
      return fetch(`/api/project/${projectID}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    } else {
      return fetch(`/api/project/${projectID}/tasks/search/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    }
  }

  static getAssignedTaskSearchList(query, username) {
    // Return all tasks if search is empty
    if (query === '') {
      return fetch(`/api/task/assigned/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    } else {
      return fetch(`/api/task/assigned/${username}/search/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    }
  }

  static getConnectedTaskSearchList(query, username) {
    // Return all tasks if search is empty
    ///task/connected/${username}/search/${query}
    if (query === '') {
      return fetch(`/api/task/connected/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    } else {
      return fetch(`/api/task/connected/${username}/search/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
    }    
  }

  static follow(username) {
    return fetch('/api/connection/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'connected_user_name': username
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static isFollowing(username) {
    return fetch('/api/connection/isfollowing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'connected_user_name': username
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static getConnectedUserTasks(username) {
    return fetch(`/api/task/user/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'connected_user_name': username
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static unfollow(username) {
    return fetch('/api/connection/unfollow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'connected_user_name': username
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static listFollowers(username) {
    return fetch('/api/connection/followers/' + username, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      },
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static listFollowing(username) {
    return fetch('/api/connection/following/' + username, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      },
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static listConnections() {
    return fetch('/api/connection/all', {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      },
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static getEligibleProjectMembers(projectID) {
    return fetch(`/api/project/${projectID}/members/eligible-users`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static toggleNudge(taskID) {
    return fetch('/api/task/toggle-nudge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'id': taskID,
      }),
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data }))
    );
  }

  static createSwitch(username) {
    return fetch('/api/profile/create/switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'user': username,
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data})))
  }

  static updateSwitch(username) {
    return fetch('/api/profile/update/switch', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'user': username,
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data })))
  }

  static getCurrentStateOfSwitch(username) {
    return fetch('/api/profile/switch/' + username, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      },
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data })))
  }
}
