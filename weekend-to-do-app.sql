CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(200) not null,
	"task_status" varchar(200)
	);
INSERT INTO "todo" ("task","task_status") 
VALUES ('Go to the grocery store', 'incomplete');