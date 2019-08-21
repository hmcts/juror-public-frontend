module.exports = {
  user: process.env.ORACLEDB_USER || 'system',
  password: process.env.ORACLEDB_PASSWORD || 'oracle',
  connectString: process.env.ORACLEDB_CONNECTIONSTRING || 'localhost:1521/xe',
};
