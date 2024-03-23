import axios from 'axios';
import Player from '../models/Player';

export function getPlayer(id: string) {
    return axios.get(`/player/${id}`);
}

export function updatePlayer(id: string, data: any) {
    return axios.put(`/player/${id}`, data);
}

export function deletePlayer(id: string) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/player/delete/${id}`);
}


export function addPlayer(data: any) {
    return axios.post(`${process.env.REACT_APP_API_URL}/player/add`, data);
}

export function getPlayers() {
    return axios.get(`${process.env.REACT_APP_API_URL}/player/get-players`);
}

