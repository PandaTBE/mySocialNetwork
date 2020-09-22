import { PhotosType } from './../../components/redux/authReducer';
export type SingleUserType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
}