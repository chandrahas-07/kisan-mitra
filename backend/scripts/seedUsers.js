const bcrypt = require("bcrypt");
const { createUser } = require("../services/userService");

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await createUser({
      userId: "USER-001",
      name: "Admin User",
      email: "admin@kisanmitra.com",
      password: hashedPassword,
      role: "Admin",
      createdAt: new Date().toISOString(),
    });

    console.log(" Admin user inserted successfully.");
  } catch (error) {
    console.error(error);
  }
}

seed();