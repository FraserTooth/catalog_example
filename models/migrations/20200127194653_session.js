exports.up = function(knex) {
  return knex.raw(`
      CREATE TABLE "sessions" (
          "id" serial NOT NULL,
          "session_id" TEXT NOT NULL,
          "username" TEXT NOT NULL,
          "expires" TIMESTAMP NOT NULL,
          CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
      )    
      `)
}

exports.down = function(knex) {
  return knex.raw(`
      DROP TABLE IF EXISTS "sessions";
      `)
}
