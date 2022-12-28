let db = undefined;

const init = async () => {
    //db setup
    await db.run(
        "CREATE TABLE IF NOT EXISTS files " +
        "(hash VARCHAR , docname VARCHAR, grade INT, halbjahr INT," +
        "subject VARCHAR, id INTEGER PRIMARY KEY AUTOINCREMENT);;"
    );

    await db.run(
        "CREATE TABLE IF NOT EXISTS file2tag (fileID INT, tagID INT);;"
    );

    await db.run(
        "CREATE TABLE IF NOT EXISTS tag (id INTEGER PRIMARY KEY AUTOINCREMENT, con VARCHAR);;"
    );
}

const add_file = ({hash, docname, grade, halbjahr, subject}) => new Promise((resolve, reject) =>
    db.run("INSERT INTO files (hash, docname, grade, halbjahr, subject) "+
            "VALUES ($hash, $docname, $grade, $halbjahr, $subject);;",
        {
            $hash : hash,
            $docname: docname,
            $grade : grade,
            $halbjahr : halbjahr,
            $subject : subject,
        }, (error) => {
            if (error) {reject(error); return;}

            db.get("SELECT last_insert_rowid() as id;", (error, res) => {
                if (error) {reject(error); return;}
                resolve(res);
            })
        }
    )
)

const register_files = async (body, files) => {
    
}

//copied from https://stackoverflow.com/a/52171480
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

module.exports = (db_) => {
    db = db_;
    init()

    return {
        register_files,
        cyrb53
    }
}