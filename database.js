import Database from "better-sqlite3";

const data = [
  {
    title: "A JavaScript alapjai",
    content:
      "A JavaScript az egyik legnépszerűbb programozási nyelv webfejlesztéshez.",
  },
  {
    title: "Node.js backend fejlesztés",
    content:
      "A Node.js lehetővé teszi szerveroldali alkalmazások fejlesztését JavaScript használatával.",
  },
  {
    title: "REST API tervezés",
    content:
      "A jól megtervezett REST API egyszerűbbé teszi az alkalmazások közötti kommunikációt.",
  },
  {
    title: "Adatbázis kezelés SQLite-tal",
    content:
      "Az SQLite egy könnyű, beágyazott adatbázis motor kisebb projektekhez.",
  },
];

const db = new Database("./data/db.sqlite");
db.prepare(
  "CREATE TABLE IF NOT EXISTS `posts` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` TEXT, `content` TEXT)",
).run();

const allData = db.prepare("select * from posts").all();

if (allData.length == 0) {
  data.forEach((d) =>
    db
      .prepare("insert into posts (`title`,`content`) VALUES (?, ?) ")
      .run(d.title, d.content),
  );
}

export let getAllPosts = () => {
  return db.prepare("select `title`,`content` from `posts`").all();
};

export const getPostById = (id) => {
  return db
    .prepare("select `title`,`content` from `posts` WHERE id = ? ")
    .all(id);
};

export const createNewPost = (title, content) => {
  db.prepare("insert into posts (`title`,`content`) values (?,?)").run(
    title,
    content,
  );
};
export const deletePostById = (id) => {
  db.prepare("DELETE FROM `posts` WHERE posts.id = ?").run(id);
};
