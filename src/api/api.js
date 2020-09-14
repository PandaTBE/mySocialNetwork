import * as axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "29aabadf-3d40-4ae6-8165-a5dfa9a9fe22"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    subscribe(id) {
        return instanse.post(`follow/${id}`)
            .then(response => response.data)
    },
    unsubscribe(id) {
        return instanse.delete(`follow/${id}`)
            .then(response => response.data)
    }
};

export const profileAPI = {
    getUser(userId) {
        return instanse.get('profile/' + userId)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instanse.get('profile/status/' + userId)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instanse.put('profile/status', {
            status
        })
    },
    uploadPhoto(photo) {
        const formData = new FormData();
        formData.append('photos', photo);
        return instanse.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export const headerAPI = {
    auth() {
        return instanse.get('auth/me')
            .then(response => response.data)
    },
    login(email, password, rememberMe) {
        return instanse.post('auth/login', { email, password, rememberMe })
    },
    logout() {
        return instanse.delete('auth/login')
    }
};