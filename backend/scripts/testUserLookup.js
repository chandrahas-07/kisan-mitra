const { getUserByEmail } = require("../services/userService");

async function test() {

  const user = await getUserByEmail("admin@kisanmitra.com");

  console.log(user);

}

test();