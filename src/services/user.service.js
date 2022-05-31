import api from './api';

class UserService {
    getUserContent() {
        return api.get('user')
    }
}

export default new UserService();
