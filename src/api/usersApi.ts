import { instanse, ResponseTypes } from './api';
import { SingleUserType } from "../types/types";

type GetUsersResponseType = {
    items: Array<SingleUserType>
    totalCount: number
    error: string | null
}


export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 5) {
        return instanse.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    subscribe(id: number) {
        return instanse.post<ResponseTypes>(`follow/${id}`)
            .then(response => response.data)
    },
    unsubscribe(id: number) {
        return instanse.delete<ResponseTypes>(`follow/${id}`)
            .then(response => response.data)
    }
};