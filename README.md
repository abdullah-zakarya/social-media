-- A simple social media platform

`<h1`Datebase query `</h1>`

`<h2>`1 )) create users table `</h2>`

```pgsql
CREATE TABLE users (
userID VARCHAR(50) PRIMARY KEY,
passWord VARCHAR(255) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
bio TEXT,
photo VARCHAR(255),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
name VARCHAR(100) NOT NULL );
```

`<h2>` 2 ) "create follows table" `</h2>`

```pgsql
CREATE TABLE follows ( followerID VARCHAR(50),
followeeID VARCHAR(50), PRIMARY KEY (followerID, followeeID),
FOREIGN KEY (followerID) REFERENCES users(userID) ON DELETE CASCADE,
FOREIGN KEY (followeeID) REFERENCES users(userID) ON DELETE CASCADE );
```

`<h2>` 3 ) create posts table `</h2>`

```pgsql
CREATE TABLE posts (
postID SERIAL PRIMARY KEY,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
likeCount INT DEFAULT 0, commentCount INT DEFAULT 0,
userID VARCHAR(50) NOT NULL, text TEXT NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE );
```

`<h2>` 4 ) create comments table `</h2>`

```pgsql
CREATE TABLE comments (
commentID SERIAL PRIMARY KEY,
userID VARCHAR(50) NOT NULL,
postID INT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
FOREIGN KEY (postID) REFERENCES posts(postID) ON DELETE CASCADE );
```

`<h2>` 5) create likes table `</h2>`

```pgsql
CREATE TABLE likes ( userID VARCHAR(50),
postID INT, PRIMARY KEY (userID, postID),
FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
FOREIGN KEY (postID) REFERENCES posts(postID) ON DELETE CASCADE );
```
