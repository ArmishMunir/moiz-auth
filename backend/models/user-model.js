const connection = require("../config/db");
const bcrypt = require("bcrypt");

const tableExists = (tableName) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) AS count 
       FROM information_schema.tables 
       WHERE table_schema = ? 
       AND table_name = ?`,
      [process.env.DB_NAME, tableName],
      (error, results) => {
        if (error) return reject(error);
        resolve(results[0].count > 0);
      }
    );
  });
};

const createUserTable = async () => {
  try {
    const exists = await tableExists("user");
    if (!exists) {
      connection.query(
        `CREATE TABLE IF NOT EXISTS user (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role_id INT,
          status ENUM('active', 'inactive') DEFAULT 'active',
          FOREIGN KEY (role_id) REFERENCES role(id)
        )`,
        (error, results, fields) => {
          if (error) throw error;
          console.log("User table created successfully.");
        }
      );
    }
  } catch (error) {
    console.error("Error creating user table:", error);
  }
};

const createRoleTable = async () => {
  try {
    const exists = await tableExists("role");
    if (!exists) {
      connection.query(
        `CREATE TABLE IF NOT EXISTS role (
          id INT AUTO_INCREMENT PRIMARY KEY,
          role_name ENUM('user', 'admin', 'super_admin') NOT NULL
        )`,
        (error, results, fields) => {
          if (error) throw error;
          console.log("Role table created successfully.");
        }
      );
    }
  } catch (error) {
    console.error("Error creating role table:", error);
  }
};

const createUser = async (name, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const roleId = await getRoleId(role);
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user (name, password, role_id) VALUES (?, ?, ?)",
        [name, hashedPassword, roleId],
        (error, results) => {
          if (error) {
            console.error("Error inserting user into database:", error);
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const findUserByName = (name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user.id, user.name, user.password, role.role_name, user.status 
       FROM user 
       LEFT JOIN role ON user.role_id = role.id 
       WHERE user.name = ?`,
      [name],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length === 0) {
          return resolve(null);
        }
        resolve(results[0]);
      }
    );
  });
};

const getRoleId = (role) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id FROM role WHERE role_name = ?",
      [role],
      (error, results) => {
        if (error) {
          console.error("Error fetching role from database:", error);
          return reject(error);
        }
        if (results.length === 0) {
          return reject(new Error(`Role ${role} not found`));
        }
        resolve(results[0].id);
      }
    );
  });
};

const insertRoles = async () => {
  return new Promise((resolve, reject) => {
    const roles = ["user", "admin", "super_admin"];
    roles.forEach((role) => {
      connection.query(
        "INSERT IGNORE INTO role (role_name) VALUES (?)",
        [role],
        (error, results) => {
          if (error) {
            console.error("Error inserting role into database:", error);
            return reject(error);
          }
        }
      );
    });
    resolve();
  });
};

// Call this function when initializing your application
insertRoles()
  .then(() => {
    console.log("Roles inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting roles:", error);
  });

module.exports = {
  createUserTable,
  createUser,
  findUserByName,
  tableExists,
  createRoleTable,
  getRoleId,
};
