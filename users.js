const { trimSt } = require('./utils');

let users = [];

const addUser = (user) => {
    if (!user || !user.name || !user.room) {
        return { error: 'User and room are required.' };
    }

    const isExist = findUser(user);

    if (!isExist) {
        users.push(user);
    }

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};

const findUser = (user) => {
    if (!user || !user.name || !user.room) {
        return null;
    }

    const userName = trimSt(user.name);
    const userRoom = trimSt(user.room);

    return users.find((u) => trimSt(u.name) === userName && trimSt(u.room) === userRoom);
};

const getRoomUsers = (room) => {
    if (!room) {
        return [];
    }
    return users.filter((u) => u.room === room);
};

const removeUser = (user) => {
    if (!user || !user.name || !user.room) {
        return null;
    }

    const found = findUser(user);

    if (found) {
        users = users.filter(
            (u) => !(u.room === found.room && u.name === found.name)
        );
    }

    return found;
};

module.exports = { addUser, findUser, getRoomUsers, removeUser };



// const { trimSt } = require('./utils')

// let users = []

// const addUser = (user) => {

//     const isExist = findUser(user);

//     !isExist && users.push(user)

//     const currentUser = isExist || user

//     return { isExist: !!isExist, user: currentUser }
// }

// const findUser = (user) => {
//     const userName = trimSt(user.name)
//     const userRoom = trimSt(user.room)

//     return users.find((u) => trimSt(u.name) === userName && trimSt(u.room) === userRoom)
// }

// const getRoomUsers = (room) => users.filter((u) => u.room === room)

// const removeUser = (user) => {
//     const found = findUser(user)


//     if (found) {
//         users = users.filter(
//             ({ room, name }) => room === found.room && name !== found.name)
//     }
//     return found
// }

// module.exports = { addUser, findUser, getRoomUsers, removeUser }
