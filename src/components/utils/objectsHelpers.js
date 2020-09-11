export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(user => {
        if (itemId === user[objPropName]) {
            return { ...user, ...newObjProps };;
        }
        return user;
    })
} 