import { initializeApp } from 'firebase/app';

import { getDatabase, ref, remove, push, get, update, updateDoc, onChildAdded, onChildRemoved, onValue } from 'firebase/database';

import { firebaseConfig } from './../../../config/firebase/index.mjs';

export const firebaseApp   = initializeApp(firebaseConfig);
export const firebaseStore = getDatabase(firebaseApp);

import { Player } from './../../../service/player.js';

import coherentRandom from './../../boards/coherentRandom';
import magnet from './../../boards/magnet';

export const addPlayer = async data => {

    return await push(ref(firebaseStore, 'users/'), new Player(data));
}

export const sendEvent = async data => {

    return await push(ref(firebaseStore, 'events/'), data);
};

export const listenEvents = callback => {

    onChildAdded(ref(firebaseStore, 'events/'), event => {

        const val = event.val()

        val.views = val.views ? Object.values(val.views) : [];

        callback({
            ...{ id : event.key },
            ...val
        });
    });
}

export const deleteEvents = async () => {
    return await remove(ref(firebaseStore, `events/`));
}

export const setEventAsView = async (eventId, playerId) => {
    return await push(ref(firebaseStore, `events/${eventId}/views`), playerId);
}

export const listenPlayers = callback => {

    onChildAdded(ref(firebaseStore, 'users/'), player => {
        callback({
            player : {
                ...{ id : player.key },
                ...player.val()
            },
            eventType : 'onChildAdded'
        });
    });

    onValue(ref(firebaseStore, 'users/'), players => {
        callback({
            players : transformObject(players.val()),
            eventType : 'onValue'
        });
    });

    onChildRemoved(ref(firebaseStore, 'users/'), player => {
        callback({
            player : {
                ...{ id : player.key },
                ...player.val()
            },
            eventType : 'onChildRemoved'
        });
    });
}

export const onChildAddedPlayer = callback => {

    onChildAdded(ref(firebaseStore, 'users/'), player => {
        callback({
            player : {
                ...{ id : player.key },
                ...player.val()
            },
            eventType : 'onChildAdded'
        });
    });
}

export const onChildAddedPlayerBoard = (id, callback) => {

    onValue(ref(firebaseStore, `users/${id}/board`), board => {

        callback(board.val());
    });
}

export const listenPlayer = (id, callback) => {

    onValue(ref(firebaseStore, `users/${id}`), event => {

        callback({
            ...{ id : event.key },
            ...event.val()
        });
    });
}

export const listenPlayerBoard = (id, callback) => {

    onValue(ref(firebaseStore, `users/${id}/board`), board => {

        callback(board.val());
    });
}

export const deletePlayers = async () => {
    return await remove(ref(firebaseStore, `users/`));
}

export const getPlayer = async id => {

    const player = await get(ref(firebaseStore, `users/${id}`));

    if (!player.val()) {
        return false;
    }

    return {
        ...{ id : player.key },
        ...player.val()
    };
}

export const deletePlayer = async id => {

    return await remove(ref(firebaseStore, `users/${id}`));
}

export const setPlayerReady = async (id, value) => {

    return await update(ref(firebaseStore, `users/${id}`), {
        isReady : value
    });
}

export const giveBoardToClearToPlayers = async ids => {

    const boardToClear = magnet(15, 15);

    for await (const id of ids) {

        await update(ref(firebaseStore, `users/${id}`), {
            boardToClear : boardToClear
        })
    }
}

export const updatePlayerBoard = async data => {

    const { id, board } = data;

    await update(ref(firebaseStore, `users/${id}`), {
        board : board
    });
}

function transformObject(data) {

    if (!data) {
        return;
    }

    return Object.entries(data).map(([id, value]) => {
        
        const obj = { id };
        
        Object.entries(value).forEach(([prop, val]) => {
            obj[prop] = val;
        });
        
        return obj;
    });
}