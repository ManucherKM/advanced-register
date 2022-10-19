class UserDtos {
    email;
    id;
    isActivated;

    constructor(obj) {
        this.email = obj.email
        this.id = obj._id
        this.isActivated = obj.isActivated
    }
};

export default UserDtos