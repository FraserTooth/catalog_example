exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE "products" (
        "id" serial NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "image_src" TEXT NOT NULL,
        "price" bigint NOT NULL,
        "timestamp" TIMESTAMP NOT NULL,
        CONSTRAINT "catalog_pk" PRIMARY KEY ("id")
    )    
    `)
}

exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS "products";
    `)
}
