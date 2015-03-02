
import User = require('../Entity/Application/User');
import List = require('../Entity/List');

export = UserListCallback;
type UserListCallback = (e: Error, userList?: List<User>) => void;
