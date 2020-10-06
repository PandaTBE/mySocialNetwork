import { instanse, ResponseTypes, ResultCodesEnum } from './api';
import { ProfileType } from './../components/redux/profileReducer';
import { PhotosType } from './../components/redux/authReducer';
import { ContactsType } from "../components/redux/profileReducer";

type GetUserResponseType = ProfileType

type UploadPhotoResponseDataType = {
    photos: PhotosType

}
export type SetContactsFormType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}
export const profileAPI = {
    getUser(userId: number | null) {
        return instanse.get<GetUserResponseType>('profile/' + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instanse.get('profile/status/' + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instanse.put<ResponseTypes>('profile/status', {
            status
        })
    },
    uploadPhoto(photo: File) {
        const formData = new FormData();
        formData.append('photos', photo);
        return instanse.put<ResponseTypes<ResultCodesEnum, UploadPhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    setContacts(formData: SetContactsFormType) {
        return instanse.put<ResponseTypes>('profile', formData)
    }
};