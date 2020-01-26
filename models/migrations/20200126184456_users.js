exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE "users" (
        "id" serial NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "last_logged_in" TIMESTAMP NOT NULL,
        CONSTRAINT "users_pk" PRIMARY KEY ("id")
    )    
    `)
}

exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS "users";
    `)
}
