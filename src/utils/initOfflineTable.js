import SQLite from 'react-native-sqlite-2';
import RNFS from 'react-native-fs';
import {documentPath, imagePath} from './config';

const _DB = SQLite.openDatabase('gm.db', '1.0', '', 1);

export const createTableTags = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_tags' ",
      [],
      function (tx, res) {
        console.log('t item:', res.rows.length);
        // console.log('t item row:', res.rows);
        // console.log('t item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_tags(_id INTEGER PRIMARY KEY AUTOINCREMENT, Id INTEGER, name TEXT, description TEXT, color TEXT, isDeleted INTEGER, date_created TEXT, date_updated	TEXT, deleted_at TEXT)',
            [],
          );
        }
      },
    );
  });
};

export const createTableStatus = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_status' ",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        // console.log('item row:', res.rows);
        // console.log('item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS tbl_status(_id INTEGER PRIMARY KEY AUTOINCREMENT, Id INTEGER, name TEXT, status_key INTEGER, projects_count INTEGER)',
            [],
          );
        }
      },
    );
  });
};

export const createTableProjects = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_projects' ",
      [],
      function (tx, res) {
        console.log('p item:', res.rows.length);
        // console.log('P item row:', res.rows);
        // console.log('P item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_projects(
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                Id INTEGER,
                projectId INTEGER,
                name TEXT,
                latitude REAL,
                longitude REAL,
                locationName TEXT,
                status_id INTEGER,
                tagId INTEGER,
                isDeleted INTEGER,
                created_at TEXT,
                updated_at TEXT,
                location TEXT,
                location_update INTEGER
                )`,
            [],
          );
        }
      },
    );
  });
};

export const createTableLocalProjects = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_local_projects' ",
      [],
      function (tx, res) {
        console.log('LP item:', res.rows.length);
        // console.log('LP item row:', res.rows);
        // console.log('LP item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_local_projects(
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                status_id INTEGER,
                latitude REAL,
                longitude REAL,
                tagsId INTEGER,
                location_update INTEGER,
                created_at TEXT,
                updated_at TEXT
                )`,
            [],
          );
        }
      },
    );
  });
};

export const createTableLocalProjectItems = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_local_project_items' ",
      [],
      function (tx, res) {
        console.log('LPI item:', res.rows.length);
        // console.log('LPI item row:', res.rows);
        // console.log('LPI item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_local_project_items(
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                status_id INTEGER,
                latitude REAL,
                longitude REAL,
                tagsId INTEGER,
                project_id INTEGER,
                location_update INTEGER, 
                created_at TEXT,
                updated_at TEXT
                )`,
            [],
          );
        }
      },
    );
  });
};

export const createTableProjectMedia = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_project_media' ",
      [],
      function (tx, res) {
        console.log('TPM item:', res.rows.length);
        // console.log('TPM item row:', res.rows);
        // console.log('TPM item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_project_media(
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                itemId INTEGER,
                projectId INTEGER,
                image BLOB,
                imageType TEXT,
                created_at TEXT,
                updated_at TEXT
                )`,
            [],
          );
        }
      },
    );
  });
};

export const createTableProjectFiles = () => {
  _DB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_project_files' ",
      [],
      function (tx, res) {
        console.log('TPF item:', res.rows.length);
        // console.log('TPM item row:', res.rows);
        // console.log('TPM item res:', res);
        if (res.rows.length === 0) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_project_files(
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                itemId INTEGER,
                projectId INTEGER,
                file BLOB,
                fileType TEXT,
                created_at TEXT,
                updated_at TEXT
                )`,
            [],
          );
        }
      },
    );
  });
};

export const dropTableTags = async () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS table_tags', []);
  });
};

export const dropTableStatus = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_status', []);
  });
};

export const dropTableProjects = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_projects', []);
  });
};

export const dropTableLocalProjects = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_local_projects', []);
  });
};

export const dropTableLocalProjectItems = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_local_project_items', []);
  });
};

export const dropTableLocalProjectMedia = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_project_media', []);
  });
};

export const dropTableLocalProjectFiles = () => {
  _DB.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS tbl_project_files', []);
  });
};

export const selectDataFromTableLocalProject = () => {
  return new Promise((resolve, reject) => {
    _DB.transaction(function (txn) {
      txn.executeSql('SELECT * FROM tbl_local_projects', [], (txt, res) => {
        if (res.rows.length > 0) {
          resolve(res.rows._array);
          return;
        } else {
          resolve(res.rows.length);
        }
        reject('Something went wrong');
      });
    });
  });
};

export const selectDataFromTableLocalProjectItems = () => {
  return new Promise((resolve, reject) => {
    _DB.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM tbl_local_project_items',
        [],
        (txt, res) => {
          if (res.rows.length > 0) {
            resolve(res.rows._array);
            return;
          } else {
            resolve(res.rows.length);
          }
          reject('Something went wrong');
        },
      );
    });
  });
};

export const selectDataFromTableProjectMedia = () => {
  return new Promise((resolve, reject) => {
    _DB.transaction(function (txn) {
      txn.executeSql('SELECT * FROM tbl_project_media', [], (txt, res) => {
        console.log('Image media ----->', JSON.stringify(res));
        if (res.rows.length > 0) {
          resolve(res.rows._array);
          return;
        } else {
          resolve(res.rows.length);
        }
        reject('Something went wrong');
      });
    });
  });
};

export const selectDataFromTableProjectFiles = () => {
  return new Promise((resolve, reject) => {
    _DB.transaction(function (txn) {
      txn.executeSql('SELECT * FROM tbl_project_files', [], (txt, res) => {
        console.log('files media ----->', JSON.stringify(res));
        if (res.rows.length > 0) {
          resolve(res.rows._array);
          return;
        } else {
          resolve(res.rows.length);
        }
        reject('Something went wrong');
      });
    });
  });
};

export const createImageFolder = async () => {
  const folderPath = RNFS.DocumentDirectoryPath + imagePath;
  try {
    let isExist = await RNFS.exists(folderPath);
    if (!isExist) {
      await RNFS.mkdir(folderPath);
      return;
    }
    console.log('images alredy exist');
  } catch (err) {
    console.log('err', err);
  }
};

export const createDocumentFolder = async () => {
  const folderPath = RNFS.DocumentDirectoryPath + documentPath;
  try {
    let isExist = await RNFS.exists(folderPath);
    if (!isExist) {
      await RNFS.mkdir(folderPath);
      return;
    }
    console.log('files alredy exist');
  } catch (err) {
    console.log('err', err);
  }
};

export const deleteImagesFolder = async () => {
  const folderPath = RNFS.DocumentDirectoryPath + imagePath;
  try {
    let isExist = await RNFS.exists(folderPath);
    if (isExist) {
      await RNFS.unlink(folderPath);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
  }
};

export const deleteDocumentFolder = async () => {
  const folderPath = RNFS.DocumentDirectoryPath + documentPath;
  try {
    let isExist = await RNFS.exists(folderPath);
    if (isExist) {
      await RNFS.unlink(folderPath);
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const getFolderInfo = async folderPath => {
  try {
    const reader = await RNFS.readDir(folderPath);
    console.log('reader', reader);
    return true;
  } catch (err) {
    console.log('err', JSON.stringify(err));
    return false;
  }
};
