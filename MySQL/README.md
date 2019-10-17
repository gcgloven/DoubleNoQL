nodejs/myapp - backend, runs on port 9000
database is connected at http://localhost:9000/testAPI
for now, connection & query is at myapp/routes/testAPI.js
(can ignore db/index.js, it doesn't do anything)

react - frontend, runs on port 3000
client/src/App.js - where it's fetching data from backend through callAPI()



## SQL SCHEMA
`CREATE TABLE reviews (
rid INT NOT NULL AUTO_INCREMENT,
asin VARCHAR(255) NOT NULL,
helpful VARCHAR(255) NOT NULL,
overall INT NOT NULL,
review_text VARCHAR(3000),
review_date DATE NOT NULL,
reviewer_id VARCHAR(255) NOT NULL,
reviewer_name VARCHAR(255) NOT NULL,
summary VARCHAR(255),
unix_review_time INT NOT NULL,
PRIMARY KEY (rid)
);`

## Load SQL
`LOAD DATA LOCAL INFILE 'test.csv' INTO TABLE reviews FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (rid, asin, helpful, overall, review_text, @reviewTime, reviewer_id, reviewer_name, summary, unix_review_time) SET review_date = STR_TO_DATE(@reviewTime, '%b %d %Y');`