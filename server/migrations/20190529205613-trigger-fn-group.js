'use strict';
var sql = "CREATE OR REPLACE FUNCTION cog.fn_group_validation() \n RETURNS trigger AS \n" + 
"$BODY$ \n BEGIN \n IF (TG_OP = 'INSERT') THEN \n" + 
"   IF (NEW.isn_father notnull and NEW.flg_primal = true) THEN \n" + 
"     RAISE EXCEPTION 'Can''t define a both values for: isn_father and flg_primal.'; \n" +
"   END IF; \n"+ 
"  ELSIF (TG_OP = 'UPDATE') THEN \n" + 
"   IF ( (OLD.isn_father isnull and NEW.isn_father notnull and NEW.flg_primal = true) \n" + 
"   OR (OLD.flg_primal = false and NEW.flg_primal = true and NEW.isn_father notnull ) ) THEN \n" +
"     RAISE EXCEPTION 'Can''t define a both values for: isn_father and flg_primal.'; \n" +
"  -- ELSIF (TG_OP = 'DELETE') THEN -- Send to deleteBox \n" + 
"  -- IF ( OLD.flg_primal = true ) THEN \n" +
"  --   RAISE EXCEPTION 'Can''t remove a primal group or a father with sons.'; \n" +
"  -- END IF; \n" +
"  END IF; \n" +
" END IF; \n" +
" return NEW; \n" +
"END; \n" +
"$BODY$ \n" + 
" LANGUAGE plpgsql VOLATILE \n" +
" COST 100; \n" + 
"CREATE TRIGGER tfn_group_validation BEFORE INSERT OR UPDATE -- OR DELETE \n" +
" ON cog.groups FOR EACH ROW \n" +
" EXECUTE PROCEDURE cog.fn_group_validation();"
  console.log('SQL:\n',sql)
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(sql)
  },
  down: function(queryInterface, Sequelize){
    return queryInterface.sequelize.query("DROP FUNCTION cog.fn_group_validation() CASCADE;")
  }
};