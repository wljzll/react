export const UserAPI = {
    list() {
        // 从localStorage中获取缓存的users对象
        let usersStr = localStorage.getItem('users');
        // 拿到了就转成对象 没有就是个空数组
        let users = usersStr ? JSON.parse(usersStr) : [];
        return users;
    },
    add(user) {
        // 拿到之前村的
        let users = UserAPI.list();
        // 添加一个
        users.push(user);
        // 重新放入
        localStorage.setItem('users', JSON.stringify(users));
    },
    find(id) {
        // 从本地储存中拿出来
        let users = UserAPI.list();
        // 拿到对应的
        return users.find((user) => user.id === id);
    }
}