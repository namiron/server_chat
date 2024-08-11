 ## CHAT server

Is a training project on implementing a program for real-time communication

# Technologies
socket.io
node.js
express.js
http



# Decription

## Handling events when a user connects

<img width="600" alt="soket io" src="https://github.com/user-attachments/assets/89a8c604-e1f5-4d30-aed7-1e3443d553a3">


# sending a message
    socket.on('sendMessage', ({ message, params }) => {
        const user = findUser(params);
        if (user) {
            io.to(user.room).emit('message', { data: { user, message } })
        }
    })

 # leaving the room
    socket.on('leftRoom', ({ params }) => {
        const user = removeUser(params);

        if (user) {
            const { room, name } = user;
            io.to(room).emit('message', {
                data: {
                    user: { name: 'Admin' }, message: `${name} has left`
                }
            })
            io.to(room).emit('joinRoom', { data: { room: room, users: getRoomUsers(room) } })
        }
    })


## The addUser
function adds a user to the users list if he is not already in this room.
If the user already exists, the function simply returns information about
the user.

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

## findUser
The function searches for a user in the users array by name and room.


const findUser = (user) => {
    if (!user || !user.name || !user.room) {
        return null;
    }
    const userName = trimSt(user.name);
    const userRoom = trimSt(user.room);

    return users.find((u) => trimSt(u.name) === userName && trimSt(u.room) === userRoom);
};


