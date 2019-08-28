'use strict';
const sql = "CREATE UNIQUE INDEX uk_group_jsn_obj_control \n" +
  "ON cog.jsontables (isn_group ASC NULLS LAST, (jsn_obj->>'id'), flg_control ASC NULLS LAST)";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(sql)
      .then((success) => console.log("Unique group_jsn_control create >> success!"))
      .catch((error) => console.log("Error: ", "Unique group_jsn_control has create"));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DROP INDEX cog.uk_group_jsn_obj_control;")
  }
}