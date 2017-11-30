const users = [{
  id: 1,
  name: 'CH',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    var user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// CH has a 83% in the class
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((acc, cur) => acc + cur) / grades.length;
    }

    return `${user.name} has ${average}% in the class`;
  });
};

/*
adding async infront of the function so the function returns a Promise
and the returned value will be the argument in the resolve call
throw new Error(argument) will replace the usage of reject(argument)
(returning something -> resolving; throwing an error -> rejecting)
e.g.
const getStatusAlt = async (userId) => {
  throw new Error('This is an error');
  return 'Mike'
};

same as:
(userId) => {
  return new Promise((resolve, reject) => {
  reject('This is an error');
  resolve('Mike');
  })
}
*/
const getStatusAlt = async (userId) => {

  // the resolved value of the Promise will get stored in user variable
  const user = await getUser(userId); // we can only use await inside async function
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((acc, cur) => acc + cur) / grades.length;
  }

  return `${user.name} has ${average}% in the class`;
};

// console.log(getStatusAlt());
getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});


// getStatus(2).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// })
// getGrades(12).then((grades) => {
//   console.log(grades);
// }).catch((e) => {
//   console.log(e);
// });

// getUser(21).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
