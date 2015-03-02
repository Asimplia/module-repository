
import User = require('../Entity/Application/User');

export = UserCallback;
type UserCallback = (e: Error, user?: User) => void;
