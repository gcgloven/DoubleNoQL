# DoubleNoQL


This project uses EJS (front-end), Node JS (back-end) and Epress(middleware) to create a Book Review Website
The backend is powered by MongoDB and MySQL
## Data Source
We used the book metadata from UCSD link, we have formatted into a strict file here (2.4 GB):  [Link](https://drive.google.com/file/d/1Ug0MFeDWyPA-g0c5dYmuXDrMmECd6IbT/view?usp=sharing)

The Book Reviews are downloaded from Kaggle (525 MB) : [Link](https://www.kaggle.com/bharadwaj6/kindle-reviews/download)

Front-End Tamplate (Free): [Link](https://themehunt.com/item/1525828-writer-free-ecommerce-book-store-template)  and [Preview](http://themehunt.com/item/1525828-writer-free-ecommerce-book-store-template/preview)


## Node JS Configuration
| [MongoDB](#MongoDB-Configuration)  | [MySQL](#MySQL-Configuration)  |
|---|---|
| Database name: dbproj  |Database name: dbproj  
|Books collection name: kindlemeta|Reviews table name: reviews  |  
|Username and password: None  |   Username: dbds  Password: dbds|

### Node  MySQL
```javascript
var  connection  =  mysql.createConnection({

host:  "localhost",

user:  "root",

password:  "yourpassword",

database:  "dbproj" //standardised

});
```

### Node Mongoose
```javascript
"use strict";

var  mongoose  =  require("mongoose"),

mongoose  =  mongoose.createConnection("mongodb://localhost/dbproj", {

useUnifiedTopology:  true,

useNewUrlParser:  true

}),

Product  =  require("./../models/productModel"), // the data structure of response

Product  =  mongoose.model("kindlemeta");

```


## MySQL Configuration
**Create Table Syntax**
```sql
CREATE TABLE reviews ( rid INT NOT NULL AUTO_INCREMENT, 
	asin VARCHAR(255) NOT NULL, 
	helpful VARCHAR(255) NOT NULL, 
	overall INT NOT NULL, 
	review_text VARCHAR(3000), 
	review_date DATE NOT NULL, 
	reviewer_id VARCHAR(255) NOT NULL, 
	reviewer_name VARCHAR(255) NOT NULL, 
	summary VARCHAR(255), 
	unix_review_time INT NOT NULL, 
	PRIMARY KEY (rid) );
```
**Go Terminal -> cd to your data file's folder -> log into mysql in terminal, then:**
```sql
LOAD DATA LOCAL INFILE '<FileName.csv>' 
INTO TABLE reviews 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS (rid, 
			   asin, 
			   helpful, 
			   overall, 
			   review_text, 
			   @reviewTime, 
			   reviewer_id, 
			   reviewer_name, 
			   summary, 
			   unix_review_time) 
SET review_date = STR_TO_DATE(@reviewTime, '%b %d %Y');
```

#### Export Database
`mysqldump -u username -p dbds_test > output.sql`

#### Import Database
`mysqldump -u username -p dbds_test < output.sql`

#### Extra:
Change Data Base AuthMethod and Pw
For LINUX and MAC:
```sql 
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';
```
For WINDOWs:
```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
```

Rename Database Name Tutorial: [Link](https://phoenixnap.com/kb/how-to-rename-a-mysql-database)

## MongoDB Configuration
**For Strict File**
`$ mongoimport --db dbproj --collection kindlemeta --file /Users/gloven/Desktop/BigData/output.strict`

**For Json File**
`$ mongoimport --db dbproj --collection kindlemeta --file /Users/gloven/Desktop/BigData/test.json --legacy`

Export
`$ mongodump -d old_db_name -o mongodump/`

Import (Alternative)
`$ mongorestore -d new_db_name mongodump/old_db_name`
